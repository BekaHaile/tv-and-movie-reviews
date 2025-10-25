import { useParams, Navigate } from "react-router-dom";
// icons
import { Loader2 } from "lucide-react";

// components
import { CategorySection } from "@/components/CategorySection";
// hooks
import { useGetCategoryCollection } from "@/hooks/useGetCategoryCollection";

interface Props {
  slug?: string;
}

export const CategoryCollectionPage = ({ slug }: Props) => {
  const { categorySlug } = useParams();
  const finalSlug = slug || categorySlug!;
  const { data, isLoading, isError } = useGetCategoryCollection(finalSlug);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );

  if (isError || !data) return <Navigate replace to="/404" />;

  return (
    <div className="container mx-auto py-8">
      {data.categories?.map((cat) => (
        <CategorySection
          key={cat.category_id.id}
          description={cat.category_id.description}
          shows={cat.category_id.shows.map((s) => s.show_id)}
          title={cat.category_id.title}
        />
      ))}
    </div>
  );
};
