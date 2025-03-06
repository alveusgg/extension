import { BaseIcon, type IconProps } from "./BaseIcon";

// This SVG code is derived from FontAwesome (https://fontawesome.com/icons/seedling)
export default function IconPlant(props: IconProps) {
  return (
    <BaseIcon viewBox="-64 -64 640 640" {...props}>
      <path
        fill="currentColor"
        d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0l32 0c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64l32 0c123.7 0 224 100.3 224 224l0 32 0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160C100.3 320 0 219.7 0 96z"
      />
    </BaseIcon>
  );
}
