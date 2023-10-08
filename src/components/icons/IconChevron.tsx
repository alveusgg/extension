import { BaseIcon, type IconProps } from "./BaseIcon";

// This SVG code is derived from Heroicons (https://heroicons.com)
// chevron-up
export default function IconChevron(props: IconProps) {
  return (
    <BaseIcon viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M11.3572 7.26627C11.7122 6.91124 12.2878 6.91124 12.6428 7.26627L21.7337 16.3572C22.0888 16.7122 22.0888 17.2878 21.7337 17.6428C21.3787 17.9978 20.8031 17.9978 20.4481 17.6428L12 9.19474L3.55192 17.6428C3.19689 17.9978 2.62129 17.9978 2.26627 17.6428C1.91124 17.2878 1.91124 16.7122 2.26627 16.3572L11.3572 7.26627Z"
      />
    </BaseIcon>
  );
}
