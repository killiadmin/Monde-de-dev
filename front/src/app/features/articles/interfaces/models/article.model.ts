import { Comment } from './comment.model';

export interface Article {
  id: number;
  title: string;
  content: string;
  authorName: string;
  themeTitle: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}
