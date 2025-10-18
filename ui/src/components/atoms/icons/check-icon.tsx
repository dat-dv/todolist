import type { ComponentPropsWithoutRef } from "react";

const CheckIcon = ({
  className = "h-4 w-4",
  ...rest
}: ComponentPropsWithoutRef<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    {...rest}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default CheckIcon;
