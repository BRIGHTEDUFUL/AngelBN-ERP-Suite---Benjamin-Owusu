import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ScheduleItem, ProgramStatus } from '../types';

interface EditProgramModalProps {
  isOpen: boolean;
  item: ScheduleItem | null;
  onClose: () => void;
  onSave: (item: ScheduleItem) => void;
}

const EditProgramModal: React.FC<EditProgramModalProps> = ({ isOpen, item, onClose, onSave }) => {
  const [formData, setFormData] = useState<ScheduleItem | null>(null);

  useEffect(() => {
    if (item) {
      setFormData({ ...item });
    }
  }, [item]);

  if (!isOpen || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center p-4">
      <div className="w-full max-w-md max-h-[95vh] flex flex-col rounded-[2rem] shadow-2xl overflow-hidden bg-white dark:bg-[#0a0f1c] border border-gray-200 dark:border-white/10 animate-in fade-in zoom-in-95 duration-300">
        <div className="p-6 flex justify-between items-center border-b bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/5 shrink-0">
          <div>
            <h3 className="font-black text-xl tracking-tighter text-gray-900 dark:text-white">Program Config</h3>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Network Identity Modification</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl transition-all text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 active:scale-90">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto custom-scrollbar p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1.5 ml-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-2xl px-4 py-3 outline-none transition-all border focus:ring-2 focus:ring-red-600/50 focus:border-red-600 bg-white border-gray-200 text-gray-900 dark:bg-black/30 dark:border-white/10 dark:text-white font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1.5 ml-1">Host Identity</label>
              <input
                type="text"
                value={formData.host}
                onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                className="w-full rounded-2xl px-4 py-3 outline-none transition-all border focus:ring-2 focus:ring-red-600/50 focus:border-red-600 bg-white border-gray-200 text-gray-900 dark:bg-black/30 dark:border-white/10 dark:text-white font-bold text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1.5 ml-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as ProgramStatus })}
                  className="w-full rounded-2xl px-4 py-3 outline-none transition-all border focus:ring-2 focus:ring-red-600/50 focus:border-red-600 bg-white border-gray-200 text-gray-900 dark:bg-black/30 dark:border-white/10 dark:text-white font-bold text-sm appearance-none cursor-pointer"
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="On Air">On Air</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1.5 ml-1">Feed Platform</label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value as 'Radio' | 'TV' })}
                  className="w-full rounded-2xl px-4 py-3 outline-none transition-all border focus:ring-2 focus:ring-red-600/50 focus:border-red-600 bg-white border-gray-200 text-gray-900 dark:bg-black/30 dark:border-white/10 dark:text-white font-bold text-sm appearance-none cursor-pointer"
                >
                  <option value="Radio">Radio (FM)</option>
                  <option value="TV">Television (UHF)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1.5 ml-1">Inventory (Ad Slots)</label>
              <input
                type="number"
                value={formData.adsScheduled}
                onChange={(e) => setFormData({ ...formData, adsScheduled: parseInt(e.target.value) || 0 })}
                className="w-full rounded-2xl px-4 py-3 outline-none transition-all border focus:ring-2 focus:ring-red-600/50 focus:border-red-600 bg-white border-gray-200 text-gray-900 dark:bg-black/30 dark:border-white/10 dark:text-white font-bold text-sm"
              />
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-transparent dark:text-gray-400 dark:hover:bg-white/5 active:scale-95"
              >
                Discard
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-red-600 rounded-2xl text-white font-black text-[10px] uppercase tracking-widest hover:bg-red-500 shadow-xl shadow-red-900/20 transition-all active:scale-95"
              >
                Commit Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProgramModal;