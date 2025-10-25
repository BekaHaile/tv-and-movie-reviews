import { keepPreviousData, useQuery } from "@tanstack/react-query";

// api
import { getCategoryCollection } from "@/api/getCategoryCollection";
import { CategoryFilterInputs } from "@/types/categoryCollection.types";

export const useGetCategoryCollection = (
  slug: string,
  filters: CategoryFilterInputs = {},
) => {
  return useQuery({
    queryKey: ["categoryCollection", slug, filters],
    queryFn: () => getCategoryCollection(slug, filters),
    placeholderData: keepPreviousData,
    enabled: !!slug,
  });
};
