import { typeSafeObjectEntries } from "../../../../../utils/helpers";

import useSettings from "../../../hooks/useSettings";

import Card from "../../../../../components/card/Card";
import Toggle from "../../toggle/Toggle";

import type { OverlayOptionProps } from "../Overlay";

import styles from "./settings.module.scss";

export default function Settings(props: OverlayOptionProps) {
  const { className } = props;
  const settings = useSettings();

  return (
    <Card className={className} title="Extension Settings">
      <ul className={styles.settings}>
        {typeSafeObjectEntries(settings).map(([key, setting]) => {
          if (!setting.configurable) return null;

          return (
            <li key={key}>
              {setting.type === "boolean" && (
                <Toggle
                  label={setting.title}
                  value={setting.value as boolean}
                  onChange={setting.change as (value: boolean) => void}
                />
              )}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
