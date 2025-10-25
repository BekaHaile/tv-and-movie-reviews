import { Route, Routes } from "react-router-dom";

// config
import { routes } from "./config/routes";

// layouts
import Layout from "@/layouts/Layout";
// pages
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import { CategoryCollectionPage } from "@/pages/CategoryCollectionsPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<HomePage />} path={routes.home} />
        <Route element={<CategoryCollectionPage />} path={routes.category} />
        <Route element={<AboutPage />} path={routes.about} />
      </Route>
    </Routes>
  );
}

export default App;
