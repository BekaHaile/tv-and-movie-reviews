import { useMemo } from "react";

// Custom hook to get and set URL search parameters
import { useSearchParams } from "@/hooks/useSearchParams";

// Hook to manage URL filters
export function useUrlFilters<T extends Record<string, any>>() {
  const [rawParams, setSearchParams] = useSearchParams();

  const filters: T = useMemo(() => {
    const parsed = {} as T;

    Object.entries(rawParams).forEach(([key, value]) => {
      if (value === "true") parsed[key as keyof T] = true as T[keyof T];
      else if (value === "false") parsed[key as keyof T] = false as T[keyof T];
      else if (!isNaN(Number(value)))
        parsed[key as keyof T] = Number(value) as T[keyof T];
      else parsed[key as keyof T] = value as T[keyof T];
    });

    return parsed;
  }, [rawParams]);

  const setFilters = (newFilters: Partial<T>) => {
    setSearchParams(newFilters);
  };

  return { filters, setFilters };
}
