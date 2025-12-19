
import React from 'react';
import { StatMetric } from '../types';

const StatsCard: React.FC<{ stat: StatMetric }> = React.memo(({ stat }) => {
  const Icon = stat.icon;
  return (
    <div className="group bg-white dark:bg-white/5 p-6 rounded-[2rem] border border-gray-200 dark:border-white/10 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-red-600/5 relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity bg-current ${stat.color}`}></div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{stat.label}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black dark:text-white tracking-tighter">{stat.value}</h3>
            {stat.change && <span className="text-[10px] font-black text-green-500">{stat.change}</span>}
          </div>
        </div>
        <div className={`p-4 rounded-2xl bg-black/40 border border-white/5 group-hover:scale-110 transition-transform ${stat.color}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
});

export default StatsCard;
