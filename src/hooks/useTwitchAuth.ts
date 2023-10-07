import { useSyncExternalStore } from "react";

const authStore = {
  value: null as Twitch.ext.Authorized | null,
  listeners: [] as (() => void)[],
  subscribe: (listener: () => void) => {
    authStore.listeners = [...authStore.listeners, listener];
    return () => {
      authStore.listeners = authStore.listeners.filter((l) => l !== listener);
    };
  },
  snapshot: () => authStore.value,
  update: (newAuth: Twitch.ext.Authorized) => {
    authStore.value = newAuth;
    authStore.listeners.forEach((l) => l());
  },
};

export const bindTwitchAuth = () => {
  // If Twitch isn't available, do nothing
  if (!("Twitch" in window) || !window.Twitch.ext) return;

  // Otherwise, listen for the auth callback
  window.Twitch.ext.onAuthorized((auth: Twitch.ext.Authorized) => {
    authStore.update(auth);
  });
};

// Twitch auth callback may be called before React is ready, so we use an external store
export default () =>
  useSyncExternalStore(authStore.subscribe, authStore.snapshot);
