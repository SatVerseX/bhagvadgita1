// Typescript interfaces 
export interface GitaChapter {
    id: number;
    name: string;
    name_transliterated: string;
    name_translated: string;
    verses_count: number;
    chapter_number: number;
    name_meaning: string;
    chapter_summary: string;
  }
  
  export interface GitaTranslation {
    id: number;
    description: string;
    author_name: string;
    language: string;
  }
  
  export interface GitaCommentary {
    id: number;
    description: string;
    author_name: string;
    language: string;
  }
  
  export interface GitaVerse {
    id: number;
    verse_number: number;
    chapter_number: number;
    text: string;
    transliteration: string;
    word_meanings: string;
    translations: {
      id: number;
      description: string;
      author_name: string;
      language: string;
    }[];
    commentaries: {
      id: number;
      description: string;
      author_name: string;
      language: string;
    }[];
  }
  