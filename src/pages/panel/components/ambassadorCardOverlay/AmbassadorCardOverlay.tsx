import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

import AmbassadorCard, {
  type AmbassadorCardProps,
} from "../../../../components/ambassadorCard/AmbassadorCard";

interface AmbassadorCardOverlayProps {
  ambassador: AmbassadorCardProps["ambassador"];
  show: boolean;
  onClose: () => void;
}

export default function AmbassadorCardOverlay(
  props: AmbassadorCardOverlayProps,
) {
  const { ambassador, show, onClose } = props;

  return (
    <Dialog
      open={show}
      onClose={onClose}
      transition
      className="relative z-10 transition-opacity data-[closed]:opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/50" />

      <div className="fixed inset-0 flex h-full w-full items-center justify-center">
        <DialogPanel>
          <AmbassadorCard ambassador={ambassador} onClose={onClose} />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
