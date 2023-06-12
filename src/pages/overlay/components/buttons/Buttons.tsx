import { useMemo } from 'react'

import { classes } from '../../../../utils/classes'
import Tooltip from '../../../../utils/global/tooltip/Tooltip'

import styles from './buttons.module.scss'

type ButtonsOptions = Readonly<{ key: string, title: string, type: "primary" | "secondary", icon: string, hoverText: string }[]>;

interface ButtonsProps<T extends ButtonsOptions> {
  options: T;
  onClick: (key: T[number]["key"] | undefined) => void;
  active?: string;
}

export default function Buttons<T extends ButtonsOptions = ButtonsOptions>(props: ButtonsProps<T>) {
  const { options, onClick, active } = props;

  // Add onClick handlers to each, sort by primary/secondary (using current order as tiebreaker)
  const optionsWithOnClick = useMemo(() => options.map(option => ({
    ...option,
    onClick: () => onClick(active === option.key ? undefined : option.key),
    active: active === option.key,
  })).sort((a, b) => {
    if (a.type === b.type) return 0;
    return a.type === "primary" ? -1 : 1
  }), [options, onClick, active]);

  return (
    <div className={styles.activationButtons}>
      {optionsWithOnClick.map((option) => (
        <Tooltip
          key={option.key}
          text={option.hoverText}
        >
          <button
            onClick={option.onClick}
            className={classes(
              styles.btn,
              option.type === "secondary" && styles.secondary,
              option.active && styles.highlighted,
            )}
          >
            <img src={option.icon} alt={option.title} />
          </button>
        </Tooltip>
      ))}
    </div>
  );
}
