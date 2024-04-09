export interface BookKey {
  id: string;
}

export interface Book extends BookKey {
  title: string;
  author: string;
  publicationYear: number;
}
