export type Show = {
  id: string;
  title: string;
  tmdb_rating: number;
  thumbnail_src: string;
};

export type CategoryShow = {
  id: number;
  show_id: Show;
};

export type Category = {
  id: string;
  title: string;
  description: string;
  shows: CategoryShow[];
};

export type CategoryCollectionCategory = {
  category_id: Category;
};

export type CategoryCollection = {
  id: string;
  slug: string;
  categories: CategoryCollectionCategory[];
};

export type CategoryFilterInputs = {
  search?: string;
};
