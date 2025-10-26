// src/api/getShow.ts
import { apiClient } from "@/config/apiClient.config";
import { Show, ShowFilterInputs } from "@/types/show.types";

export const getShow = async (
  showId: string,
  filters: ShowFilterInputs = {}
): Promise<Show> => {
  const response = await apiClient.get(`/items/show/${showId}`, {
    params: {
      fields: [
        "id",
        "title",
        "description",
        "thumbnail_src",
        "tmdb_rating",
        "release_date",
        "reviews.id",
        "reviews.name",
        "reviews.title",
        "reviews.review",
        "reviews.rating",
        "reviews.date_created",
      ].join(","),
      deep: {
        reviews: {
          _sort: filters.sortBy ? `-${filters.sortBy}` : "-date_created",
        },
      },
    },
  });

  return response.data.data;
};
