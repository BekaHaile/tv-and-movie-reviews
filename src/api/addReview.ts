import { apiClient } from "@/config/apiClient.config";
import { Review } from "@/types/show.types";

export type AddReviewPayload = Omit<Review, "id" | "date_created"> & {
  show_id: string;
};

export const addReview = async (data: AddReviewPayload): Promise<void> => {
  await apiClient.post("/items/review", data);
};
