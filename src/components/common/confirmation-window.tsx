"use client";
import React from "react";
import { createPortal } from "react-dom";

interface ConfirmationWindowProps {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationWindow({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Yes, delete it",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmationWindowProps) {
  if (!open) return null;

  // Modal content to be portalled to document.body so it is not affected
  // by hover/focus handlers in parent components and to avoid layout
  // shifts that could remount the modal.
  const modal = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.4)",
      }}
      // Prevent pointer events from reaching underlying UI which can
      // sometimes trigger hover/focus handlers that mutate parent state.
      onMouseDown={(e) => e.stopPropagation()}
      onMouseMove={(e) => e.stopPropagation()}
      onMouseEnter={(e) => e.stopPropagation()}
    >
      <div
        className="bg-white border-2 border-purple-200 rounded-xl shadow-2xl p-7 w-full max-w-sm"
        // Also stop propagation inside the dialog so clicks don't bubble
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-2 text-purple-400">{title}</h2>
        <p className="mb-5 text-base text-black">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded border border-purple-200 bg-white text-black hover:bg-purple-100 transition"
            onClick={onCancel}
            type="button"
            data-dismissible={"false"}
          >
            {cancelText}
          </button>
          <button
            className="px-4 py-2 rounded bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold border border-black transition"
            onClick={onConfirm}
            type="button"
            data-dismissible={"false"}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(modal, document.body);
}
