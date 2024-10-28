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
      className="fixed inset-0 z-10 flex items-center justify-center transition-opacity data-[closed]:opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 -z-10 bg-black/50" />

      <DialogPanel className="flex max-h-full max-w-full flex-col">
        {children}
      </DialogPanel>
    </Dialog>
  );
}
