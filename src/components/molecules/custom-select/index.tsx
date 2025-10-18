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
            py-1.5 
            pr-8 sm:pr-10
            text-xs sm:text-sm
            font-medium
            border-2 border-gray-300 
            rounded-[6px]
            bg-white 
            hover:border-primary
            focus:outline-none 
            focus:ring-2 
            focus:ring-primary
            focus:border-primary
            transition-all
            cursor-pointer
            shadow-sm
            hover:shadow-md
            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:hover:border-gray-300
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
          <ArrowDownIcon />
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
