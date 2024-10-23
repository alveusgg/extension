import Welcome from "../../../../components/welcome/Welcome";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

interface WelcomeCardOverlayProps {
  show: boolean;
  onClose: () => void;
}

export default function WelcomeCardOverlay(props: WelcomeCardOverlayProps) {
  const { show, onClose } = props;

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
          <Welcome />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
