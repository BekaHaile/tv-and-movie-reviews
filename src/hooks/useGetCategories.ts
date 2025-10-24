import { keepPreviousData, useQuery } from "@tanstack/react-query";

// api
import { getCategories } from "@/api/getCategories";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    placeholderData: keepPreviousData,
  });
};
