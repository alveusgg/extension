import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  typeSafeObjectEntries,
  typeSafeObjectFromEntries,
} from "../../../utils/helpers";

const settings = {
  disableChatPopup: {
    title: "Prevent Mod-triggered Card Popups",
    type: "boolean",
    process: (value: any) => !!value,
    devOnly: false,
    configurable: true,
  },
  disableOverlayHiding: {
    title: "(DEV) Prevent app hiding automatically",
    type: "boolean",
    process: (value: any) => !!value,
    devOnly: true,
    configurable: true,
  },
  openedMenu: {
    title: "Menu that was last opened",
    type: "string",
    process: (value: any) =>
      typeof value === "string" ? value : "ambassadors",
    devOnly: false,
    configurable: false,
  },
};

type SettingsProcessReturnTypes = {
  boolean: boolean;
  string: string;
};

type SettingsKey = keyof typeof settings;

type StoredSettings = {
  [key in SettingsKey]: key extends keyof SettingsProcessReturnTypes
    ? SettingsProcessReturnTypes[key]
    : any;
};

export type Settings = {
  [key in SettingsKey]: {
    title: string;
    type: string;
    process: (value: any) => boolean | string;
    devOnly: boolean;
    configurable: boolean;
    value: StoredSettings[key];
    change: (value: StoredSettings[key]) => void;
  };
};

const context = createContext<Settings | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [stored, setStored] = useState<StoredSettings>(() => {
    // Load settings from local storage on mount, merging with defaults
    const storage = JSON.parse(localStorage.getItem("settings") || "{}");
    return typeSafeObjectEntries(settings).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value.process(storage[key]) }),
      {} as StoredSettings,
    );
  });

  // Save settings to local storage when they change
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(stored));
  }, [stored]);

  // Change the value of a setting
  const change = useCallback(
    <Key extends SettingsKey>(key: Key, value: StoredSettings[Key]) => {
      setStored((current) => ({ ...current, [key]: value }));
    },
    [],
  );

  // Expose a full object for the settings
  const obj = useMemo<Settings>(
    () =>
      typeSafeObjectFromEntries(
        typeSafeObjectEntries(settings).map(([key, value]) => [
          key,
          {
            ...value,
            value: stored[key],
            change: (value: any) => change(key, value),
          },
        ]),
      ),
    [stored, change],
  );

  return <context.Provider value={obj}>{children}</context.Provider>;
};

const useSettings = () => {
  const ctx = useContext(context);
  if (!ctx)
    throw new Error("useSettings must be used within a SettingsProvider");
  return ctx;
};

export default useSettings;
