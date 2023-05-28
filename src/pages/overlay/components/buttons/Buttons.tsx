import { useMemo } from 'react'

import { classes } from '../../../../utils/classes'

import styles from './buttons.module.css'

type ButtonsOptions = Readonly<{ key: string, title: string, icon: string }[]>;

interface ButtonsProps<T extends ButtonsOptions> {
  options: T;
  onClick: (key: T[number]["key"] | undefined) => void;
  active?: string;
}

export default function Buttons<T extends ButtonsOptions = ButtonsOptions>(props: ButtonsProps<T>) {
  const { options, onClick, active } = props;

  const optionsWithOnClick = useMemo(() => options.map(option => ({
    ...option,
    onClick: () => onClick(active === option.key ? undefined : option.key),
    active: active === option.key,
  })), [options, active, onClick]);

  return (
    <div className={styles.activationButtons}>
      {optionsWithOnClick.map(option => (
        <button key={option.key} onClick={option.onClick} className={classes(option.active && styles.highlighted)}>
          <img src={option.icon} alt={option.title} />
        </button>
      ))}
    </div>
  )
}
