import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Tag, DollarSign, Calendar, Layout } from 'lucide-react';
import type { Milestone } from '@/lib/finance-utils';

interface MilestoneFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (milestone: Omit<Milestone, 'id'>) => void;
  initialAge?: number;
}

export const MilestoneForm: React.FC<MilestoneFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialAge = 30,
}) => {
  const [label, setLabel] = useState('');
  const [age, setAge] = useState(initialAge);
  const [cost, setCost] = useState(1000000);
  const [category, setCategory] = useState<Milestone['category']>('other');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label) return;
    onSave({ label, age, cost, category });
    onClose();
    // Reset
    setLabel('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#0f0f11] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <div>
                <h2 className="text-lg font-black text-white uppercase tracking-tight">New Milestone</h2>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Add life goal to trajectory</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X size={20} className="text-white/40" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Label */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest">
                  <Tag size={12} />
                  Milestone Name
                </label>
                <input
                  autoFocus
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="e.g., Buy Apartment"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Age */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest">
                    <Calendar size={12} />
                    Target Age
                  </label>
                  <input
                    type="number"
                    min="18"
                    max="80"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest">
                    <Layout size={12} />
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Milestone['category'])}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none"
                  >
                    <option value="housing">Housing</option>
                    <option value="business">Business</option>
                    <option value="education">Education</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="family">Family</option>
                    <option value="travel">Travel</option>
                    <option value="retirement">Retirement</option>
                    <option value="health">Health</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Cost */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest">
                  <DollarSign size={12} />
                  Target Cost (INR)
                </label>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98]"
              >
                <Save size={18} />
                Save Milestone
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
