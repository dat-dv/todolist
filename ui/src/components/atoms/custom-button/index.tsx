import LoadingIcon from "../icons/loading-icon";
import type { TCustomButtonProps } from "./custom-button.type";

const CustomButton = ({
  isLoading = false,
  children,
  className = "",
  disabled,
  ...rest
}: TCustomButtonProps) => {
  return (
    <button
      disabled={isLoading || disabled}
      className={`relative text-white py-2 px-14 bg-primary hover:bg-primary/90 transition-colors rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...rest}
    >
      {isLoading && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2">
          <LoadingIcon />
        </span>
      )}
      {children}
    </button>
  );
};

export default CustomButton;
