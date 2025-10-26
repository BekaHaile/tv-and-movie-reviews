import { useParams, Navigate } from "react-router-dom";
// icons
import { Search } from "lucide-react";

// components
import { CategorySection } from "@/components/CategorySection";
// hooks
import { useGetCategoryCollection } from "@/hooks/useGetCategoryCollection";
import { useUrlFilters } from "@/hooks/useUrlFilters";
// types
import { CategoryFilterInputs } from "@/types/categoryCollection.types";
import { CategorySkeleton } from "@/components/CategorySkeleton";

interface Props {
  slug?: string;
}

const CategoryCollectionPage = ({ slug }: Props) => {
  const { categorySlug } = useParams();
  const finalSlug = slug || categorySlug!;

  const { filters } = useUrlFilters<CategoryFilterInputs>();

  const { data, isLoading, isError } = useGetCategoryCollection(
    finalSlug,
    filters,
  );

  if (isLoading) return <CategorySkeleton />;

  const hasFilters = Object.keys(filters).length > 0;

  // Redirect to 404 if no data for the given slug
  if ((isError || !data) && !hasFilters) return <Navigate replace to="/404" />;

  // Optimized check: are there any shows in any category?
  const hasShows = filters.search
    ? Boolean(
        data?.categories?.some(
          (cat) =>
            Array.isArray(cat.category_id?.shows) &&
            cat.category_id.shows.some((s) => !!s.show_id),
        ),
      )
    : true;

  if (hasFilters && (!data || !hasShows)) {
    // Show a message indicating that no results were found
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-700 dark:text-gray-300">
        <Search className="mb-4 text-gray-400 dark:text-gray-500" size={48} />
        <span className="text-lg font-medium">
          No results found for the applied filters.
        </span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4">
      {data?.categories
        ?.filter(
          // Only include categories that have shows
          (cat) => cat.category_id?.shows.filter((s) => s.show_id).length > 0,
        )
        .map((cat) => (
          <CategorySection
            key={cat.category_id.id}
            description={cat.category_id.description}
            shows={cat.category_id?.shows.map((s) => s.show_id)}
            title={cat.category_id.title}
          />
        ))}
    </div>
  );
};

export default CategoryCollectionPage;
