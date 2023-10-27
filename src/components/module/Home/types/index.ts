export interface Book {
  saleInfo: {
    country: string;
    isEbook: boolean;
    saleability: boolean;
  };
  volumeInfo: {
    authors: Array<string>;
    categories: Array<string>;
    description: string;
    imageLinks: {
      thumbnail: string;
      large: string;
      medium: string;
      extraLarge: string;
    };
    publishedDate: string;
    title: string;
    subtitle: string;
  };
  id: string;
}

export type DataPayload<T> = {
  items: T;
};

export interface Filters {
  q?: string;
  orderBy?: string;
  projection?: string;
}
