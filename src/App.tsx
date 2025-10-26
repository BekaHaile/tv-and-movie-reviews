import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// config
import { routes } from "./config/routes";

// layouts
import Layout from "@/layouts/Layout";
// fallback UI
import { LoadingFallback } from "@/components/LoadingFallback";
import { CategorySkeleton } from "@/components/CategorySkeleton";

// --- Lazy-loaded pages ---
const HomePage = lazy(() => import("@/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ShowPage = lazy(() => import("@/pages/ShowPage"));
const CategoryCollectionPage = lazy(
  () => import("@/pages/CategoryCollectionsPage")
);
const NotFoundPage = lazy(() => import("@/pages/NotFoundPge"));

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route
            element={
              <Suspense fallback={<CategorySkeleton />}>
                <HomePage />
              </Suspense>
            }
            path={routes.home}
          />
          <Route element={<CategoryCollectionPage />} path={routes.category} />
          <Route element={<ShowPage />} path={routes.show} />
          <Route element={<AboutPage />} path={routes.about} />
          <Route element={<NotFoundPage />} path={routes.notFound} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
