
import React, { useState, useEffect } from 'react';
import { Edit3, X, Bell, Megaphone } from 'lucide-react';

const BreakingNewsTicker: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [headlines, setHeadlines] = useState([
    "Ministry of Sports announces new stadium renovation plans for Kumasi.",
    "Heavy rains expected in Greater Accra this evening.",
    "Major congestion reported on the Accra-Tema Motorway.",
    "Cedi stabilizes against the Dollar in early trading.",
    "Angel TV Exclusive: Interview with the Vice President scheduled for Friday 8 AM."
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [newHeadline, setNewHeadline] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate headlines for a less "busy" look than a constant scroll
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [headlines.length, isVisible]);

  const addHeadline = () => {
    if (newHeadline.trim()) {
      setHeadlines([newHeadline, ...headlines]);
      setNewHeadline('');
      setIsEditing(false);
      setCurrentIndex(0);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-2xl animate-in slide-in-from-bottom-8 duration-500">
        <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center overflow-hidden h-12 pr-1">
          {/* Label */}
          <div className="h-full bg-red-600 px-4 flex items-center gap-2 shrink-0">
             <Megaphone size={14} className="text-white animate-bounce" />
             <span className="text-white font-black text-[10px] uppercase tracking-widest hidden sm:block">Update</span>
          </div>

          {/* Current Headline */}
          <div className="flex-1 px-4 overflow-hidden">
             <div key={currentIndex} className="animate-in slide-in-from-right-4 fade-in duration-700 text-[11px] sm:text-xs font-bold text-gray-200 truncate">
               {headlines[currentIndex]}
             </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <button 
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-500 hover:text-white transition-colors"
              title="Edit Headlines"
            >
              <Edit3 size={14} />
            </button>
            <div className="w-px h-6 bg-white/10 mx-1"></div>
            <button 
              onClick={() => setIsVisible(false)}
              className="p-2 text-gray-500 hover:text-red-500 transition-colors"
              title="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Ticker Management Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-gray-200 dark:border-white/10 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-black text-xl text-gray-900 dark:text-white tracking-tighter">News Feed Manager</h3>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Live Broadcast Ticker Content</p>
              </div>
              <button onClick={() => setIsEditing(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newHeadline} 
                  onChange={(e) => setNewHeadline(e.target.value)}
                  placeholder="Type new operational update..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-black/40 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-red-600/50"
                />
                <button 
                  onClick={addHeadline}
                  className="bg-red-600 text-white px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-red-500 transition-all active:scale-95 shadow-lg shadow-red-900/20"
                >
                  Post
                </button>
              </div>

              <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-2 pr-2">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Current Queue</p>
                {headlines.map((h, i) => (
                  <div key={i} className="group text-xs p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-transparent hover:border-red-600/20 transition-all flex justify-between items-center">
                    <span className="truncate text-gray-700 dark:text-gray-300 font-medium">{h}</span>
                    <button 
                      onClick={() => setHeadlines(headlines.filter((_, idx) => idx !== i))} 
                      className="p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BreakingNewsTicker;
