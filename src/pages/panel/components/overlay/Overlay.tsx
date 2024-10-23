import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

interface OverlayProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Overlay(props: OverlayProps) {
  const { show, onClose, children } = props;

  return (
    <Dialog
      open={show}
      onClose={onClose}
      transition
      className="relative z-10 transition-opacity data-[closed]:opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/50" />

      <div className="fixed inset-0 flex h-full w-full items-center justify-center">
        <DialogPanel>{children}</DialogPanel>
      </div>
    </Dialog>
  );
}
