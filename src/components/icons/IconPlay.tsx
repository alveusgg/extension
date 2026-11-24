import { BaseIcon, type IconProps } from "./BaseIcon";

// This SVG code is derived from Heroicons (https://heroicons.com)
// play-circle-outline
export default function IconPlay(props: IconProps) {
  return (
    <BaseIcon viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        strokeWidth={1.5}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
      <path
        fill="none"
        strokeWidth={1.5}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
      />
    </BaseIcon>
  );
}
