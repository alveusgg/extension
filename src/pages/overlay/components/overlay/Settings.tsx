import { classes } from "../../../../utils/classes";
import { typeSafeObjectEntries } from "../../../../utils/helpers";

import useSettings from "../../hooks/useSettings";

import Card from "../../../../components/Card";
import Select from "../Select";
import Toggle from "../Toggle";

import type { OverlayOptionProps } from "./Overlay";

export default function Settings(props: OverlayOptionProps) {
  const { className } = props;
  const settings = useSettings();

  return (
    <Card
      className={classes("absolute top-0 left-0 mx-4 my-6", className)}
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
              {setting.type === "select" && "options" in setting && (
                <Select
                  label={setting.title}
                  value={setting.value as string}
                  options={
                    setting.options as { value: string; label: string }[]
                  }
                  onChange={setting.change as (value: string) => void}
                />
              )}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
