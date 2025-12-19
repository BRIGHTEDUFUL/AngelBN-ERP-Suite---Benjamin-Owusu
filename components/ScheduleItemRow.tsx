
import React from 'react';
import { Radio, Tv, Edit2, ListOrdered, User, Clock } from 'lucide-react';
import { ScheduleItemRowProps } from '../types';

const ScheduleItemRow: React.FC<ScheduleItemRowProps> = React.memo(({ item, onEdit, onRundown }) => {
  const isOnAir = item.status === 'On Air';
  return (
    <div className={`flex flex-col md:flex-row items-start md:items-center justify-between p-5 rounded-2xl border transition-all group ${isOnAir ? 'bg-red-600/5 border-red-600/20 shadow-lg' : 'bg-white/5 border-white/5 hover:bg-white/[0.04]'}`}>
      <div className="flex items-center gap-6 w-full md:w-1/3 mb-4 md:mb-0">
        <div className="flex flex-col items-center min-w-[50px]">
          <span className="text-[10px] font-black text-gray-600 uppercase">Start</span>
          <span className="text-sm font-black dark:text-white tabular-nums">{item.timeSlot.split(' - ')[0]}</span>
        </div>
        <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
        <div>
           <div className="flex items-center gap-2 mb-1">
             <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${item.status === 'On Air' ? 'bg-red-600 text-white' : item.status === 'Upcoming' ? 'bg-yellow-500 text-black' : 'bg-gray-500/20 text-gray-500'}`}>{item.status}</span>
             {item.platform === 'TV' ? <Tv size={12} className="text-blue-500" /> : <Radio size={12} className="text-orange-500" />}
           </div>
           <h4 className="font-black text-sm dark:text-white tracking-tight">{item.title}</h4>
        </div>
      </div>
      <div className="flex items-center gap-3 w-full md:w-1/3 mb-4 md:mb-0 px-2 lg:px-6">
         <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><User size={14} className="text-red-600" /></div>
         <span className="text-xs font-bold text-gray-500 truncate">{item.host}</span>
      </div>
      <div className="flex items-center justify-between md:justify-end w-full md:w-1/3 gap-4">
         <div className="hidden lg:block text-right">
            <p className="text-[9px] font-black text-gray-600 uppercase">Ads Logged</p>
            <p className="text-xs font-black text-abnYellow tabular-nums">{item.adsScheduled} Blocks</p>
         </div>
         <div className="flex gap-2">
            <button onClick={() => onRundown(item)} className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"><ListOrdered size={16} /></button>
            <button onClick={() => onEdit(item)} className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-red-600 text-gray-500 hover:text-red-600 transition-all"><Edit2 size={16} /></button>
         </div>
      </div>
    </div>
  );
});

export default ScheduleItemRow;
