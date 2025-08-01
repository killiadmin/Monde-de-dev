export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  themes: Theme[];
}

export interface Theme {
  id: number;
  title: string;
  content: string;
}
