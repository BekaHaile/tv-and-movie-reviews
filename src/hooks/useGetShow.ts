import { useQuery } from "@tanstack/react-query";

// api
import { getShow } from "@/api/getShow";
// types
import { Show } from "@/types/show.types";

export const useGetShow = (showId: string) => {
  return useQuery<Show, Error>({
    queryKey: ["show", showId],
    queryFn: () => getShow(showId),
    enabled: !!showId,
  });
};
