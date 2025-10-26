import { apiClient } from "@/config/apiClient.config";
import {
  CategoryCollection,
  CategoryFilterInputs,
} from "@/types/categoryCollection.types";

export const getCategoryCollection = async (
  slug: string,
  filters: CategoryFilterInputs = {}
): Promise<CategoryCollection> => {
  const params: any = {
    filter: {
      slug: { _eq: slug },
    },
    // Commented out limit for future use
    // Limit retrieved fields for optimization based on categories.category_id.shows
    // deep: {
    //   categories: {
    //     category_id: {
    //       shows: {
    //         _limit: 10,
    //       },
    //     },
    //   },
    // },
    fields: [
      "id",
      "slug",
      // Category fields
      "categories.category_id.id",
      "categories.category_id.title",
      "categories.category_id.description",
      // Show fields
      "categories.category_id.shows.id",
      "categories.category_id.shows.show_id.id",
      "categories.category_id.shows.show_id.title",
      "categories.category_id.shows.show_id.tmdb_rating",
      "categories.category_id.shows.show_id.thumbnail_src",
    ],
  };

  // Apply nested filtering inside deep[]
  if (filters.search) {
    params[
      "deep[categories][category_id][shows][show_id][_filter][title][_icontains]"
    ] = filters.search;
  }

  const res = await apiClient.get(`/items/category_collection`, {
    params: params,
  });

  return res.data.data[0];
};
