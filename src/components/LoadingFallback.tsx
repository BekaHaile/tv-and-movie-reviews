import { Spinner } from "@heroui/spinner";
import { Image } from "@heroui/image";

// images
import logoImage from "@/assets/el-logo.png";

export const LoadingFallback = () => (
  <div className="flex flex-col justify-center items-center min-h-screen gap-4">
    <Image alt="El Logo" src={logoImage} width={100} />

    <div className="flex justify-center items-center">
      <Spinner />
      <p className="text-gray-700 dark:text-gray-300 ml-2">Loading...</p>
    </div>
  </div>
);
