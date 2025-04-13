
export interface IArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  category: string;
  imageUrl?: string;
  featured: boolean;
  date: string;
  updatedAt: string;
  tags?: string[];
  readTime?: number;
}

export interface IArticleCreate {
  title: string;
  content: string;
  summary: string;
  author: string;
  category: string;
  imageUrl?: string;
  featured?: boolean;
  tags?: string[];
}

export interface IArticleUpdate {
  title?: string;
  content?: string;
  summary?: string;
  author?: string;
  category?: string;
  imageUrl?: string;
  featured?: boolean;
  tags?: string[];
}
