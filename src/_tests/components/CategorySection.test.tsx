import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { CategorySection } from "@/components/CategorySection";

const mockCategory = {
  category_id: {
    id: "ec366c8a-c091-4d9e-9ad0-84b50e979299",
    title: "Popular",
    description: "See the most popular shows of the moment",
    shows: [
      {
        id: 61,
        show_id: {
          id: "a349b846-d0fa-4c1a-8000-e7a10b95bb7f",
          title: "Dexter",
          tmdb_rating: 7.362,
          thumbnail_src:
            "https://image.tmdb.org/t/p/w500/iDHzRALtZCzHVmx7uyjTTKvMAPB.jpg",
        },
      },
      {
        id: 62,
        show_id: {
          id: "6c67c330-b3a9-4544-8934-2598e249591f",
          title: "Grey's Anatomy",
          tmdb_rating: 8.217,
          thumbnail_src:
            "https://image.tmdb.org/t/p/w500/hjJkrLXhWvGHpLeLBDFznpBTY1S.jpg",
        },
      },
    ],
  },
};

test("renders category title and shows", () => {
  render(
    <MemoryRouter>
      <CategorySection
        description={mockCategory.category_id.description}
        shows={mockCategory.category_id.shows.map((s) => s.show_id)}
        title={mockCategory.category_id.title}
      />
      ,
    </MemoryRouter>,
  );

  expect(screen.getByText("Popular")).toBeInTheDocument();
  expect(screen.getByText("Dexter")).toBeInTheDocument();
  expect(screen.getByText("Grey's Anatomy")).toBeInTheDocument();
});
