import { Route, Routes } from "react-router-dom";

// config
import { routes } from "./config/routes";

// layouts
import Layout from "@/layouts/Layout";
// pages
import { NotFoundPage } from "@/pages/NotFoundPge";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import { CategoryCollectionPage } from "@/pages/CategoryCollectionsPage";
import { ShowPage } from "@/pages/ShowPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<HomePage />} path={routes.home} />
        <Route element={<CategoryCollectionPage />} path={routes.category} />
        <Route element={<ShowPage />} path={routes.show} />
        <Route element={<AboutPage />} path={routes.about} />
        <Route element={<NotFoundPage />} path={routes.notFound} />
      </Route>
    </Routes>
  );
}

export default App;
