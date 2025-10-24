import { title } from "@/components/primitives";
// Hooks
import { useGetCategories } from "@/hooks/useGetCategories";
// Layouts
import DefaultLayout from "@/layouts/Layout";

export default function HomePage() {
  const { data: categories, isLoading } = useGetCategories();

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-4 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h2 className={title({ color: "violet" })}>Categories&nbsp;</h2>

          <div>
            {isLoading ? (
              <p>Loading categories...</p>
            ) : (
              <ul>
                {categories?.data?.map((category) => (
                  <li key={category.id}>{category.slug}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
