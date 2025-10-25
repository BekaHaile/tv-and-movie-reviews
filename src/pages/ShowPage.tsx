import { useParams } from "react-router-dom";
// icons
import { Loader2, Star } from "lucide-react";

// hooks
import { useGetShow } from "@/hooks/useGetShow";
// components
import { ReviewList } from "@/components/ReviewList";

export const ShowPage = () => {
  const { showId } = useParams();
  const { data, isLoading, isError } = useGetShow(showId!);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );

  if (isError || !data)
    return <p className="text-center text-red-600">Show not found</p>;

  const { title, description, thumbnail_src, tmdb_rating, reviews } = data;

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          alt={title}
          className="w-full md:w-1/3 rounded-2xl shadow"
          src={thumbnail_src}
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <Star className="w-5 h-5 text-yellow-400" /> {tmdb_rating}/10
          </div>
          <p className="text-gray-700">{description}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          <ReviewList reviews={reviews ?? []} />
        </div>
      </div>
    </div>
  );
};
