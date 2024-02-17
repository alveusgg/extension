import Welcome from "../../../../../components/welcome/Welcome";
import { OverlayOptionProps } from "../Overlay";

export default function WelcomeOverlay(props: OverlayOptionProps) {
  const { className } = props;

  return <Welcome className={className} />;
}
