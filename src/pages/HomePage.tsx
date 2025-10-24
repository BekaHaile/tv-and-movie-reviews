import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/Layout";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title({ color: "violet" })}>Home Page&nbsp;</span>
        </div>
      </section>
    </DefaultLayout>
  );
}
