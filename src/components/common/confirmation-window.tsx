import React from "react";

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backdropFilter: "blur(6px)",
        background: "rgba(255,255,255,0.1)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      <div className="bg-white border-2 border-purple-200 rounded-xl shadow-2xl p-7 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-2 text-purple-400">{title}</h2>
        <p className="mb-5 text-base text-black">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded border border-purple-200 bg-white text-black hover:bg-purple-100 transition"
            onClick={onCancel}
            type="button"
          >
            {cancelText}
          </button>
          <button
            className="px-4 py-2 rounded bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold border border-black transition"
            onClick={onConfirm}
            type="button"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
