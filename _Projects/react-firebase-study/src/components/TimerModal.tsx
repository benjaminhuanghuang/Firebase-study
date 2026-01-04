import { useEffect, useState } from "react";
import type { Timer } from "../types/Timer";
import { CloseIcon } from "./icons";

interface TimerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (formData: TimerFormData) => Promise<void>;
  editingTimer?: Timer | null;
  loading?: boolean;
}

export interface TimerFormData {
  name: string;
  type: string;
  duration: number;
  description: string;
}

export default function TimerModal({
  isVisible,
  onClose,
  onSave,
  editingTimer,
  loading = false,
}: TimerModalProps) {
  const [formData, setFormData] = useState<TimerFormData>({
    name: "",
    type: "countdown",
    duration: 300,
    description: "",
  });

  // Reset form when modal opens/closes or editing timer changes
  useEffect(() => {
    if (isVisible) {
      if (editingTimer) {
        setFormData({
          name: editingTimer.name,
          type: editingTimer.type,
          duration: editingTimer.duration,
          description: editingTimer.description,
        });
      } else {
        setFormData({
          name: "",
          type: "countdown",
          duration: 300,
          description: "",
        });
      }
    }
  }, [isVisible, editingTimer]);

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert("Timer name is required");
      return;
    }

    await onSave(formData);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingTimer ? "Edit Timer" : "Create Timer"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CloseIcon className="w-7 h-7 text-gray-600" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          <div className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">
                Timer Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter timer name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Type Selector */}
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">
                Timer Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["countdown", "pomodoro", "interval"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFormData({ ...formData, type })}
                    className={`px-4 py-3 rounded-lg border font-semibold capitalize transition-colors ${
                      formData.type === type
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Input */}
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={Math.floor(formData.duration / 60)}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: parseInt(e.target.value || "0") * 60,
                  })
                }
                placeholder="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter description (optional)"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-5 border-t border-gray-200">
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Saving...
              </span>
            ) : editingTimer ? (
              "Update Timer"
            ) : (
              "Create Timer"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
