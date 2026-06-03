declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPENROUTER_API_KEY: string;
      OPENROUTER_BASE_URL: string;
      OPENROUTER_MODEL: string;
    }
  }
}

export {};
