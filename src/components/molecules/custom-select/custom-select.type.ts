export type TCustomSelectOption<T extends string | number = string | number> = {
  value: T;
  label: string;
};

export type TCustomSelectProps<T extends string | number = string | number> = {
  value: T;
  onChange?: (value: T) => void;
  options: TCustomSelectOption<T>[];
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
};
