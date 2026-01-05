#!/usr/bin/env npx tsx

import * as clack from "@clack/prompts";
import { spawn } from "child_process";
import { readdirSync, existsSync } from "fs";
import { join } from "path";
import color from "picocolors";

const REPO_ROOT = process.cwd();
const SRC_DIR = join(REPO_ROOT, "src");
const TS_DIR = join(SRC_DIR, "typescript");
const GO_DIR = join(SRC_DIR, "go");
const TS_BENCHMARKS_DIR = join(TS_DIR, "benchmarks");
const GO_BENCHMARKS_DIR = join(GO_DIR, "benchmarks");

type Language = "ts" | "go" | "both";
type RunnableLanguage = "ts" | "go";

interface Chapter {
  num: string;
  name: string;
}

const CHAPTERS: Chapter[] = [
  { num: "01", name: "Why Data Structures Matter" },
  { num: "02", name: "Why Algorithms Matter" },
  { num: "03", name: "O Yes! Big O Notation" },
  { num: "04", name: "Speeding Up Your Code with Big O" },
  { num: "05", name: "Optimizing Code With and Without Big O" },
  { num: "06", name: "Optimizing for Optimistic Scenarios" },
  { num: "07", name: "Big O in Everyday Code" },
  { num: "08", name: "Blazing Fast Lookup with Hash Tables" },
  { num: "09", name: "Stacks and Queues" },
  { num: "10", name: "Recursively Recurse with Recursion" },
  { num: "11", name: "Learning to Write in Recursive" },
  { num: "12", name: "Dynamic Programming" },
  { num: "13", name: "Recursive Algorithms for Speed" },
  { num: "14", name: "Node-Based Data Structures" },
  { num: "15", name: "Binary Search Trees" },
  { num: "16", name: "Heaps" },
  { num: "17", name: "Tries" },
  { num: "18", name: "Graphs" },
  { num: "19", name: "Dealing with Space Constraints" },
  { num: "20", name: "Techniques for Code Optimization" },
];

const CONCEPT_BENCHMARKS: Record<string, string> = {
  "02": "Linear Search O(N) vs Binary Search O(log N)",
  "04": "Bubble Sort O(N²) vs Quick Sort O(N log N)",
  "05": "Nested Loops O(N²) vs Hash Set O(N)",
  "08": "Array Lookup O(N) vs Hash Table O(1)",
  "12": "Naive Recursion O(2^N) vs Memoization O(N)",
};

function resolveLanguage(language: Language): RunnableLanguage {
  return language === "both" ? "ts" : language;
}

function getChapterDirectory(
  chapterNum: string,
  lang: RunnableLanguage
): string {
  const baseDir = lang === "ts" ? TS_DIR : GO_DIR;
  return join(baseDir, `chapter${chapterNum}`);
}

function isExerciseFile(filename: string, lang: RunnableLanguage): boolean {
  if (!filename.startsWith("exercise")) {
    return false;
  }

  if (lang === "ts") {
    return filename.endsWith(".ts");
  }

  return true;
}

function getExercises(chapterNum: string, lang: RunnableLanguage): string[] {
  const directory = getChapterDirectory(chapterNum, lang);

  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory)
    .filter((file) => isExerciseFile(file, lang))
    .sort();
}

function hasBenchmark(chapterNum: string): boolean {
  return chapterNum in CONCEPT_BENCHMARKS;
}

async function executeCommand(
  command: string,
  args: string[],
  workingDirectory?: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const spinner = clack.spinner();
    spinner.start("Running...");

    const childProcess = spawn(command, args, {
      cwd: workingDirectory || REPO_ROOT,
      stdio: "pipe",
    });

    let output = "";

    childProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    childProcess.stderr.on("data", (data) => {
      output += data.toString();
    });

    childProcess.on("close", (code) => {
      spinner.stop();
      console.log("\n" + output);

      if (code !== 0) {
        clack.log.error(`Process exited with code ${code}`);
      }

      resolve();
    });

    childProcess.on("error", (error) => {
      spinner.stop();
      clack.log.error(`Failed to execute: ${error.message}`);
      reject(error);
    });
  });
}

async function runTypeScriptExercise(
  chapterNum: string,
  exercise: string
): Promise<void> {
  const path = join(TS_DIR, `chapter${chapterNum}`, exercise);
  await executeCommand("npx", ["tsx", path], SRC_DIR);
}

async function runGoExercise(
  chapterNum: string,
  exercise: string
): Promise<void> {
  const packageDir = join(GO_DIR, `chapter${chapterNum}`, exercise);

  // Run the package (directory), not a file, and set cwd to the module root
  await executeCommand("go", ["run", "."], packageDir);
}

async function runExercise(
  chapterNum: string,
  exercise: string,
  lang: RunnableLanguage
): Promise<void> {
  const languageDisplay = lang === "ts" ? "TypeScript" : "Go";
  const chapterDisplay = parseInt(chapterNum);

  clack.log.info(
    `${color.cyan("Chapter")} ${chapterDisplay} ${color.dim(
      "→"
    )} ${color.yellow(exercise)} ${color.dim(`(${languageDisplay})`)}`
  );

  if (lang === "ts") {
    await runTypeScriptExercise(chapterNum, exercise);
  } else {
    await runGoExercise(chapterNum, exercise);
  }
}

function getBenchmarkPath(chapterNum: string, lang: RunnableLanguage): string {
  if (lang === "ts") {
    return join(TS_BENCHMARKS_DIR, `chapter${chapterNum}.ts`);
  }

  return join(GO_BENCHMARKS_DIR, `chapter${chapterNum}`);
}

async function runTypeScriptBenchmark(benchmarkPath: string): Promise<void> {
  if (!existsSync(benchmarkPath)) {
    clack.log.warn(
      "TypeScript concept benchmark not available for this chapter"
    );
    return;
  }

  await executeCommand("npx", ["tsx", benchmarkPath], SRC_DIR);
}

async function runGoBenchmark(benchmarkDirectory: string): Promise<void> {
  if (!existsSync(benchmarkDirectory)) {
    clack.log.warn("Go concept benchmark not available for this chapter");
    return;
  }

  await executeCommand("go", ["run", "."], benchmarkDirectory);
}

async function runBenchmark(
  chapterNum: string,
  lang: RunnableLanguage
): Promise<void> {
  const chapter = CHAPTERS.find((c) => c.num === chapterNum);
  const chapterDisplay = parseInt(chapterNum);

  clack.log.info(
    `${color.cyan("📊 Concept Benchmark")} ${color.dim(
      "→"
    )} Chapter ${chapterDisplay}: ${chapter?.name}`
  );

  const benchmarkPath = getBenchmarkPath(chapterNum, lang);

  if (lang === "ts") {
    await runTypeScriptBenchmark(benchmarkPath);
  } else {
    await runGoBenchmark(benchmarkPath);
  }
}

async function runAllExercises(
  chapterNum: string,
  exercises: string[],
  language: Language
): Promise<void> {
  const shouldCompare = language === "both";

  for (const exercise of exercises) {
    if (shouldCompare) {
      await runExercise(chapterNum, exercise, "ts");
      const goExercise = exercise.replace(".ts", "");
      await runExercise(chapterNum, goExercise, "go");
    } else {
      await runExercise(chapterNum, exercise, language);
    }
  }
}

async function runSingleExercise(
  chapterNum: string,
  exercise: string,
  language: Language
): Promise<void> {
  const shouldCompare = language === "both";

  if (shouldCompare) {
    await runExercise(chapterNum, exercise, "ts");
    const goExercise = exercise.replace(".ts", "");
    await runExercise(chapterNum, goExercise, "go");
  } else {
    const runnableLanguage = resolveLanguage(language);
    await runExercise(chapterNum, exercise, runnableLanguage);
  }
}

async function selectLanguage(): Promise<Language | symbol> {
  return (await clack.select({
    message: "Select language",
    options: [
      {
        value: "ts",
        label: "TypeScript",
        hint: "Run TypeScript implementations",
      },
      { value: "go", label: "Go", hint: "Run Go implementations" },
      {
        value: "both",
        label: "Both (Compare)",
        hint: "Compare TypeScript vs Go",
      },
    ],
  })) as Language | symbol;
}

async function selectChapter(): Promise<string | symbol> {
  const options = CHAPTERS.map((chapter) => {
    const chapterNumber = parseInt(chapter.num);
    const hint = hasBenchmark(chapter.num)
      ? "📊 Benchmark available"
      : undefined;

    return {
      value: chapter.num,
      label: `Chapter ${chapterNumber}: ${chapter.name}`,
      hint,
    };
  });

  return await clack.select({
    message: "Select chapter",
    options,
  });
}

async function selectExercise(chapterNum: string, lang: Language) {
  const runnableLanguage = resolveLanguage(lang);
  const exercises = getExercises(chapterNum, runnableLanguage);
  const chapter = CHAPTERS.find((c) => c.num === chapterNum);

  if (exercises.length === 0) {
    const chapterDisplay = parseInt(chapterNum);
    clack.log.warn(`No exercises found for Chapter ${chapterDisplay}`);
    return clack.cancel();
  }

  const options = [
    {
      value: "all",
      label: "Run All Exercises",
      hint: `${exercises.length} exercise(s)`,
    },
    ...exercises.map((exercise) => ({
      value: exercise,
      label: `Exercise ${parseInt(exercise.replace(/\D/g, ""))}`,
    })),
  ];

  if (hasBenchmark(chapterNum)) {
    options.push({
      value: "benchmark",
      label: "📊 Concept Benchmark",
      hint: CONCEPT_BENCHMARKS[chapterNum],
    });
  }

  const chapterDisplay = parseInt(chapterNum);

  return await clack.select({
    message: `Chapter ${chapterDisplay}: ${chapter?.name}`,
    options,
  });
}

async function handleExerciseSelection(
  chapter: string,
  exercise: string | symbol,
  language: Language
): Promise<void> {
  if (clack.isCancel(exercise)) {
    return;
  }

  const runnableLanguage = resolveLanguage(language);
  const exercises = getExercises(chapter, runnableLanguage);

  console.log("");

  if (exercise === "all") {
    await runAllExercises(chapter, exercises, language);
    console.log("");
    return;
  }

  if (exercise === "benchmark") {
    await runBenchmark(chapter, runnableLanguage);
    console.log("");
    return;
  }

  await runSingleExercise(chapter, exercise as string, language);
  console.log("");
}

async function promptContinue(message: string): Promise<boolean> {
  const shouldContinue = await clack.confirm({
    message,
    initialValue: true,
  });

  if (clack.isCancel(shouldContinue)) {
    return false;
  }

  return shouldContinue;
}

async function runExercisesFlow(): Promise<void> {
  const language = await selectLanguage();

  if (clack.isCancel(language)) {
    return;
  }

  while (true) {
    const chapter = await selectChapter();

    if (clack.isCancel(chapter)) {
      return;
    }

    const exercise = await selectExercise(
      chapter as string,
      language as Language
    );

    await handleExerciseSelection(
      chapter as string,
      exercise,
      language as Language
    );

    const shouldContinue = await promptContinue("Run another exercise?");

    if (!shouldContinue) {
      return;
    }
  }
}

async function runConceptBenchmarksFlow(): Promise<void> {
  const benchmarkChapters = Object.keys(CONCEPT_BENCHMARKS).sort();

  const options = benchmarkChapters.map((chapterNum) => {
    const chapter = CHAPTERS.find((c) => c.num === chapterNum);
    const chapterDisplay = parseInt(chapterNum);

    return {
      value: chapterNum,
      label: `Chapter ${chapterDisplay}: ${chapter?.name}`,
      hint: CONCEPT_BENCHMARKS[chapterNum],
    };
  });

  while (true) {
    const chapter = await clack.select({
      message: "Select concept benchmark",
      options,
    });

    if (clack.isCancel(chapter)) {
      return;
    }

    const language = await clack.select({
      message: "Select language",
      options: [
        { value: "ts", label: "TypeScript" },
        { value: "go", label: "Go" },
      ],
    });

    if (clack.isCancel(language)) {
      continue;
    }

    console.log("");
    await runBenchmark(chapter as string, language as RunnableLanguage);
    console.log("");

    const shouldContinue = await promptContinue("Run another benchmark?");

    if (!shouldContinue) {
      return;
    }
  }
}

async function showKbAssistant(): Promise<void> {
  console.log("");
  clack.note(
    `${color.bold("Apply DSA concepts to your code")}\n\n` +
      `This feature analyzes your code and suggests:\n` +
      `  ${color.cyan("•")} Algorithmic optimizations\n` +
      `  ${color.cyan("•")} Better data structure choices\n` +
      `  ${color.cyan("•")} Big O complexity improvements\n` +
      `  ${color.cyan("•")} References to relevant course material`,
    "🧠 KB Assistant"
  );
  console.log("");
}

async function main(): Promise<void> {
  console.clear();

  clack.intro(color.bgCyan(color.black(" DSA Exercise Runner ")));

  while (true) {
    const action = await clack.select({
      message: "What would you like to do?",
      options: [
        {
          value: "exercises",
          label: "Run Exercises",
          hint: "Practice with chapter exercises",
        },
        {
          value: "benchmarks",
          label: "Concept Benchmarks",
          hint: "Learn Big O in practice",
        },
        {
          value: "kb",
          label: "KB Assistant",
          hint: "Apply DSA concepts to your code",
        },
        { value: "exit", label: "Exit" },
      ],
    });

    const shouldExit = clack.isCancel(action) || action === "exit";

    if (shouldExit) {
      clack.outro(color.gray("Goodbye! 👋"));
      process.exit(0);
    }

    switch (action) {
      case "benchmarks":
        await runConceptBenchmarksFlow();
        break;
      case "exercises":
        await runExercisesFlow();
        break;
      case "kb":
        await showKbAssistant();
        break;
    }
  }
}

main().catch((error) => {
  clack.log.error("An error occurred");
  console.error(error);
  process.exit(1);
});
