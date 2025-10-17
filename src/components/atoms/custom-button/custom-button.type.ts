export type TCustomButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading?: boolean;
    children: React.ReactNode;
  };
