export type ItemsCategory = {
  id: string;
  slug: string;
  categories: [number];
};

export type ItemsCategoryResponse = {
  data: ItemsCategory[];
};
