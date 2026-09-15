export interface Assignment {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  imageUrl?: string;
  linkUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserData {
  name: string;
  assignments: Assignment[];
}

export type User = 'dindin' | 'bebi-elai';

export interface PastefyPaste {
  id: string;
  title: string;
  content: string;
  created: string;
  modified: string;
}
