import { useCallback, type ChangeEvent } from "react";

interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

interface SelectProps<T extends string = string> {
  label: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
}

export default function Select<T extends string = string>(
  props: SelectProps<T>,
) {
  const { label, value, options, onChange } = props as SelectProps<T>;

  const onChangeNative = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value as T);
    },
    [onChange],
  );

  return (
    <label className="group flex cursor-pointer items-center gap-2">
      <span className="text-xs">{label}</span>
      <select
        className="cursor-pointer rounded-lg border-none bg-alveus-tan-100 px-2 py-1 text-xs text-alveus-green outline-highlight transition-[outline] group-focus-within:outline-3 group-hover:outline-3"
        onChange={onChangeNative}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
