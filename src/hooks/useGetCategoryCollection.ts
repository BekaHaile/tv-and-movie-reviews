import { keepPreviousData, useQuery } from "@tanstack/react-query";

// api
import { getCategoryCollection } from "@/api/getCategoryCollection";

export const useGetCategoryCollection = (slug: string) => {
  return useQuery({
    queryKey: ["categoryCollection", slug],
    queryFn: () => getCategoryCollection(slug),
    placeholderData: keepPreviousData,
    enabled: !!slug,
  });
};
