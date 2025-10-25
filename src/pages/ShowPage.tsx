import { useParams } from "react-router-dom";
import { useState } from "react";
// icons
import { Loader2, Star, PlusCircle } from "lucide-react";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";

// hooks
import { useGetShow } from "@/hooks/useGetShow";
// components
import { ReviewList } from "@/components/ReviewList";
import { ReviewForm } from "@/components/ReviewForm";

export const ShowPage = () => {
  const { showId } = useParams();
  const { data, isLoading, isError } = useGetShow(showId!);

  const [addReviewOpen, setAddReviewOpen] = useState(false);
  const handleAddReviewClick = () => setAddReviewOpen(true);
  const handleClose = () => setAddReviewOpen(false);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
      </div>
    );

  if (isError || !data)
    return (
      <p className="text-center text-red-600 dark:text-red-400">
        Show not found
      </p>
    );

  const { title, description, thumbnail_src, tmdb_rating, reviews } = data;

  return (
    <div className="container mx-auto px-4 py-8 space-y-10 text-gray-800 dark:text-gray-100 transition-colors">
      {/* --- Show Header Section --- */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          alt={title}
          className="w-full md:w-1/3 rounded-2xl shadow-lg dark:shadow-gray-900/40 object-cover"
          src={thumbnail_src}
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h1>

          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Star className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
            {tmdb_rating}/10
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
