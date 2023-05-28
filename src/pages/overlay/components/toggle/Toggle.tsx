import { useCallback, type ChangeEvent } from 'react'

import styles from './toggle.module.css'

interface ToggleProps {
  label: string,
  value: boolean
  onChange: (value: boolean) => void
}

export default function Toggle(props: ToggleProps) {
  const { label, value, onChange } = props

  const onChangeNative = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  }, [onChange])

  return (
    <div className={styles.switchContainer}>
      <label className={styles.switch}>
        <span>{label}</span> {/* TODO: This needs to be styled */}
        <input type="checkbox" onChange={onChangeNative} checked={value} />
        <span className={styles.slider}></span>
      </label>
    </div>
  )
}
