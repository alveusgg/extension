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
import {
  sortMethods,
  sortOptions,
  type SortMethod,
  type SortOption,
} from "../../../utils/sorting";
import {
  isValidOverlayKey,
  type OverlayKey,
} from "../components/overlay/Overlay";

type Setting = { title: string; configurable: boolean } & (
  | { type: "boolean"; process: (value: any) => boolean }
  | { type: "string"; process: (value: any) => string }
  | {
      type: "select";
      options: SortOption[];
      process: (value: any) => string;
    }
);

const settings = {
  disableChatPopup: {
    title: "Prevent mod-triggered card pop-ups",
    type: "boolean",
    process: (value: any) => !!value,
    configurable: true,
  },
  disableCardEffects: {
    title: "Disable 3D card effects",
    type: "boolean",
    process: (value: any) =>
      !!(
        value ?? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ),
    configurable: true,
  },
  ambassadorSort: {
    title: "Sort cards by",
    type: "select",
    options: sortOptions,
    process: (value: any): SortMethod => {
      return sortMethods.includes(value) ? value : "default";
    },
    configurable: true,
  },
  disableOverlayHiding: {
    title: "(DEV) Prevent app hiding automatically",
    type: "boolean",
    process: (value: any) => !!value,
    configurable: process.env.NODE_ENV === "development",
  },
  openedMenu: {
    title: "Menu that was last opened",
    type: "string",
    process: (value: any): OverlayKey => {
      return isValidOverlayKey(value) ? value : "ambassadors";
    },
    configurable: false,
  },
} as const satisfies Record<string, Setting>;

type SettingsKey = keyof typeof settings;

type StoredSettings = {
  [key in SettingsKey]: ReturnType<(typeof settings)[key]["process"]>;
};

export type Settings = {
  [key in SettingsKey]: (typeof settings)[key] & {
    value: StoredSettings[key];
    change: (value: StoredSettings[key]) => void;
  };
};

const Context = createContext<Settings | undefined>(undefined);

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
      ) as Settings,
    [stored, change],
  );

  return <Context value={obj}>{children}</Context>;
};

const useSettings = () => {
  const ctx = useContext(Context);
  if (!ctx)
    throw new Error("useSettings must be used within a SettingsProvider");
  return ctx;
};

export default useSettings;
