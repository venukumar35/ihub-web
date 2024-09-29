import { Input } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { SearchNormal1 } from "iconsax-react";
import { useRef, useEffect } from "react";

interface SearchInputProps {
  onSearch: (value: string) => void; // Add a prop for the search callback
}

function SearchInput({ onSearch }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [debouncedValue, setDebouncedValue] = useDebouncedState("", 500);

  const handleSearch = () => {
    const inputValue = inputRef.current?.value ?? "";
    if (inputValue !== debouncedValue) {
      setDebouncedValue(inputValue);
    }
  };

  // Effect to trigger the parent search handler whenever the debounced value changes
  useEffect(() => {
    onSearch(debouncedValue); // Trigger the search handler in Home component
  }, [debouncedValue, onSearch]);

  return (
    <div className="w-full">
      <Input
        size="xs"
        radius={"md"}
        rightSectionPointerEvents="all"
        ref={inputRef}
        variant="default"
        onChange={handleSearch}
        rightSection={<SearchNormal1 variant="Broken" size="20" color="#555555" />}
        className="focus:border-blue-500 w-80"
      ></Input>
    </div>
  );
}

export default SearchInput;
