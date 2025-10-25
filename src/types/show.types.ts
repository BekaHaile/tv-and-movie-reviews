export type Review = {
  id?: string;
  name: string;
  title: string;
  review: string;
  rating: number;
  date_created?: string;
};

export type Show = {
  id: string;
  title: string;
  description: string;
  thumbnail_src: string;
  tmdb_rating: number;
  release_date?: string;
  reviews?: Review[];
};
