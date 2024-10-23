import { typeSafeObjectEntries } from "../../../../../utils/helpers";
import { classes } from "../../../../../utils/classes";

import useSettings from "../../../hooks/useSettings";

import Card from "../../../../../components/card/Card";
import Toggle from "../../toggle/Toggle";

import type { OverlayOptionProps } from "../Overlay";

export default function Settings(props: OverlayOptionProps) {
  const { className } = props;
  const settings = useSettings();

  return (
    <Card
      className={classes("absolute left-0 top-0", className)}
      title="Extension Settings"
    >
      <ul className="flex flex-col gap-4">
        {typeSafeObjectEntries(settings).map(([key, setting]) => {
          if (!setting.configurable) return null;

          return (
            <li key={key} className="flex items-center">
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
