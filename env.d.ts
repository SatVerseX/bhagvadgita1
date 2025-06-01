declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_RAPIDAPI_KEY: string;
    NEXT_PUBLIC_RAPIDAPI_HOST: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
} 