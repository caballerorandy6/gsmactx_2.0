"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { ReactNode } from "react";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: ReactNode;
  confirmLabel: string;
  pendingLabel?: string;
  tone?: "danger" | "primary";
  isPending?: boolean;
}

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel,
  pendingLabel,
  tone = "danger",
  isPending = false,
}: ConfirmDialogProps) => {
  const Icon = tone === "danger" ? ExclamationTriangleIcon : PaperAirplaneIcon;

  return (
    <Dialog
      open={open}
      onClose={() => {
        if (!isPending) onClose();
      }}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-950/80 transition-opacity duration-150 ease-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 flex items-end justify-center p-4 sm:items-center">
        <DialogPanel
          transition
          className="w-full max-w-md rounded-xl bg-gray-900 p-6 shadow-[0_16px_48px_-12px_rgb(0_0_0/0.6)] ring-1 ring-white/10 transition duration-150 ease-out data-closed:translate-y-2 data-closed:opacity-0"
        >
          <div className="flex gap-4">
            <span
              aria-hidden="true"
              className={clsx(
                "flex size-10 shrink-0 items-center justify-center rounded-full",
                tone === "danger"
                  ? "bg-red-500/15 text-red-400"
                  : "bg-primary-500/15 text-primary-300"
              )}
            >
              <Icon className="size-5" />
            </span>
            <div className="min-w-0">
              <DialogTitle className="text-base font-semibold text-balance text-white">
                {title}
              </DialogTitle>
              <div className="mt-2 text-sm/6 text-pretty text-gray-300">
                {description}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              autoFocus
              onClick={onClose}
              disabled={isPending}
              className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isPending}
              className={clsx(
                "rounded-md px-4 py-2 text-sm font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
                tone === "danger"
                  ? "bg-red-600 hover:bg-red-500 focus-visible:outline-red-500"
                  : "bg-primary-600 hover:bg-primary-700 focus-visible:outline-primary-500"
              )}
            >
              {isPending ? (pendingLabel ?? confirmLabel) : confirmLabel}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
