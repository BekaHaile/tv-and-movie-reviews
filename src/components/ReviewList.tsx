import ReactMarkdown from "react-markdown";
// icons
import { Star } from "lucide-react";

// types
import { Review } from "@/types/show.types";

export const ReviewList = ({ reviews }: { reviews: Review[] }) => {
  if (!reviews.length)
    return (
      <p className="text-gray-500 dark:text-gray-400 italic">No reviews yet.</p>
    );

  return (
    <div className="space-y-6 md:grid-cols-2 lg:grid-cols-2 grid gap-6">
      {reviews.map((r) => (
        <div
          key={r.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/40 p-5 transition-colors m-0"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                {r.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                by <span className="font-medium">{r.name}</span>
                {r.date_created && (
                  <>
                    {" · "}
                    <span className="text-gray-400 dark:text-gray-500">
                      {new Date(r.date_created).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </>
                )}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {r.rating}/10
              </span>
            </div>
          </div>

          <div
            className="prose prose-sm max-w-none text-gray-800 dark:text-gray-200
                       prose-headings:text-gray-900 dark:prose-headings:text-gray-100
                       prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                       prose-em:text-gray-700 dark:prose-em:text-gray-300
                       prose-p:text-gray-700 dark:prose-p:text-gray-300
                       prose-a:text-indigo-600 dark:prose-a:text-indigo-400"
          >
            <ReactMarkdown>{r.review}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
};
