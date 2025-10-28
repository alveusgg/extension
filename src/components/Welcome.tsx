import { useMemo, type Ref } from "react";

import IconGlobe from "./icons/IconGlobe";
import IconAmazon from "./icons/IconAmazon";
import IconInstagram from "./icons/IconInstagram";
import IconTikTok from "./icons/IconTikTok";
import IconTwitter from "./icons/IconTwitter";
import IconBluesky from "./icons/IconBluesky";
import IconFacebook from "./icons/IconFacebook";
import IconPlay from "./icons/IconPlay";
import IconGitHub from "./icons/IconGitHub";

import useChannel from "../hooks/useChannel";

import Card from "./Card";

const socialClass =
  "transition-[color,transform,scale] hover:scale-125 focus:scale-125 hover:text-highlight focus:text-highlight";

interface WelcomeProps {
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export default function Welcome(props: WelcomeProps) {
  const { className, ref } = props;

  const channel = useChannel();
  const nonDefault = useMemo(
    () => !channel || channel.toLowerCase() !== "alveussanctuary",
    [channel],
  );

  return (
    <Card className={className} title="Welcome to Alveus" ref={ref}>
      <p className="mt-2 mb-4">
        Alveus Sanctuary is a 501(c)(3) non-profit organization that functions
        as a wildlife sanctuary and as a virtual education center. These
        non-releasable animals are educational ambassadors so viewers can learn
        from and build a connection to them.
      </p>

      <ul className="mb-2 flex flex-wrap items-center justify-center gap-4">
        <li className={socialClass}>
          <a
            href="https://www.alveussanctuary.org"
            rel="noreferrer"
            target="_blank"
            title="Website"
          >
            <IconGlobe size={32} />
          </a>
        </li>
        <li className={socialClass}>
          <a
            href="https://www.alveussanctuary.org/wishlist"
            rel="noreferrer"
            target="_blank"
            title="Amazon Wishlist"
          >
            <IconAmazon size={32} />
          </a>
        </li>
        <li className={socialClass}>
          <a
            href="https://www.alveussanctuary.org/instagram"
            rel="noreferrer"
            target="_blank"
            title="Instagram"
          >
            <IconInstagram size={32} />
          </a>
        </li>
        <li className={socialClass}>
          <a
            href="https://www.alveussanctuary.org/tiktok"
            rel="noreferrer"
            target="_blank"
            title="TikTok"
          >
            <IconTikTok size={32} />
          </a>
        </li>
        <li className={socialClass}>
          <a
            href="https://www.alveussanctuary.org/twitter"
            rel="noreferrer"
            target="_blank"
            title="X (Twitter)"
          >
            <IconTwitter size={32} />
          </a>
        </li>
        <li className={socialClass}>
          <a
            href="https://www.alveussanctuary.org/bluesky"
            rel="noreferrer"
            target="_blank"
            title="Bluesky"
          >
            <IconBluesky size={32} />
          </a>
        </li>
        <li className={socialClass}>
          <a
            href="https://www.alveussanctuary.org/facebook"
            rel="noreferrer"
            target="_blank"
            title="Facebook"
          >
            <IconFacebook size={32} />
          </a>
        </li>
        {nonDefault && (
          <li className={socialClass}>
            <a
              href="https://www.alveussanctuary.org/live"
              rel="noreferrer"
              target="_blank"
              title="Live"
            >
              <IconPlay size={32} />
            </a>
          </li>
        )}
      </ul>

      <a
        className="flex w-fit items-center justify-center gap-1 text-xs transition-colors hover:text-highlight focus:text-highlight"
        href="https://github.com/alveusgg/extension"
        rel="noreferrer"
        target="_blank"
      >
        Contribute on GitHub
        <IconGitHub size={16} />
      </a>
    </Card>
  );
}
