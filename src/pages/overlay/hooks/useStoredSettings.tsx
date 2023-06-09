import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import { typeSafeObjectEntries, typeSafeObjectFromEntries } from '../../../utils/helpers'

const settings = {
  disableChatPopup: {
    title: 'Prevent Mod-triggered Card Popups',
    type: 'boolean',
    process: (value: any) => !!value,
    devOnly: false,
  },
  disableOverlayHiding: {
    title: '(DEV) Prevent app hiding automatically',
    type: 'boolean',
    process: (value: any) => !!value,
    devOnly: true,
  }
}

type SettingsKey = keyof typeof settings

type StoredSettings = {
  [key in SettingsKey]: ReturnType<typeof settings[key]['process']>
}

export type Settings = {
  [key in SettingsKey]: typeof settings[key] & {
    value: StoredSettings[key]
    change: (value: StoredSettings[key]) => void
  }
}

const context = createContext<Settings | undefined>(undefined)

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [stored, setStored] = useState<StoredSettings>(() => {
    // Load settings from local storage on mount, merging with defaults
    const storage = JSON.parse(localStorage.getItem('settings') || '{}')
    return typeSafeObjectEntries(settings)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value.process(storage[key]) }), {} as StoredSettings)
  })

  // Save settings to local storage when they change
  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(stored))
  }, [stored])

  // Change the value of a setting
  const change = useCallback(<Key extends SettingsKey>(key: Key, value: StoredSettings[Key]) => {
    setStored(current => ({ ...current, [key]: value }))
  }, [])

  // Expose a full object for the settings
  const obj = useMemo<Settings>(() => typeSafeObjectFromEntries(typeSafeObjectEntries(settings)
    .map(([key, value]) => [
      key,
      {
        ...value,
        value: stored[key],
        change: (value: any) => change(key, value),
      }
    ])), [stored, change])

  return <context.Provider value={obj}>{children}</context.Provider>
}

const useStoredSettings = () => {
  const ctx = useContext(context)
  if (!ctx) throw new Error("useStoredSettings must be used within a SettingsProvider")
  return ctx
}

export default useStoredSettings
