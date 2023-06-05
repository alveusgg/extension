import { useMemo, useState } from 'react'

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

  const [hoveredButton, setHoveredButton] = useState<string | undefined>(undefined);
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
      {optionsWithOnClick.map(option => (
        <button
          key={option.key}
          onClick={option.onClick}
          className={classes(option.active && styles.highlighted, option.type === "secondary" && styles.secondary)}
          onMouseEnter={() => setHoveredButton(option.key)}
          onMouseLeave={() => setHoveredButton(undefined)}
        >
          <Tooltip
            text={option.hoverText || option.title}
            isOption={true}
            isShown={option.key === hoveredButton && !option.active}
          >
              <img src={option.icon} alt={option.title} />
          </Tooltip>
        </button>
      ))}
    </div>
  )
}
