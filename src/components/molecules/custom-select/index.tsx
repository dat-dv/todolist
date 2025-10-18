import React from "react";
import type { TCustomSelectProps } from "./custom-select.type";
import ArrowDownIcon from "../../atoms/icons/arrow-down-icon";

const CustomSelect = <T extends string | number = string | number>({
  value,
  onChange,
  options,
  placeholder = "",
  label,
  className = "",
  disabled = false,
}: TCustomSelectProps<T>) => {
  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      {label && (
        <span className="text-xs sm:text-sm text-gray-600 font-medium whitespace-nowrap">
          {label}
        </span>
      )}

      <div className="relative inline-block">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value as T)}
          disabled={disabled}
          className="
            appearance-none
            px-3 sm:px-4 
            py-1.5 sm:py-2
            pr-8 sm:pr-10
            text-xs sm:text-sm
            font-medium
            border border-gray-200
            rounded-md
            bg-white 
            text-gray-700
            hover:border-primary/60
            focus:outline-none 
            focus:border-primary
            transition-colors duration-150
            cursor-pointer
            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:hover:border-gray-200
          "
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <ArrowDownIcon className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
