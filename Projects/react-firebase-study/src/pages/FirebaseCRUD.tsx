import { useEffect, useState } from "react";
import { ClockIcon, DeleteIcon, EditIcon, PlusIcon } from "../components/icons";
import TimerModal, { type TimerFormData } from "../components/TimerModal";
import {
  createTimer,
  deleteTimer,
  getAllTimers,
  updateTimer,
} from "../services/timerService";
import type { Timer } from "../types/Timer";

export default function FirebaseCRUD() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTimer, setEditingTimer] = useState<Timer | null>(null);

  useEffect(() => {
    loadTimers();
  }, []);

  const loadTimers = async () => {
    setLoading(true);
    try {
      const data = await getAllTimers();
      setTimers(data);
    } catch (error) {
      console.log("Failed to load timers", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData: TimerFormData) => {
    setLoading(true);
    try {
      if (editingTimer) {
        await updateTimer(editingTimer.id, formData);
        alert("Timer updated successfully");
      } else {
        await createTimer(formData);
        alert("Timer created successfully");
      }

      setModalVisible(false);
      setEditingTimer(null);
      loadTimers();
    } catch (error) {
      console.log("Failed to save timer", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (timer: Timer) => {
    if (window.confirm(`Are you sure you want to delete "${timer.name}"?`)) {
      setLoading(true);

      deleteTimer(timer.id)
        .then(() => {
          alert("Timer deleted successfully");
          loadTimers();
        })
        .catch(() => alert("Failed to delete timer"))
        .finally(() => setLoading(false));
    }
  };

  const handleEdit = (timer: Timer) => {
    setEditingTimer(timer);
    setModalVisible(true);
  };

  const handleCreate = () => {
    setEditingTimer(null);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingTimer(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Manage Timers</h1>
        <button
          onClick={handleCreate}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <PlusIcon className="w-8 h-8 text-blue-500" />
        </button>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        {loading && timers.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : timers.length === 0 ? (
          <div className="text-center py-16">
            <ClockIcon className="mx-auto h-16 w-16 text-gray-300" />
            <h3 className="mt-4 text-2xl font-bold text-gray-900">
              No Timers Yet
            </h3>
            <p className="mt-2 text-gray-600">
              Create your first timer to get started
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {timers.map((timer: Timer) => (
              <div
                key={timer.id}
                className="bg-white rounded-xl shadow-sm p-5 flex items-start justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {timer.name}
                  </h3>
                  <p className="text-sm text-blue-500 capitalize mb-1">
                    {timer.type}
                  </p>
                  <p className="text-sm text-gray-600">
                    {Math.floor(timer.duration / 60)} minutes
                  </p>
                  {timer.description && (
                    <p className="text-sm text-gray-600 mt-3">
                      {timer.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-3 ml-4">
                  <button
                    onClick={() => handleEdit(timer)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <EditIcon className="w-6 h-6 text-blue-500" />
                  </button>
                  <button
                    onClick={() => handleDelete(timer)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <DeleteIcon className="w-6 h-6 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Timer Modal */}
      <TimerModal
        isVisible={modalVisible}
        onClose={handleCloseModal}
        onSave={handleSave}
        editingTimer={editingTimer}
        loading={loading}
      />
    </div>
  );
}
