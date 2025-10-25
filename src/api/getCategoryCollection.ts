import { apiClient } from "@/config/apiClient.config";
import { CategoryCollection } from "@/types/categoryCollection.types";

export const getCategoryCollection = async (
  slug: string
): Promise<CategoryCollection> => {
  const res = await apiClient.get(`/items/category_collection`, {
    params: {
      filter: { slug: { _eq: slug } },
      fields: [
        "id",
        "slug",
        // category junction
        "categories.category_id.id",
        "categories.category_id.title",
        "categories.category_id.description",
        // show junction
        "categories.category_id.shows.id",
        "categories.category_id.shows.show_id.id",
        "categories.category_id.shows.show_id.title",
        "categories.category_id.shows.show_id.tmdb_rating",
        "categories.category_id.shows.show_id.thumbnail_src",
      ],
    },
  });

  return res.data.data[0];
};
