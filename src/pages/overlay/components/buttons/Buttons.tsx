import { useMemo } from "react";

import Tooltip from "../../../../components/tooltip/Tooltip";

import { classes } from "../../../../utils/classes";

import styles from "./buttons.module.scss";

type ButtonsOptions = Readonly<
  {
    key: string;
    type: "primary" | "secondary";
    icon: (props: { size: number }) => JSX.Element;
    title: string;
  }[]
>;

interface ButtonsProps<T extends ButtonsOptions> {
  options: T;
  onClick: (key: T[number]["key"] | undefined) => void;
  active?: string;
}

export default function Buttons<T extends ButtonsOptions = ButtonsOptions>(
  props: ButtonsProps<T>,
) {
  const { options, onClick, active } = props;

  // Add onClick handlers to each, sort by primary/secondary (using current order as tiebreaker)
  const optionsWithOnClick = useMemo(
    () =>
      options
        .map((option) => ({
          ...option,
          onClick: () => onClick(active === option.key ? "" : option.key),
          active: active === option.key,
        }))
        .sort((a, b) => {
          if (a.type === b.type) return 0;
          return a.type === "primary" ? -1 : 1;
        }),
    [options, onClick, active],
  );

  return (
    <div className={styles.activationButtons}>
      {optionsWithOnClick.map((option) => (
        <Tooltip key={option.key} text={option.title}>
          <button
            onClick={option.onClick}
            className={classes(
              styles.btn,
              option.type === "secondary" && styles.secondary,
              option.active && styles.highlighted,
            )}
          >
            <option.icon size={option.type === "secondary" ? 32 : 48} />
          </button>
        </Tooltip>
      ))}
    </div>
  );
}
