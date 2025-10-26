import { keepPreviousData, useQuery } from "@tanstack/react-query";

// api
import { getShow } from "@/api/getShow";
// types
import { Show, ShowFilterInputs } from "@/types/show.types";

export const useGetShow = (showId: string, filters: ShowFilterInputs) => {
  return useQuery<Show, Error>({
    queryKey: ["show", showId, filters],
    queryFn: () => getShow(showId, filters),
    enabled: !!showId,
    placeholderData: keepPreviousData,
  });
};
