import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import { basename, join, relative } from "path";
import {
  CHAPTER_DIRECTORY_NAME_REGEX,
  DEFAULT_CHUNK_OVERLAP_CHARS,
  DEFAULT_MAX_CHUNK_CHARS,
  DEFAULT_TOP_K_RESULTS,
  MARKDOWN_HEADING_LEVEL_1_REGEX,
  MARKDOWN_HEADING_LEVEL_2_REGEX,
  MAX_EXCERPT_LENGTH,
  STOPWORDS,
} from "./constants";
import type {
  BuildKbPromptArgs,
  ChatCompletionResponse,
  Environment,
  KnowledgeChunk,
  KnowledgeHit,
  LlmConfig,
  OptimizationSuggestion,
  SearchKnowledgeBaseOptions,
} from "./types";

function isChapterDirectoryName(name: string): boolean {
  return CHAPTER_DIRECTORY_NAME_REGEX.test(name);
}

function safeReadText(path: string): string | null {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return null;
  }
}

function extractTitleFromMarkdown(markdown: string): string | null {
  const lines = markdown.split(/\r?\n/);

  for (const line of lines) {
    const match = MARKDOWN_HEADING_LEVEL_1_REGEX.exec(line);

    if (match) {
      return match[1].trim();
    }
  }

  return null;
}

function chunkText(
  text: string,
  maxChars: number = DEFAULT_MAX_CHUNK_CHARS,
  overlapChars: number = DEFAULT_CHUNK_OVERLAP_CHARS
): string[] {
  const chunks: string[] = [];
  const cleanedText = text.replace(/\r/g, "").trim();

  if (!cleanedText) {
    return chunks;
  }

  let startIndex = 0;

  while (startIndex < cleanedText.length) {
    const endIndex = Math.min(cleanedText.length, startIndex + maxChars);
    const slice = cleanedText.slice(startIndex, endIndex);

    chunks.push(slice);

    if (endIndex === cleanedText.length) {
      break;
    }

    startIndex = Math.max(0, endIndex - overlapChars);
  }

  return chunks;
}

function splitMarkdownIntoSections(markdown: string): string[] {
  const lines = markdown.replace(/\r/g, "").split("\n");
  const sections: string[] = [];
  let buffer: string[] = [];

  const flushBuffer = () => {
    const text = buffer.join("\n").trim();

    if (text) {
      sections.push(text);
    }

    buffer = [];
  };

  for (const line of lines) {
    if (MARKDOWN_HEADING_LEVEL_2_REGEX.test(line)) {
      flushBuffer();
    }

    buffer.push(line);
  }

  flushBuffer();

  if (sections.length === 0) {
    return [markdown];
  }

  return sections;
}

function normalizeForIndexing(text: string): string {
  return text
    .replace(/```/g, " ")
    .replace(/`/g, " ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .toLowerCase();
}

function tokenize(text: string): string[] {
  return normalizeForIndexing(text)
    .split(/\s+/)
    .filter((token) => {
      if (!token) {
        return false;
      }

      if (token.length < 2) {
        return false;
      }

      if (STOPWORDS.has(token)) {
        return false;
      }

      return true;
    });
}

function scoreChunk(queryTokens: string[], chunkTokens: string[]): number {
  if (queryTokens.length === 0 || chunkTokens.length === 0) {
    return 0;
  }

  const tokenFrequency = new Map<string, number>();

  for (const token of chunkTokens) {
    const currentCount = tokenFrequency.get(token) ?? 0;
    tokenFrequency.set(token, currentCount + 1);
  }

  let rawScore = 0;

  for (const queryToken of queryTokens) {
    rawScore += tokenFrequency.get(queryToken) ?? 0;
  }

  return rawScore / Math.sqrt(chunkTokens.length);
}

function collectMarkdownFiles(repoRoot: string): string[] {
  const markdownFiles: string[] = [];
  const topLevelEntries = readdirSync(repoRoot, { withFileTypes: true });

  for (const entry of topLevelEntries) {
    if (!entry.isDirectory()) {
      continue;
    }

    if (!isChapterDirectoryName(entry.name)) {
      continue;
    }

    const chapterDirectory = join(repoRoot, entry.name);
    const notesPath = join(chapterDirectory, "notes.md");

    if (existsSync(notesPath)) {
      markdownFiles.push(notesPath);
    }

    const exercisesDirectory = join(chapterDirectory, "exercises");

    if (
      existsSync(exercisesDirectory) &&
      statSync(exercisesDirectory).isDirectory()
    ) {
      const exerciseEntries = readdirSync(exercisesDirectory, {
        withFileTypes: true,
      });

      for (const exerciseEntry of exerciseEntries) {
        if (!exerciseEntry.isFile()) {
          continue;
        }

        if (!exerciseEntry.name.endsWith(".md")) {
          continue;
        }

        markdownFiles.push(join(exercisesDirectory, exerciseEntry.name));
      }
    }
  }

  // Also include the repo README as general context
  const readmePath = join(repoRoot, "README.md");

  if (existsSync(readmePath)) {
    markdownFiles.push(readmePath);
  }

  return markdownFiles;
}

export function buildKnowledgeBase(repoRoot: string): KnowledgeChunk[] {
  const markdownFiles = collectMarkdownFiles(repoRoot);
  const knowledgeChunks: KnowledgeChunk[] = [];

  for (const filePath of markdownFiles) {
    const markdown = safeReadText(filePath);

    if (!markdown) {
      continue;
    }

    const title = extractTitleFromMarkdown(markdown) ?? basename(filePath);
    const sections = splitMarkdownIntoSections(markdown);

    for (const section of sections) {
      const sectionChunks = chunkText(section);

      for (const sectionChunk of sectionChunks) {
        const content = sectionChunk.trim();

        if (!content) {
          continue;
        }

        knowledgeChunks.push({
          sourcePath: relative(repoRoot, filePath),
          title,
          content,
        });
      }
    }
  }

  return knowledgeChunks;
}

export function searchKnowledgeBase(
  knowledgeBase: KnowledgeChunk[],
  query: string,
  options?: SearchKnowledgeBaseOptions
): KnowledgeHit[] {
  const topK = options?.topK ?? DEFAULT_TOP_K_RESULTS;
  const queryTokens = Array.from(new Set(tokenize(query)));

  if (queryTokens.length === 0) {
    return [];
  }

  const scoredHits: KnowledgeHit[] = knowledgeBase
    .map((chunk) => {
      const chunkTokens = tokenize(chunk.content);
      const score = scoreChunk(queryTokens, chunkTokens);

      return {
        ...chunk,
        score,
      };
    })
    .filter((hit) => {
      return hit.score > 0;
    });

  scoredHits.sort((a, b) => {
    return b.score - a.score;
  });

  return scoredHits.slice(0, topK);
}

export function buildKbPrompt(args: BuildKbPromptArgs): {
  system: string;
  user: string;
} {
  const { question, code, hits } = args;

  const excerpts =
    hits
      .map((hit, index) => {
        const snippet =
          hit.content.length > MAX_EXCERPT_LENGTH
            ? `${hit.content.slice(0, MAX_EXCERPT_LENGTH)}…`
            : hit.content;

        return [
          `EXCERPT ${index + 1}`,
          `Source: ${hit.sourcePath}`,
          `Title: ${hit.title}`,
          snippet,
        ].join("\n");
      })
      .join("\n\n---\n\n") || "(none found)";

  const system = [
    "You are a senior engineer helping apply DSA/performance concepts to code.",
    "Use ONLY the provided excerpts as the knowledge base reference.",
    "Be concrete: identify the bottleneck, name the concept, and propose a better approach.",
    "If you make a claim, tie it to one of the excerpts by citing its Source path.",
    "Avoid hand-wavy advice; show what to change and why (complexity + practical tradeoffs).",
  ].join(" ");

  const user = [
    "TASK",
    question.trim(),
    "",
    "CODE",
    "```",
    code.trim(),
    "```",
    "",
    "KNOWLEDGE BASE EXCERPTS",
    excerpts,
  ].join("\n");

  return { system, user };
}

export function getLlmConfigFromEnv(env: Environment): LlmConfig | null {
  const apiKey = (env.LLM_API_KEY ?? "").trim();

  if (!apiKey) {
    return null;
  }

  const rawBaseUrl = (env.LLM_BASE_URL ?? "").trim();
  const normalizedBaseUrl = rawBaseUrl || "https://api.openai.com/v1";

  const baseUrlWithScheme = /^https?:\/\//.test(normalizedBaseUrl)
    ? normalizedBaseUrl
    : `https://${normalizedBaseUrl}`;

  return {
    apiKey,
    baseUrl: baseUrlWithScheme.replace(/\/$/, ""),
    model: (env.LLM_MODEL ?? "gpt-4o-mini").trim() || "gpt-4o-mini",
  };
}

function countRegex(text: string, regex: RegExp): number {
  const matches = text.match(regex);

  if (!matches) {
    return 0;
  }

  return matches.length;
}

export function suggestOptimizationsFromCode(
  code: string
): OptimizationSuggestion[] {
  const suggestions: OptimizationSuggestion[] = [];

  const includesCallCount = countRegex(code, /\.includes\s*\(/g);

  if (includesCallCount >= 1) {
    suggestions.push({
      title: "Replace repeated array membership checks with a Set/Map",
      explanation:
        "Array `.includes()` is a linear scan (O(N)). If this runs in a loop or is called frequently, build a `Set` once and use `.has()` for O(1) average-case membership. Trade-off: extra memory for the set.",
      relatedConcepts: [
        "Hash tables / sets for O(1) lookup",
        "Precompute/index instead of re-scan",
      ],
    });
  }

  const findCallCount = countRegex(code, /\.find\s*\(/g);

  if (findCallCount >= 2) {
    suggestions.push({
      title: "Avoid repeated `.find()` scans by pre-indexing",
      explanation:
        "Repeated `.find()` over the same collection is repeated linear work. If you look up by a stable key (id/name/num), build a `Map` once (key → value) and do O(1) average-case lookups afterward.",
      relatedConcepts: [
        "Materialize an index (Map)",
        "Change data structure → change runtime",
      ],
    });
  }

  const hasNestedForLoop =
    /for\s*\([^)]*\)\s*\{[\s\S]{0,2000}?for\s*\([^)]*\)\s*\{/m.test(code) ||
    /for\s*\([^)]*\)[\s\S]{0,2000}?for\s*\([^)]*\)/m.test(code);

  if (hasNestedForLoop) {
    suggestions.push({
      title: "Nested loops may be reducible with hashing",
      explanation:
        "If the inner loop is doing search/membership work, you can often replace the nested scan (O(N×M) / O(N²)) with a precomputed `Set`/`Map` and a single pass (often O(N+M)).",
      relatedConcepts: [
        "Reduce asymptotic cost",
        "Hash index replaces nested search",
      ],
    });
  }

  const sortCallCount = countRegex(code, /\.sort\s*\(/g);

  if (sortCallCount >= 1) {
    suggestions.push({
      title: "Don’t sort the full list if you only need top-K",
      explanation:
        "Sorting is O(N log N). If you only need the largest/smallest K items, a heap of size K can do it in O(N log K) with lower overhead for small K.",
      relatedConcepts: ["Heaps / selection vs full sort", "Top-K optimization"],
    });
  }

  return suggestions;
}

export async function callBaselineChatLlm(args: {
  config: LlmConfig;
  system: string;
  user: string;
}): Promise<string> {
  const { config, system, user } = args;

  if (!/^https?:\/\//.test(config.baseUrl)) {
    throw new Error(
      `Invalid LLM_BASE_URL (must be absolute, e.g. https://api.openai.com/v1): ${config.baseUrl}`
    );
  }

  const baseUrlWithTrailingSlash = config.baseUrl.endsWith("/")
    ? config.baseUrl
    : `${config.baseUrl}/`;

  const endpoint = new URL(
    "chat/completions",
    baseUrlWithTrailingSlash
  ).toString();

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      temperature: 0.2, // This might not be supported by all models, adjust accordingly
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    const message = `LLM request failed (${response.status} ${response.statusText}): ${text}`;
    throw new Error(message.trim());
  }

  const json = (await response.json()) as ChatCompletionResponse;
  const content = json?.choices?.[0]?.message?.content;

  if (typeof content !== "string" || !content.trim()) {
    throw new Error("LLM response missing choices[0].message.content");
  }

  return content.trim();
}
