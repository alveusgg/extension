/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  type ProcessEnv = Record<string, never> & {
    readonly NODE_ENV?: "development" | "production";
    readonly REACT_APP_CHAT_COMMANDS_PRIVILEGED_USERS?: string;
    readonly REACT_APP_DEFAULT_CHANNEL_NAMES?: string;
    readonly REACT_APP_EXTRA_CHANNEL_NAMES?: string;
    readonly REACT_APP_TEST_CHANNEL_NAMES?: string;
    readonly REACT_APP_API_BASE_URL?: string;
    readonly REACT_APP_TIMEZONE?: string;
  };
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}
