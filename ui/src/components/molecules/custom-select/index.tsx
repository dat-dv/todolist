import { useState, useRef, useEffect } from "react";

interface Option<T> {
  value: T;
  label: string;
}

interface CustomSelectProps<T> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  variant?: "horizontal" | "vertical";
}

function CustomSelect<T>({
  options,
  value,
  onChange,
  placeholder = "Select...",
  label,
  className = "",
  variant = "horizontal",
}: CustomSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: Option<T>) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const isVertical = variant === "vertical";
  const containerClasses = isVertical
    ? "flex flex-col gap-2"
    : "flex flex-row items-center gap-3";

  return (
    <div className={`${containerClasses} ${className}`}>
      {label && (
        <label
          className={`text-sm font-medium text-gray-700 ${
            isVertical ? "" : "min-w-fit"
          }`}
        >
          {label}
        </label>
      )}

      <div
        className={`relative ${isVertical ? "w-full" : "flex-1"}`}
        ref={dropdownRef}
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
        >
          <div className="flex items-center justify-between">
            <span
              className={selectedOption ? "text-gray-900" : "text-gray-400"}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${
                isOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full px-4 py-2 text-left hover:bg-primary/10 transition-colors ${
                  option.value === value
                    ? "bg-primary/20 text-primary font-medium"
                    : "text-gray-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomSelect;
