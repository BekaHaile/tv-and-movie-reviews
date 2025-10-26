import { useEffect, useRef, ChangeEvent, useState } from "react";
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";

// icons
import { SearchIcon } from "@/components/SVGs";
// hooks
import { useUrlFilters } from "@/hooks/useUrlFilters";
import { useDebounce } from "@/hooks/useDebounce";

type SearchFilters = {
  search?: string;
};

export const SearchBar = () => {
  const { filters, setFilters } = useUrlFilters<SearchFilters>();
  const [value, setValue] = useState(filters.search ?? "");

  // Use debounce hook
  const [debouncedValue] = useDebounce(value, 500);

  const inputRef = useRef<HTMLInputElement>(null);

  // Update local value immediately on typing
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // When the debounced value changes → update URL
  useEffect(() => {
    setFilters({ search: debouncedValue });
  }, [debouncedValue]);

  // Focus on ⌘K or Ctrl+K
  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <Input
      ref={inputRef}
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100 dark:bg-default-50",
        input: "text-sm text-gray-800 dark:text-gray-100",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      value={value}
      onChange={handleChange}
    />
  );
};
