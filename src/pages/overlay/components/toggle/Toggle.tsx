import { useCallback, type ChangeEvent } from "react";

import IconCheck from "../../../../components/icons/IconCheck";

interface ToggleProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function Toggle(props: ToggleProps) {
  const { label, value, onChange } = props;

  const onChangeNative = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked);
    },
    [onChange],
  );

  return (
    <label className="group flex cursor-pointer items-center gap-2">
      <span className="relative">
        <input
          type="checkbox"
          className="bg-alveus-tan-100 checked:bg-alveus-tan-200 outline-highlight peer block h-6 w-6 cursor-pointer appearance-none rounded-lg border-none transition-[outline] group-focus-within:outline group-hover:outline"
          onChange={onChangeNative}
          checked={value}
        />
        <IconCheck
          className="text-alveus-green pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity peer-checked:opacity-100"
          size={18}
        />
      </span>
      <span className="text-xs">{label}</span>
    </label>
  );
}
