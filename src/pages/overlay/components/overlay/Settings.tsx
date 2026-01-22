import { classes } from "../../../../utils/classes";
import { typeSafeObjectEntries } from "../../../../utils/helpers";

import useSettings from "../../hooks/useSettings";

import Card from "../../../../components/Card";
import Select from "../Select";
import Toggle from "../Toggle";

import type { OverlayOptionProps } from "./Overlay";

export default function Settings(props: OverlayOptionProps) {
  const { className, isActiveOverlay } = props;
  const settings = useSettings();

  return (
    <Card
      className={classes("absolute top-0 left-0 mx-4 my-6", className)}
      title="Extension Settings"
      autoFocus={isActiveOverlay}
    >
      <ul className="flex flex-col gap-4">
        {typeSafeObjectEntries(settings).map(([key, setting]) => {
          if (!setting.configurable) return null;

          return (
            <li key={key} className="flex items-center">
              {setting.type === "boolean" && (
                <Toggle
                  label={setting.title}
                  value={setting.value}
                  onChange={setting.change}
                />
              )}
              {setting.type === "select" && (
                <Select
                  label={setting.title}
                  value={setting.value}
                  options={setting.options}
                  onChange={setting.change}
                />
              )}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
