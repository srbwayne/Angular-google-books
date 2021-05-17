
export interface GoogleBooksResult {
  items?: GoogleBookItem[];
  totalItems: number;
}
export interface GoogleBookItem {
  id: string;
  volumeInfo?: GoogleBookVolumeInfo;
  accessInfo: GoogleBookAccessInfo;
}
export interface GoogleBookVolumeInfo {
  title?: string;
  authors?: string[];
  imageLinks?: GoogleBookImageLinks;
  previewLink?: string;
  categories?: string[];
  language?: string;
  publishedDate?: Date;
}
export interface GoogleBookImageLinks {
  thumbnail: string;
}
export interface GoogleBookAccessInfo {
  pdf: GoogleBookAccessInfoPdf;
}
export interface GoogleBookAccessInfoPdf {
  isAvailable: boolean;
  downloadLink?: string;
}
export interface BookItem {
  id: string;
  image: string;
  title: string;
  pdf?: string;
  preview?: string;
  favorite: boolean;
  authors?: string;
  publishedDate?: Date;
  language?: string;
  categories?: string;
}

export class Book implements BookItem {
  id: string;
  image: string;
  title: string;
  pdf?: string;
  preview?: string;
  favorite: boolean;
  authors?: string;
  publishedDate?: Date;
  language?: string;
  categories?: string;
}

export interface BookItemsResult {
  items?: BookItem[];
  totalItems: number;
}

