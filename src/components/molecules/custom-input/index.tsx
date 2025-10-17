import type { TCustomInputProps } from "./custom-input.type";

import { forwardRef } from "react";

const CustomInput = forwardRef<HTMLInputElement, TCustomInputProps>(
  ({ label, id, error, className = "", ...rest }, ref) => {
    return (
      <div className="flex flex-col space-y-1 w-full max-w-md">
        <label
          htmlFor={id}
          className={`font-medium ${error ? "text-red-500" : "text-black"}`}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          {...rest}
          className={`w-full p-3 rounded border-2 border-dashed custom-dashed focus:outline-none ${
            error
              ? "border-red-500 text-red-600"
              : "border-gray-300 text-black hover:border-gray-700"
          } ${className}`}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
