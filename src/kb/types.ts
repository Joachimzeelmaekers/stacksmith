export type Environment = {
  LLM_MODEL?: string;
  LLM_API_KEY: string;
  LLM_BASE_URL?: string;
};

export type KnowledgeChunk = {
  sourcePath: string;
  title: string;
  content: string;
};

export type KnowledgeHit = KnowledgeChunk & { score: number };

export type OptimizationSuggestion = {
  title: string;
  explanation: string;
  relatedConcepts: string[];
};

export type LlmConfig = {
  baseUrl: string;
  apiKey: string;
  model: string;
};

export interface BuildKbPromptArgs {
  question: string;
  code: string;
  hits: KnowledgeHit[];
}

export interface SearchKnowledgeBaseOptions {
  topK?: number;
}

export interface ChatCompletionMessage {
  content?: string;
}

export interface ChatCompletionChoice {
  message?: ChatCompletionMessage;
}

export interface ChatCompletionResponse {
  choices?: ChatCompletionChoice[];
}
