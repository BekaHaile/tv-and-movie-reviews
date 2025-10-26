import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UseQueryResult } from "@tanstack/react-query";

import ShowPage from "@/pages/ShowPage";
import { useGetShow } from "@/hooks/useGetShow";
import { Show } from "@/types/show.types";

// Mock the custom hook
vi.mock("@/hooks/useGetShow", () => ({
  useGetShow: vi.fn(),
}));

// Mock ShowSkeleton
vi.mock("@/pages/ShowPage", async (orig) => {
  const actual = await orig();

  return typeof actual === "object" && actual !== null
    ? {
        ...actual,
        ShowSkeleton: () => <div data-testid="loading">Loading...</div>,
      }
    : {
        ShowSkeleton: () => <div data-testid="loading">Loading...</div>,
      };
});

// Mock components that are not critical to this test
vi.mock("@/components/LoadingFallback", () => ({
  LoadingFallback: () => <div data-testid="loading">Loading...</div>,
}));

vi.mock("@/components/ReviewList", () => ({
  ReviewList: ({ reviews }: any) => (
    <div data-testid="review-list">{reviews.length} Reviews</div>
  ),
}));

// Mock ReviewForm
vi.mock("@/components/ReviewForm", () => ({
  ReviewForm: ({ showId, onSuccess }: any) => (
    <form
      data-testid="review-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSuccess();
      }}
    >
      <p>Mock ReviewForm for {showId}</p>
      <button type="submit">Submit</button>
    </form>
  ),
}));

describe("ShowPage", () => {
  // Import the actual hook to mock its implementation
  const mockUseGetShow = vi.mocked(useGetShow);

  const renderWithRouter = () =>
    render(
      <MemoryRouter initialEntries={["/show/abc123"]}>
        <Routes>
          <Route element={<ShowPage />} path="/show/:showId" />
        </Routes>
      </MemoryRouter>
    );

  it("renders loading state", () => {
    mockUseGetShow.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as unknown as UseQueryResult<Show, Error>);

    renderWithRouter();

    expect(
      document.querySelector(".group.relative.overflow-hidden")
    ).toBeInTheDocument();
  });

  it("renders error state", () => {
    mockUseGetShow.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    } as unknown as UseQueryResult<Show, Error>);

    renderWithRouter();
    expect(screen.getByText(/show not found/i)).toBeInTheDocument();
  });

  it("renders show details and opens modal when Add Review clicked", async () => {
    mockUseGetShow.mockReturnValue({
      data: {
        id: "919554d5-8d8c-4ebb-8217-99f96ba972ea",
        title: "Dexter",
        description:
          "Dexter Morgan, a blood spatter pattern analyst for the Miami Metro Police also leads a secret life as a serial killer, hunting down criminals who have slipped through the cracks of justice.",
        thumbnail_src:
          "https://image.tmdb.org/t/p/w500/q8dWfc4JwQuv3HayIZeO84jAXED.jpg",
        tmdb_rating: 8.221,
        release_date: "2006-10-01T00:00:00",
        reviews: [
          {
            id: "f5edddc5-0aff-41b8-9cac-cacc503ec53d",
            name: "Beka",
            title: "Best series ever",
            review: "GOAT of tv shows",
            rating: 5,
            date_created: "2025-10-26T06:32:14.290Z",
          },
          {
            id: "f5edddc5-0aff-41b8-9cac-cacc503ec54d",
            name: "Mattew",
            title: "I hate it",
            review: "Couldn't finish it",
            rating: 1,
            date_created: "2025-10-26T06:32:14.290Z",
          },
        ],
      },
      isLoading: false,
      isError: false,
    } as unknown as UseQueryResult<Show, Error>);

    renderWithRouter();

    // Ensure main show info is rendered
    expect(screen.getByText("Dexter")).toBeInTheDocument();
    expect(screen.getByText(/a blood spatter/i)).toBeInTheDocument();
    expect(screen.getByText(/8.221/)).toBeInTheDocument();
    expect(screen.getByTestId("review-list")).toHaveTextContent("2 Reviews");

    // Modal should NOT be open yet
    expect(screen.queryByTestId("review-form")).not.toBeInTheDocument();

    // Click "Add Review"
    fireEvent.click(screen.getByRole("button", { name: /add review/i }));

    // Modal should appear
    expect(await screen.findByTestId("review-form")).toBeInTheDocument();
  });
});
