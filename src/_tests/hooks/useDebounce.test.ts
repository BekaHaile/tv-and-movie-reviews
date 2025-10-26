import { renderHook, act } from "@testing-library/react";
import { vi, test, expect } from "vitest";

// hooks
import { useDebounce } from "@/hooks/useDebounce";

vi.useFakeTimers();

afterEach(() => {
  vi.clearAllTimers();
});

test("debounces value changes", () => {
  const { result } = renderHook(() => useDebounce("a", 500));
  const [initial] = result.current;

  expect(initial).toBe("a");

  act(() => {
    result.current[1]("b");
    vi.advanceTimersByTime(300);
  });

  // Not yet updated
  expect(result.current[0]).toBe("a");

  act(() => {
    vi.advanceTimersByTime(500);
  });

  // Updated
  expect(result.current[0]).toBe("b");
});
