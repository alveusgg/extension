import { useMemo } from "react";

import IconGlobe from "../../../../../components/icons/IconGlobe";
import IconAmazon from "../../../../../components/icons/IconAmazon";
import IconInstagram from "../../../../../components/icons/IconInstagram";
import IconTikTok from "../../../../../components/icons/IconTikTok";
import IconTwitter from "../../../../../components/icons/IconTwitter";
import IconTwitch from "../../../../../components/icons/IconTwitch";
import IconGitHub from "../../../../../components/icons/IconGitHub";

import useChannel from "../../../../../hooks/useChannel";

import Card from "../../card/Card";

import type { OverlayOptionProps } from "../Overlay";

import styles from "./welcome.module.scss";

export default function Welcome(props: OverlayOptionProps) {
  const { className } = props;

  const channel = useChannel();
  const nonDefault = useMemo(
    () => !channel || channel.toLowerCase() !== "alveussanctuary",
    [channel],
  );

  return (
    <Card className={className} title="Welcome to Alveus">
      <p className={styles.intro}>
        Alveus is a 501(c)(3) non-profit organization that functions as an
        exotic animal sanctuary and as a virtual education center. These
        non-releasable animals are educational ambassadors so viewers can learn
        from and build a connection to them.
      </p>

      <ul className={styles.socials}>
        <li>
          <a
            href="https://www.alveussanctuary.org/"
            rel="noreferrer"
            target="_blank"
            title="Website"
          >
            <IconGlobe size={32} />
          </a>
        </li>
        <li>
          <a
            href="https://smile.amazon.com/hz/wishlist/ls/ZM472JRT5QXG"
            rel="noreferrer"
            target="_blank"
            title="Amazon Wishlist"
          >
            <IconAmazon size={32} />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/alveussanctuary/"
            rel="noreferrer"
            target="_blank"
            title="Instagram"
          >
            <IconInstagram size={32} />
          </a>
        </li>
        <li>
          <a
            href="https://www.tiktok.com/@alveussanctuary"
            rel="noreferrer"
            target="_blank"
            title="TikTok"
          >
            <IconTikTok size={32} />
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/AlveusSanctuary"
            rel="noreferrer"
            target="_blank"
            title="Twitter"
          >
            <IconTwitter size={32} />
          </a>
        </li>
        {nonDefault && (
          <li>
            <a
              href="https://www.twitch.tv/AlveusSanctuary"
              rel="noreferrer"
              target="_blank"
              title="Twitch"
            >
              <IconTwitch size={32} />
            </a>
          </li>
        )}
      </ul>

      <a
        className={styles.contribute}
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
