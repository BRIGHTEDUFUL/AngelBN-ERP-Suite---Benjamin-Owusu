
import React from 'react';

const LiveWaveform: React.FC = React.memo(() => {
  return (
    <div className="flex items-end gap-[3px] h-6 px-2">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-1.5 bg-red-500 rounded-t-sm equalizer-bar"
          style={{
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${0.6 + Math.random() * 0.4}s`,
            height: '20%',
            willChange: 'height'
          }}
        />
      ))}
    </div>
  );
});

export default LiveWaveform;
