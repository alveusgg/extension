import Welcome from "../../../../../components/welcome/Welcome";
import { classes } from "../../../../../utils/classes";
import { OverlayOptionProps } from "../Overlay";

export default function WelcomeOverlay(props: OverlayOptionProps) {
  const { className } = props;

  return <Welcome className={classes("absolute left-0 top-0", className)} />;
}
