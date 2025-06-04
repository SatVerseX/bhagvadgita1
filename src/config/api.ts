export const apiConfig = {
  rapidApi: {
    key: typeof window !== 'undefined' 
      ? window.__NEXT_DATA__?.props?.rapidApiKey || process.env.NEXT_PUBLIC_RAPIDAPI_KEY
      : process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    host: typeof window !== 'undefined'
      ? window.__NEXT_DATA__?.props?.rapidApiHost || process.env.NEXT_PUBLIC_RAPIDAPI_HOST
      : process.env.NEXT_PUBLIC_RAPIDAPI_HOST || 'bhagavad-gita3.p.rapidapi.com',
  }
}; 