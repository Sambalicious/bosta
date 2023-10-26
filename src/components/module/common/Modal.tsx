import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { PropsWithChildren, ReactNode } from "react";

interface ModalProps {
  isOpen?: boolean;
  isOpenChange?: (isOpen: boolean) => void;
  titleClassName?: string;

  modalTrigger: ReactNode;
}

interface ModalTriggerProps {
  className?: string;
}
export function Modal({
  children,
  modalTrigger,
  isOpen,
  isOpenChange,
  titleClassName,
}: PropsWithChildren<ModalProps>) {
  return (
    <Dialog open={isOpen} onOpenChange={isOpenChange}>
      <DialogTrigger className={cn("outline-none", titleClassName)} asChild>
        {modalTrigger}
      </DialogTrigger>
      {children}
    </Dialog>
  );
}

function ModalFooter({
  children,
  className,
}: PropsWithChildren<ModalTriggerProps>) {
  return <DialogFooter className={cn("", className)}>{children} </DialogFooter>;
}

function ModalTrigger({
  children,
  className,
}: PropsWithChildren<ModalTriggerProps>) {
  return (
    <DialogTrigger className={cn("", className)} asChild>
      {children}
    </DialogTrigger>
  );
}

function ModalContent({
  title,
  children,
}: {
  title: string;

  children: ReactNode;
}) {
  return (
    <>
      {/* <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=closed]:animate-[dialog-overlay-hide_200ms] data-[state=open]:animate-[dialog-overlay-show_200ms]" /> */}
      <DialogContent
        title={title}
        className={cn(
          `fixed max-h-full overflow-y-scroll scrollbar-hide left-1/2 top-1/2 w-full max-w-lg  -translate-x-1/2 -translate-y-1/2 rounded-md bg-[#fff] py-4 px-4 md:px-6 text-gray-900 shadow data-[state=closed]:animate-[dialog-content-hide_200ms] data-[state=open]:animate-[dialog-content-show_200ms]`,
        )}
      >
        {children}

        <ModalFooter />
      </DialogContent>
    </>
  );
}

// Modal.Button = DialogTrigger;
// // Modal.Close = Dialog.Close;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;
Modal.Trigger = ModalTrigger;
