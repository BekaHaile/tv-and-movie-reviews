import { apiClient } from "@/config/apiClient.config";
// types
import { ItemsCategoryResponse } from "@/types/categories.types";

export const getCategories = async (): Promise<ItemsCategoryResponse> => {
  const response = await apiClient.get("items/category_collection");

  return response.data;
};
