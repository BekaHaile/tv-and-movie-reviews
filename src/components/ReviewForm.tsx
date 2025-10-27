import { useState } from "react";
// Hero UI
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { addToast } from "@heroui/toast";
// Icons
import { Star } from "lucide-react";

// Hooks
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
  const [hovered, setHovered] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRatingClick = (value: number) => {
    setForm((prev) => ({ ...prev, rating: value }));
  };

  const onSuccessAction = () => {
    setForm({ name: "", title: "", review: "", rating: 0 });
    addToast({
      title: "Review submitted",
      description: "Your review has been submitted successfully.",
      color: "success",
    });
    onSuccess();
  };

  const onErrorAction = () => {
    addToast({
      title: "Submission failed",
      description:
        "There was an error submitting your review. Please try again.",
      color: "danger",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { ...form, rating: Number(form.rating), show_id: showId },
      { onSuccess: onSuccessAction, onError: onErrorAction }
    );
  };

  return (
    <form
      className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-6 shadow-md dark:shadow-gray-900/40 transition-colors"
      onSubmit={handleSubmit}
    >
      {/* ---- Form Title ---- */}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Leave a Review
      </h3>

      {/* ---- Rating Stars ---- */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Your Rating
        </span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              aria-label={`Rate ${value} stars`}
              className="transition-transform hover:scale-110"
              type="button"
              onClick={() => handleRatingClick(value)}
              onMouseEnter={() => setHovered(value)}
              onMouseLeave={() => setHovered(null)}
            >
              <Star
                className={`w-7 h-7 transition-colors ${
                  value <= (hovered ?? form.rating)
                    ? "fill-yellow-400 stroke-yellow-400"
                    : "stroke-gray-400 dark:stroke-gray-500"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* ---- Input Fields ---- */}
      <div className="flex flex-col gap-4">
        <Input
          required
          classNames={{
            inputWrapper:
              "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700",
            input: "text-gray-800 dark:text-gray-100",
          }}
          label="Your Name"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
        />

        <Input
          required
          classNames={{
            inputWrapper:
              "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700",
            input: "text-gray-800 dark:text-gray-100",
          }}
          label="Review Title"
          name="title"
          placeholder="Give your review a title"
          value={form.title}
          onChange={handleChange}
        />

        <Textarea
          required
          classNames={{
            inputWrapper:
              "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700",
            input: "text-gray-800 dark:text-gray-100",
          }}
          label="Your Review"
          minRows={4}
          name="review"
          placeholder="Write your review..."
          value={form.review}
          onChange={handleChange}
        />
      </div>

      {/* ---- Submit Button ---- */}
      <Button
        className="w-full sm:w-auto mx-auto block"
        color="primary"
        disabled={isPending || form.rating === 0}
        isLoading={isPending}
        type="submit"
      >
        {isPending ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
};
