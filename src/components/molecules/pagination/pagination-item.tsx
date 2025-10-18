import { type ComponentPropsWithoutRef } from "react";

const PaginationItem = ({
  onClick,
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      onClick={onClick}
      className={`
      px-2 xs:px-3 py-1.5 xs:py-2 
      text-xs xs:text-sm
      rounded-md 
      bg-gray-200 hover:bg-gray-300 
      disabled:opacity-50 disabled:cursor-not-allowed
      flex-shrink-0
      transition-colors
      ${className}
    `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default PaginationItem;
