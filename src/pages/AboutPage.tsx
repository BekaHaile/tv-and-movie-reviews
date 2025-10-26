import { titleClass } from "@/styles/primitives";

export default function AboutPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-4 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={titleClass({ color: "violet" })}>About</h1>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          This project is an assignment built for Elantil by Beka Tola. It
          demonstrates a TV & Movies review platform as part of a technical
          assessment.
        </p>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          All content, design, and code are created specifically for this
          assignment. Thank you for reviewing!
        </p>
      </div>
    </section>
  );
}
