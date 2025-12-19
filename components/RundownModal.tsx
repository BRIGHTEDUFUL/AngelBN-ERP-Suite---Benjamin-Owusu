import React from 'react';
import { X, Clock, Play, Circle, CheckCircle2, Music, Mic2, Megaphone } from 'lucide-react';
import { ScheduleItem, ProgramSegment } from '../types';

interface RundownModalProps {
  isOpen: boolean;
  item: ScheduleItem | null;
  onClose: () => void;
}

const RundownModal: React.FC<RundownModalProps> = ({ isOpen, item, onClose }) => {
  if (!isOpen || !item) return null;

  const segments = item.segments || [];

  const getSegmentIcon = (type: string) => {
    switch(type) {
      case 'Music': return <Music size={14} />;
      case 'Ad': return <Megaphone size={14} />;
      case 'Intro': 
      case 'Outro': return <Circle size={14} />;
      default: return <Mic2 size={14} />;
    }
  };

  const getTypeStyle = (type: string) => {
    switch(type) {
      case 'Ad': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20';
      case 'Music': return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20';
      case 'News': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20';
      case 'Intro':
      case 'Outro': return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/20';
      default: return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20';
    }
  };

  const getRowStyle = (status: string) => {
    if (status === 'Live') return 'bg-red-50 dark:bg-red-900/10 border-l-4 border-l-red-500';
    if (status === 'Done') return 'opacity-50 grayscale bg-gray-50 dark:bg-black/20';
    return 'bg-white dark:bg-white/5';
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0a0f1c] flex justify-between items-start shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-blue-600 text-white">
                Rundown Sheet
              </span>
              <span className="text-xs sm:text-sm font-mono text-gray-500 dark:text-gray-400">{item.timeSlot}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate max-w-[200px] sm:max-w-md">{item.title}</h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Host: {item.host}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content Table - Added overflow-x-auto for mobile */}
        <div className="flex-1 overflow-auto custom-scrollbar p-0">
            {segments.length > 0 ? (
            <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="bg-gray-100 dark:bg-white/5 sticky top-0 z-10 text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                <tr>
                    <th className="px-4 sm:px-6 py-4 w-16">Status</th>
                    <th className="px-4 sm:px-6 py-4 w-24">Duration</th>
                    <th className="px-4 sm:px-6 py-4">Segment Title</th>
                    <th className="px-4 sm:px-6 py-4 w-32">Type</th>
                    <th className="px-4 sm:px-6 py-4 w-1/4">Notes</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                {segments.map((seg) => (
                    <tr key={seg.id} className={`transition-colors ${getRowStyle(seg.status)}`}>
                    <td className="px-4 sm:px-6 py-4">
                        {seg.status === 'Live' && <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>}
                        {seg.status === 'Done' && <CheckCircle2 size={18} className="text-green-500" />}
                        {seg.status === 'Next' && <Clock size={18} className="text-blue-500" />}
                        {seg.status === 'Pending' && <Circle size={18} className="text-gray-300" />}
                    </td>
                    <td className="px-4 sm:px-6 py-4 font-mono font-medium text-gray-700 dark:text-gray-300 text-sm">
                        {seg.duration}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                        <span className={`font-semibold text-sm ${seg.status === 'Live' ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                            {seg.title}
                        </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-bold border uppercase tracking-wide ${getTypeStyle(seg.type)}`}>
                            {getSegmentIcon(seg.type)}
                            {seg.type}
                        </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 italic">
                        {seg.notes || '-'}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 p-8">
                    <Clock size={48} className="mb-4 opacity-20" />
                    <p className="text-lg font-medium text-center">No rundown data available</p>
                    <p className="text-sm text-center">Rundown has not been generated for this program yet.</p>
                </div>
            )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0f1c] flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
             <div className="text-xs text-gray-500 dark:text-gray-400">
                 Total Duration: <span className="font-mono font-bold text-gray-900 dark:text-white">00:57:00</span>
             </div>
             <div className="flex gap-3 w-full sm:w-auto">
                 <button className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 text-sm font-medium whitespace-nowrap">
                     Print Sheet
                 </button>
                 <button className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium shadow-lg flex items-center justify-center gap-2 whitespace-nowrap">
                     <Play size={16} /> Start Show
                 </button>
             </div>
        </div>
      </div>
    </div>
  );
};

export default RundownModal;