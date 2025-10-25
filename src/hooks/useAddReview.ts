import { useMutation, useQueryClient } from "@tanstack/react-query";

// api
import { addReview, AddReviewPayload } from "@/api/addReview";

export const useCreateReview = (showId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddReviewPayload) => addReview(data),
    onSuccess: () => {
      // ✅ Refetch show data to update reviews instantly
      queryClient.invalidateQueries({ queryKey: ["show", showId] });
    },
    onError: (error: unknown) => {
      console.error("Failed to submit review:", error);
    },
  });
};
