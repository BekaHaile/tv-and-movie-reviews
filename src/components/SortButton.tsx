import { ChevronDown, ArrowUpDown } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";

type SortButtonProps = {
  selected: string;
  onChange: (value: string) => void;
  sortOptions: { value: string; label: string }[];
};

export default function SortButton({
  selected,
  onChange,
  sortOptions,
}: SortButtonProps) {
  const selectedLabel =
    sortOptions.find((opt) => opt.value === selected)?.label || "Sort By";

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="flex items-center gap-2 text-sm md:text-base font-medium"
          color="primary"
          endContent={<ArrowUpDown className="h-4 w-4 opacity-70" />}
          variant="bordered"
        >
          <span className="hidden sm:inline text-gray-700 dark:text-gray-300">
            Sort:
          </span>
          <span className="text-gray-900 dark:text-gray-100">
            {selectedLabel}
          </span>
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Sort options"
        className="min-w-[180px]"
        itemClasses={{
          base: "text-gray-800 dark:text-gray-200",
        }}
      >
        {sortOptions.map((option) => (
          <DropdownItem
            key={option.value}
            isSelected={selected === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
