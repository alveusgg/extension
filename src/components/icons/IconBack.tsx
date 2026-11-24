import { BaseIcon, type IconProps } from "./BaseIcon";

// This SVG code is derived from Heroicons (https://heroicons.com)
// arrow-left-outline
export default function IconBack(props: IconProps) {
  return (
    <BaseIcon viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        strokeWidth={1.5}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </BaseIcon>
  );
}
