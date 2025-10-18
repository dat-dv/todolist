import { PATHS } from "../../../configs/path.config";
import { useRouter } from "../../../hooks/use-router";
import SadFaceIcon from "../../atoms/icons/sad-face-icon";

export default function NotFoundView() {
  const router = useRouter();
  const handleGoHome = () => {
    router.push(PATHS.HOME);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-primary-100 px-4">
      <div className="text-center max-w-2xl">
        {/* 404 Large Text */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4 animate-pulse">
            404
          </h1>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Main Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>

        {/* Illustration */}
        <div className="mb-8">
          <SadFaceIcon className="w-64 h-64 mx-auto text-primary/30" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Go Home
          </button>
          <button
            onClick={handleGoBack}
            className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 border-2 border-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
