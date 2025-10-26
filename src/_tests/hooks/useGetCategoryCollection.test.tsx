import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useGetCategoryCollection } from "@/hooks/useGetCategoryCollection";
import { apiClient } from "@/config/apiClient.config";

vi.mock("@/config/apiClient.config", () => ({
  apiClient: { get: vi.fn() },
}));

test("fetches category data successfully", async () => {
  (apiClient.get as any).mockResolvedValueOnce({
    data: { data: [{ id: "1", slug: "home", categories: [] }] },
  });

  const queryClient = new QueryClient();

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  const { result } = renderHook(() => useGetCategoryCollection("home"), {
    wrapper: Wrapper,
  });

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
  expect(result.current.data?.slug).toBe("home");
});
