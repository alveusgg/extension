import { useCallback, type ChangeEvent } from "react";

import IconCheck from "../../../../components/icons/IconCheck";

import styles from "./toggle.module.scss";

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
    <label className={styles.container}>
      <span className={styles.toggle}>
        <input type="checkbox" onChange={onChangeNative} checked={value} />
        <IconCheck size={18} />
      </span>
      <span className={styles.label}>{label}</span>
    </label>
  );
}
