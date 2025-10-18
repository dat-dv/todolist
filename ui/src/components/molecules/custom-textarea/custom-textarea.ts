export type TCustomTextareaProps = {
  label?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  name?: string;
  error?: string;
  rows?: number;
  maxLength?: number;
  showCharCount?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
  absoluteError?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;
