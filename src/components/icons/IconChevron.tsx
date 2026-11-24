import { BaseIcon, type IconProps } from "./BaseIcon";

// This SVG code is derived from Heroicons (https://heroicons.com)
// chevron-up-outline
export default function IconChevron(props: IconProps) {
  return (
    <BaseIcon viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        strokeWidth={1.5}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 15.75 7.5-7.5 7.5 7.5"
      />
    </BaseIcon>
  );
}
