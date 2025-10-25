import { Suspense } from "react";
import { Spinner } from "@heroui/spinner";
import { Outlet } from "react-router-dom";

// components
import { Navbar } from "@/components/Navbar";

// Layout component responsible for the overall
// layout of the application
export default function Layout() {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-8xl px-6 flex-grow pt-8">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
