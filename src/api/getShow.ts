// src/api/getShow.ts
import { apiClient } from "@/config/apiClient.config";
import { Show } from "@/types/show.types";

export const getShow = async (showId: string): Promise<Show> => {
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
    },
  });

  return response.data.data;
};
