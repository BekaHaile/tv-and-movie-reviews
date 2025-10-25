import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

/**
 * Custom hook to get and set URL search parameters
 * Returns [paramsObject, setParams]
 */
export const useSearchParams = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse current params into an object
  const params = useMemo(() => {
    return Object.fromEntries(new URLSearchParams(location.search).entries());
  }, [location.search]);

  const setSearchParams = (
    newParams: Record<string, string | number | boolean | undefined | null>,
  ) => {
    const searchParams = new URLSearchParams(location.search);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        searchParams.delete(key);
      } else {
        searchParams.set(key, String(value));
      }
    });

    navigate(
      {
        pathname: location.pathname,
        search: searchParams.toString(),
      },
      { replace: true },
    );
  };

  return [params, setSearchParams] as const;
};
