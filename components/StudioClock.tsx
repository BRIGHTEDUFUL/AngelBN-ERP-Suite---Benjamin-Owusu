
import React, { useState, useEffect } from 'react';

const StudioClock: React.FC = React.memo(() => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-end leading-none border-r border-gray-200 dark:border-white/10 pr-3 mr-3 md:pr-6 md:mr-6">
      <div className="text-lg md:text-2xl font-mono font-bold tracking-wide md:tracking-widest text-gray-900 dark:text-white tabular-nums">
        {time.toLocaleTimeString('en-GB', { hour12: false })}
      </div>
      <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-gray-500 dark:text-gray-400 mt-0.5 md:mt-1 hidden sm:block">
        {time.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }).toUpperCase()} • ACCRA
      </div>
    </div>
  );
});

export default StudioClock;
