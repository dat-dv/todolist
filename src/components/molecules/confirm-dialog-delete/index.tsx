import React from "react";
import type { TConfirmDeleteDialogProps } from "./confirm-dialog-delete.type";
import Dialog from "../dialog";
import LoadingIcon from "../../atoms/icons/loading-icon";

const ConfirmDeleteDialog: React.FC<TConfirmDeleteDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  itemName,
  isLoading = false,
}) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-4">
        <p className="text-gray-700">
          {message}
          {itemName && (
            <span className="block mt-2 font-semibold text-gray-900 break-words max-w-full line-clamp-2">
              "{itemName}"
            </span>
          )}
        </p>

        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition disabled:opacity-50 flex items-center justify-center gap-2 relative min-w-[100px]"
          >
            {isLoading && <LoadingIcon className="absolute left-3 w-4 h-4" />}
            <span className={isLoading ? "ml-6" : ""}>Delete</span>
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
