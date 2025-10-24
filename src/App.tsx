import { Route, Routes } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<AboutPage />} path="/about" />
    </Routes>
  );
}

export default App;
