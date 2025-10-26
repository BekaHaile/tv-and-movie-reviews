import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
    <h1 className="text-7xl font-bold text-indigo-600">404</h1>
    <p className="mt-4 text-xl text-gray-700">Page not found</p>
    <p className="mt-2 text-gray-500">
      The page you’re looking for doesn’t exist.
    </p>
    <Link
      className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
      to="/"
    >
      Go Home
    </Link>
  </div>
);

export default NotFoundPage;
