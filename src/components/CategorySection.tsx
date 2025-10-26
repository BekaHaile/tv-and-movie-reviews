import { titleClass } from "@/styles/primitives";
// Show card component
import { ShowCard } from "@/components/ShowCard";

interface CategorySectionProps {
  title: string;
  description?: string;
  shows: {
    id: string;
    title: string;
    tmdb_rating: number;
    thumbnail_src: string;
  }[];
}

export const CategorySection = ({
  title,
  description,
  shows,
}: CategorySectionProps) => {
  return (
    <section className="mb-12">
      <div className="mb-4">
        <h2 className={titleClass({ color: "violet" })}>{title}</h2>
        {description && (
          <p className="text-gray-500 text-sm mt-1">{description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {shows
          // Filter out any shows that are missing required fields
          ?.filter((show) => show?.id && show?.title)
          .map((show) => (
            <ShowCard
              key={show?.id}
              id={show?.id}
              rating={show?.tmdb_rating}
              thumbnail={show?.thumbnail_src}
              title={show?.title}
            />
          ))}
      </div>
    </section>
  );
};
