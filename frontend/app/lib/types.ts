export type Author = {
  id: number;
  name: string;
};

export type Book = {
  id: number;
  title: string;
  description: string;
  publishingDate: string;
  authors: Author[];
};
