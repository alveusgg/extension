import { BaseIcon, type IconProps } from "./BaseIcon";

// This SVG code is derived from Heroicons (https://heroicons.com)
// check-outline
export default function IconCheck(props: IconProps) {
  return (
    <BaseIcon viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        strokeWidth={1.5}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </BaseIcon>
  );
}
