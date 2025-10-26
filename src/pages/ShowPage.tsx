import { useParams } from "react-router-dom";
import { useState } from "react";
// icons
import { Star, PlusCircle, AlertCircle } from "lucide-react";
// heroui components
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Skeleton } from "@heroui/skeleton";
import { Image } from "@heroui/image";

// hooks
import { useGetShow } from "@/hooks/useGetShow";
// components
import { ReviewList } from "@/components/ReviewList";
import { ReviewForm } from "@/components/ReviewForm";

const ShowPage = () => {
  const { showId } = useParams();
  const { data, isLoading, isError } = useGetShow(showId!);

  const [addReviewOpen, setAddReviewOpen] = useState(false);
  const handleAddReviewClick = () => setAddReviewOpen(true);
  const handleClose = () => setAddReviewOpen(false);

  if (isLoading) return <ShowSkeleton />;

  if (isError || !data)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-red-600 dark:text-red-400">
        <AlertCircle className="mb-4" size={48} />
        <span className="text-lg font-medium">Show not found</span>
      </div>
    );

  const { title, description, thumbnail_src, tmdb_rating, reviews } = data;

  return (
    <div className="container mx-auto px-4 py-4 space-y-10 text-gray-800 dark:text-gray-100 transition-colors">
      {/* --- Show Header Section --- */}
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          isBlurred
          isZoomed
          alt={title}
          className="w-full max-w-md md:max-w-sm lg:max-w-xs rounded-2xl shadow-lg dark:shadow-gray-900/40 object-cover mx-auto aspect-[3/4]"
          src={thumbnail_src}
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h1>

          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Star className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
            {tmdb_rating}/5
          </div>

          <p className="text-gray-700 dark:text-gray-300">{description}</p>
        </div>
      </div>

      {/* --- Reviews Section --- */}
      <div className="grid gap-8">
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Reviews
            </h2>
            <Button
              className="flex items-center gap-2"
              color="primary"
              variant="flat"
              onClick={handleAddReviewClick}
            >
              <PlusCircle className="w-5 h-5" />
              Add Review
            </Button>
          </div>

          <ReviewList reviews={reviews ?? []} />
        </div>
      </div>

      {/* --- Review Form Modal --- */}
      <Modal
        backdrop="blur"
        isOpen={addReviewOpen}
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.25 },
            },
            exit: {
              opacity: 0,
              scale: 0.95,
              transition: { duration: 0.2 },
            },
          },
        }}
        placement="center"
        size="lg"
        onClose={handleClose}
        onOpenChange={setAddReviewOpen}
      >
        <ModalContent className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-800 transition-colors">
          <ModalHeader className="text-xl font-semibold border-b border-gray-200 dark:border-gray-800">
            Add a Review
          </ModalHeader>
          <ModalBody className="py-6">
            <ReviewForm showId={showId!} onSuccess={handleClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

const ShowSkeleton = () => (
  <div className="container mx-auto px-4 py-8 space-y-10">
    <div className="flex flex-col md:flex-row gap-6">
      <Skeleton className="h-96 rounded-2xl w-full max-w-md md:max-w-sm lg:max-w-xs rounded-2xl mx-auto" />
      <div className="flex-1 space-y-4">
        <Skeleton className="h-8 w-1/2 rounded" />
        <Skeleton className="h-4 w-1/4 rounded" />
        <Skeleton className="h-20 w-full rounded" />
      </div>
    </div>

    <div className="space-y-4">
      <Skeleton className="h-6 w-1/4 rounded" />
      <div className="space-y-6 md:grid-cols-2 lg:grid-cols-2 grid gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-xl" />
        ))}
      </div>
    </div>
  </div>
);

export default ShowPage;
