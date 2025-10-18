import { forwardRef, useEffect, useRef, useState } from "react";
import type { TCustomTextareaProps } from "./custom-textarea";

const CustomTextarea = forwardRef<HTMLTextAreaElement, TCustomTextareaProps>(
  (
    {
      label = "",
      id,
      error,
      className = "",
      rows = 1,
      maxLength,
      showCharCount = false,
      onChange,
      ...rest
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [currentLength, setCurrentLength] = useState(0);

    // Auto-resize function
    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
        // Cập nhật character count
        setCurrentLength(textarea.value.length);
      }
    };

    useEffect(() => {
      adjustHeight();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      adjustHeight();
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="flex flex-col space-y-1 w-full max-w-full flex-1">
        {!!label && (
          <label
            htmlFor={id}
            className={`font-medium text-sm sm:text-base ${
              error ? "text-red-500" : "text-black"
            }`}
          >
            {label}
          </label>
        )}
        <div className="relative w-full">
          <textarea
            ref={(node) => {
              textareaRef.current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            id={id}
            rows={rows}
            maxLength={maxLength}
            onChange={handleChange}
            {...rest}
            className={`
              w-full 
              max-w-full
              px-3
              py-2
              rounded 
              border-2 border-dashed 
              custom-dashed 
              focus:outline-none
              text-sm sm:text-base
              resize-none
              overflow-hidden
              ${
                error
                  ? "border-red-500 text-red-600"
                  : "border-gray-300 text-black hover:border-gray-700 focus:border-gray-700"
              } 
              ${className}
            `}
            style={{
              boxSizing: "border-box",
              minHeight: "40px",
              paddingBottom: showCharCount && maxLength ? "1.5rem" : undefined,
            }}
          />
          {showCharCount && maxLength && (
            <div
              className={`absolute bottom-1.5 right-2 text-xs pointer-events-none ${
                currentLength >= maxLength ? "text-red-500" : "text-gray-500"
              }`}
            >
              {currentLength}/{maxLength}
            </div>
          )}
        </div>
        {error && <p className="text-red-500 text-xs sm:text-sm">{error}</p>}
      </div>
    );
  }
);

CustomTextarea.displayName = "CustomTextarea";

export default CustomTextarea;
