// API fetch helpers 
import { GitaChapter, GitaVerse } from '@/types';

const RAPIDAPI_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST || 'bhagavad-gita3.p.rapidapi.com';
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;

if (!RAPIDAPI_KEY) {
  console.error('RapidAPI key is not configured. Please add NEXT_PUBLIC_RAPIDAPI_KEY to your .env.local file.');
}

if (!RAPIDAPI_HOST) {
  console.error('RapidAPI host is not configured. Please add NEXT_PUBLIC_RAPIDAPI_HOST to your .env.local file.');
}

const headers = {
  'X-RapidAPI-Host': RAPIDAPI_HOST,
  'X-RapidAPI-Key': RAPIDAPI_KEY || '',
};

export async function fetchChapters(): Promise<GitaChapter[]> {
  try {
    if (!RAPIDAPI_KEY) {
      throw new Error('RapidAPI key is not configured');
    }

    const res = await fetch(`https://${RAPIDAPI_HOST}/v2/chapters/?skip=0&limit=18`, {
      headers,
      cache: 'no-store',
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('API Error:', error);
      throw new Error('Failed to fetch chapters');
    }

    return res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function fetchChapterVerses(chapterId: number): Promise<GitaVerse[]> {
  try {
    if (!RAPIDAPI_KEY) {
      throw new Error('RapidAPI key is not configured');
    }

    const res = await fetch(
      `https://${RAPIDAPI_HOST}/v2/chapters/${chapterId}/verses/`,
      {
        headers,
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      const error = await res.text();
      console.error('API Error:', error);
      throw new Error('Failed to fetch verses');
    }

    return res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function fetchVerse(chapterId: number, verseId: number): Promise<GitaVerse> {
  try {
    if (!RAPIDAPI_KEY) {
      throw new Error('RapidAPI key is not configured');
    }

    const res = await fetch(
      `https://${RAPIDAPI_HOST}/v2/chapters/${chapterId}/verses/${verseId}/`,
      {
        headers,
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      const error = await res.text();
      console.error('API Error:', error);
      throw new Error('Failed to fetch verse');
    }

    return res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function fetchChapterDetails(chapterId: number): Promise<GitaChapter> {
  try {
    if (!RAPIDAPI_KEY) {
      throw new Error('RapidAPI key is not configured');
    }

    const res = await fetch(
      `https://${RAPIDAPI_HOST}/v2/chapters/${chapterId}/`,
      {
        headers,
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      const error = await res.text();
      console.error('API Error:', error);
      throw new Error('Failed to fetch chapter details');
    }

    return res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
