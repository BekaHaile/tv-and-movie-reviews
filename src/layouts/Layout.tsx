import { Suspense } from "react";
import { Outlet } from "react-router-dom";

// components
import { Navbar } from "@/components/Navbar";
import { LoadingFallback } from "@/components/LoadingFallback";

// Layout component responsible for the overall
// layout of the application
export default function Layout() {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-8xl px-6 flex-grow pt-4">
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
