export type TCustomInputProps = {
  label?: string;
  id: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  name?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
