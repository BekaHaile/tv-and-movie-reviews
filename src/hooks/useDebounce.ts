import { useCallback, useEffect, useRef, useState } from "react";

const DEBOUNCE_DELAY = 500;

export const useDebounce = <T>(
  value: T,
  delay: number = DEBOUNCE_DELAY,
): [T, (value: T) => void] => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  const debouncedCallback = useCallback(
    (value: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
    },
    [delay],
  );

  return [debouncedValue, debouncedCallback];
};
