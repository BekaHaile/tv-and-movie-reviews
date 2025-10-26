import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Image } from "@heroui/image";

interface ShowCardProps {
  id: string;
  title: string;
  rating: number;
  thumbnail: string;
}

export const ShowCard = ({ id, title, rating, thumbnail }: ShowCardProps) => {
  return (
    <Link
      className="group block bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition-all overflow-hidden"
      to={`/show/${id}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          isBlurred
          isZoomed
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          src={thumbnail}
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded-lg flex items-center gap-1 z-10">
          <Star className="w-3 h-3 text-yellow-400" />
          {rating.toFixed(1)}
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 group-hover:dark:text-indigo-400 transition-colors">
          {title}
        </h3>
      </div>
    </Link>
  );
};
