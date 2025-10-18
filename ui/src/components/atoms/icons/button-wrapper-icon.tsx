type TButtonWrapperProps = {
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel: string;
  className?: string;
  children: React.ReactNode;
};

const ButtonWrapper: React.FC<TButtonWrapperProps> = ({
  onClick,
  disabled = false,
  ariaLabel,
  className = "",
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`flex items-center justify-center shrink-0 h-8 w-8 sm:h-9 sm:w-9 rounded-md transition disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonWrapper;
