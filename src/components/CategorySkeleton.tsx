import { Skeleton } from "@heroui/skeleton";

export const CategorySkeleton = () => {
  return (
    <div className="container mx-auto py-4">
      <section className="mb-12">
        <div className="mb-4 space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="group block bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition-all overflow-hidden animate-pulse"
            >
              <div className="relative overflow-hidden">
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
              <div className="p-3">
                <Skeleton className="h-4 w-3/4 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mb-12">
        <div className="mb-4 space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </section>
    </div>
  );
};
