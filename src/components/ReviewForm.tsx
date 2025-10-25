import { useState } from "react";
import { Button } from "@heroui/button";

// hooks
import { useCreateReview } from "@/hooks/useAddReview";

type ReviewFormProps = {
  showId: string;
  onSuccess: () => void;
};

export const ReviewForm = ({ showId, onSuccess }: ReviewFormProps) => {
  const [form, setForm] = useState({
    name: "",
    title: "",
    review: "",
    rating: 0,
  });

  const { mutate, isPending } = useCreateReview(showId);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ ...form, rating: Number(form.rating), show_id: showId });
    setForm({ name: "", title: "", review: "", rating: 0 });
    onSuccess();
  };

  return (
    <form
      className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-4 shadow-md dark:shadow-gray-900/40 transition-colors"
      onSubmit={handleSubmit}
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Leave a Review
      </h3>

      <div className="flex flex-col gap-4">
        <input
          required
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-700
        bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          required
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-700
        bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
          name="title"
          placeholder="Review title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          required
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-700
        bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-[120px]"
          name="review"
          placeholder="Write your review..."
          value={form.review}
          onChange={handleChange}
        />
        <label
          className="block text-sm text-gray-600 dark:text-gray-400"
          htmlFor="rating"
        >
          Rating (1–5):
        </label>
        <input
          required
          className="w-20 p-2 rounded border border-gray-300 dark:border-gray-700
        bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
          id="rating"
          max="5"
          min="1"
          name="rating"
          type="number"
          value={form.rating}
          onChange={handleChange}
        />
      </div>

      <Button
        className="primary transition-colors mx-auto block gap-2"
        color="primary"
        disabled={isPending}
        isLoading={isPending}
        type="submit"
      >
        {isPending ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
};
