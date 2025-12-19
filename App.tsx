
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, Calendar, Megaphone, Search, Menu, PlayCircle, Clock, TrendingUp, X, LogOut, 
  Settings, Zap, Sun, Moon, Radio, Tv, Signal, ListOrdered, User, CheckCircle2, Activity, 
  Shield, Archive, Monitor, Command, History, ChevronRight, AlertCircle, HardDrive, 
  BarChart as BarChartIcon, Filter, ExternalLink, MoreVertical, Download, Trash2, ShieldAlert
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, AreaChart, Area, Legend
} from 'recharts';

import { MOCK_SCHEDULE, CHART_DATA, ADS_DATA, MOCK_ARCHIVE, MOCK_EQUIPMENT, MOCK_ADS } from './constants';
import StatsCard from './components/StatsCard';
import ScheduleItemRow from './components/ScheduleItemRow';
import StudioClock from './components/StudioClock';
import LiveWaveform from './components/LiveWaveform';
import BreakingNewsTicker from './components/BreakingNewsTicker';
import LandingPage from './components/LandingPage';
import EditProgramModal from './components/EditProgramModal';
import RundownModal from './components/RundownModal';
import SettingsModal from './components/SettingsModal';
import { ScheduleItem, UserProfile } from './types';

const COLORS = ['#e53935', '#ffeb3b', '#3b82f6', '#10b981'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-charcoal/95 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">{label || 'Metric Details'}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }}></div>
            <p className="text-sm font-black text-white">
              {entry.name}: <span className="text-gray-400 font-medium">{entry.value}{entry.name === 'Audience' ? '%' : ''}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentView, setCurrentView] = useState('overview');
  const [activePlatform, setActivePlatform] = useState<'All' | 'Radio' | 'TV'>('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  // Modal States
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);
  const [rundownItem, setRundownItem] = useState<ScheduleItem | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const filteredSchedule = useMemo(() => {
    return MOCK_SCHEDULE.filter(item => {
      const matchesPlatform = activePlatform === 'All' || item.platform === activePlatform;
      const matchesSearch = item.title.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                            item.host.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchesPlatform && matchesSearch;
    });
  }, [activePlatform, debouncedSearch]);

  const filteredArchive = useMemo(() => {
    return MOCK_ARCHIVE.filter(item => 
      item.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch]);

  const filteredAds = useMemo(() => {
    return MOCK_ADS.filter(ad => 
      ad.client.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch]);

  const filteredEquipment = useMemo(() => {
    return MOCK_EQUIPMENT.filter(eq => 
      eq.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      eq.type.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch]);

  if (!user) return <LandingPage onLogin={(role) => setUser({ name: role, email: `${role.toLowerCase()}@abn.com.gh`, role })} />;

  const canSeeView = (view: string) => {
    if (user.role === 'Admin') return true;
    switch(view) {
      case 'ads': return user.role === 'Traffic Manager';
      case 'equipment': return ['Production Manager', 'Admin'].includes(user.role);
      case 'schedule': return ['Producer', 'Programs Manager', 'Admin'].includes(user.role);
      default: return true;
    }
  };

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'schedule', label: 'Programming', icon: Calendar },
    { id: 'archive', label: 'Repository', icon: Archive },
    { id: 'analytics', label: 'Intelligence', icon: TrendingUp },
    { id: 'ads', label: 'Traffic & Ads', icon: Megaphone },
    { id: 'equipment', label: 'Infrastructure', icon: Monitor },
  ];

  const filteredNav = navItems.filter(item => canSeeView(item.id));

  const renderKPIs = () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
      <StatsCard stat={{ label: 'Live Signals', value: 2, icon: Signal, color: 'text-red-500' }} />
      <StatsCard stat={{ label: 'Ad Performance', value: '92%', icon: Megaphone, color: 'text-yellow-500' }} />
      <StatsCard stat={{ label: 'Media Assets', value: MOCK_ARCHIVE.length, icon: Archive, color: 'text-blue-500' }} />
      <StatsCard stat={{ label: 'Uptime', value: '99.9%', icon: Activity, color: 'text-green-500' }} />
    </div>
  );

  const renderAnalyticsView = () => (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black dark:text-white tracking-tighter">Network Intelligence</h2>
          <p className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] md:tracking-[0.3em] mt-2">Historical Performance Data</p>
        </div>
        <div className="flex bg-white dark:bg-white/5 rounded-xl md:rounded-2xl border border-gray-200 dark:border-white/10 p-1 w-full md:w-auto">
          {['Day', 'Week', 'Month'].map(t => (
            <button key={t} className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest transition-all ${t === 'Week' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}>{t}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        <div className="bg-white dark:bg-white/5 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-2xl">
          <h3 className="text-xs md:text-sm font-black text-gray-500 uppercase tracking-wider md:tracking-widest mb-6 md:mb-10 flex items-center gap-2">
            <TrendingUp size={14} className="text-red-600" /> Aggregate Reach Index
          </h3>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ADS_DATA}>
                <defs>
                  <linearGradient id="colorAds" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e53935" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#e53935" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="ads" name="Audience" stroke="#e53935" strokeWidth={4} fillOpacity={1} fill="url(#colorAds)" animationDuration={1500} animationEasing="ease-in-out" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-white/5 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-2xl">
          <h3 className="text-xs md:text-sm font-black text-gray-500 uppercase tracking-wider md:tracking-widest mb-6 md:mb-10 flex items-center gap-2">
            <BarChartIcon size={14} className="text-yellow-500" /> Platform Load Distribution
          </h3>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ADS_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} content={<CustomTooltip />} />
                <Bar dataKey="ads" name="System Load" fill="#ffeb3b" radius={[6, 6, 0, 0]} animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderScheduleView = () => (
    <div className="bg-white dark:bg-white/5 rounded-2xl md:rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-xl animate-in fade-in slide-in-from-bottom-4 mb-20">
      <div className="p-4 md:p-6 border-b border-gray-200 dark:border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-black dark:text-white">Broadcast Pipeline</h2>
          <p className="text-[9px] md:text-[10px] uppercase font-bold text-gray-500 tracking-wider md:tracking-widest mt-1">Managed Programming Index</p>
        </div>
        <div className="flex bg-gray-100 dark:bg-black/40 p-1 rounded-xl border border-gray-200 dark:border-white/5 w-full sm:w-auto">
          {['All', 'Radio', 'TV'].map(p => (
            <button key={p} onClick={() => setActivePlatform(p as any)} className={`flex-1 sm:flex-none px-4 md:px-5 py-1.5 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest transition-all ${activePlatform === p ? 'bg-white dark:bg-red-600 text-black dark:text-white shadow-md' : 'text-gray-500'}`}>{p}</button>
          ))}
        </div>
      </div>
      <div className="p-4 md:p-6 space-y-3">
        {filteredSchedule.map(item => (
          <ScheduleItemRow key={item.id} item={item} onEdit={setEditingItem} onRundown={setRundownItem} />
        ))}
      </div>
    </div>
  );

  const renderArchiveView = () => (
    <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black dark:text-white tracking-tighter">Media Repository</h2>
          <p className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] md:tracking-[0.3em] mt-2">Digital Asset Archive & Recovery</p>
        </div>
        <button className="px-4 md:px-6 py-2 md:py-2.5 bg-red-600 text-white rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest hover:bg-red-500 transition-all flex items-center gap-2">
          <Download size={12} /> <span className="hidden sm:inline">Batch</span> Export
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {filteredArchive.map(asset => (
          <div key={asset.id} className="bg-white dark:bg-white/5 p-5 md:p-6 rounded-2xl md:rounded-[2rem] border border-gray-200 dark:border-white/10 group hover:border-red-600/30 transition-all">
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <div className="p-2.5 md:p-3 bg-red-600/10 text-red-600 rounded-xl md:rounded-2xl">
                <PlayCircle size={20} />
              </div>
              <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${asset.status === 'Public' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                {asset.status}
              </span>
            </div>
            <h3 className="text-base md:text-lg font-black dark:text-white mb-2 leading-tight group-hover:text-red-500 transition-colors">{asset.title}</h3>
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="flex items-center gap-1.5">
                <Calendar size={11} className="text-gray-500" />
                <span className="text-[9px] md:text-[10px] font-bold text-gray-500">{asset.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={11} className="text-gray-500" />
                <span className="text-[9px] md:text-[10px] font-bold text-gray-500">{asset.duration}</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-white/5">
              <span className="text-[8px] md:text-[9px] font-black text-gray-500 uppercase tracking-wider md:tracking-widest">{asset.category}</span>
              <div className="flex gap-1 md:gap-2">
                <button className="p-1.5 md:p-2 text-gray-500 hover:text-white transition-colors"><Download size={14} /></button>
                <button className="p-1.5 md:p-2 text-gray-500 hover:text-white transition-colors"><MoreVertical size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAdsView = () => (
    <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black dark:text-white tracking-tighter">Traffic Control</h2>
          <p className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] md:tracking-[0.3em] mt-2">Commercial Slot & Campaign Monitoring</p>
        </div>
        <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 md:px-6 py-2 md:py-2.5 bg-white/5 border border-white/10 text-gray-400 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest hover:text-white transition-all flex items-center justify-center gap-2">
            <Filter size={12} /> Filter
          </button>
          <button className="flex-1 sm:flex-none px-4 md:px-6 py-2 md:py-2.5 bg-red-600 text-white rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest hover:bg-red-500 transition-all">
            Add <span className="hidden sm:inline">Campaign</span>
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-white/5 rounded-2xl md:rounded-[2.5rem] border border-gray-200 dark:border-white/10 overflow-hidden overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-white/5">
            <tr className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              <th className="px-8 py-6">Campaign / Client</th>
              <th className="px-8 py-6">Duration</th>
              <th className="px-8 py-6">Scheduled Slots</th>
              <th className="px-8 py-6">Priority</th>
              <th className="px-8 py-6">Status</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredAds.map(ad => (
              <tr key={ad.id} className="hover:bg-white/[0.02] transition-all">
                <td className="px-8 py-6">
                  <p className="text-sm font-black dark:text-white">{ad.client}</p>
                  <p className="text-[10px] font-bold text-gray-500 mt-0.5">{ad.id}</p>
                </td>
                <td className="px-8 py-6 text-sm font-bold dark:text-gray-300">{ad.duration}</td>
                <td className="px-8 py-6">
                  <div className="flex flex-wrap gap-2">
                    {ad.slots.map(s => (
                      <span key={s} className="px-2 py-1 bg-black/40 border border-white/5 rounded text-[9px] font-black dark:text-abnYellow">{s}</span>
                    ))}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`text-[9px] font-black uppercase tracking-widest ${ad.priority === 'High' ? 'text-red-500' : 'text-gray-500'}`}>
                    {ad.priority}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${ad.status === 'Active' ? 'bg-green-500 animate-pulse' : ad.status === 'Pending' ? 'bg-yellow-500' : 'bg-gray-500'}`}></div>
                    <span className="text-[10px] font-black uppercase tracking-widest dark:text-white">{ad.status}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 text-gray-500 hover:text-white transition-colors"><MoreVertical size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderEquipmentView = () => (
    <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black dark:text-white tracking-tighter">Infrastructure Health</h2>
          <p className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] md:tracking-[0.3em] mt-2">Hardware Inventory & Real-time Diagnostic Status</p>
        </div>
        <button className="px-4 md:px-6 py-2 md:py-2.5 bg-yellow-500 text-black rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest hover:bg-yellow-400 transition-all flex items-center gap-2">
          <ShieldAlert size={12} /> <span className="hidden sm:inline">Incident</span> Report
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {filteredEquipment.map(eq => (
          <div key={eq.id} className="bg-white dark:bg-white/5 p-8 rounded-[2.5rem] border border-gray-200 dark:border-white/10 hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-center mb-8">
              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-gray-400">
                {eq.type === 'Audio' ? <Radio size={24} /> : eq.type === 'Visual' ? <Tv size={24} /> : eq.type === 'Transmitter' ? <Signal size={24} /> : <HardDrive size={24} />}
              </div>
              <div className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${eq.status === 'Operational' ? 'bg-green-500/10 text-green-500' : eq.status === 'Maintenance' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>
                {eq.status}
              </div>
            </div>
            <h3 className="text-xl font-black dark:text-white mb-2">{eq.name}</h3>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-8">Asset ID: {eq.id}</p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-gray-600 uppercase">Unit Health</span>
                <span className="text-xs font-black dark:text-white">{eq.health}%</span>
              </div>
              <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${eq.health > 80 ? 'bg-green-500' : eq.health > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${eq.health}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History size={14} className="text-gray-600" />
                <span className="text-[10px] font-bold text-gray-600 uppercase">Last Service: {eq.lastService}</span>
              </div>
              <button className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:text-red-500 transition-colors">Diagnostics</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen relative flex flex-col transition-colors duration-500 ${isDarkMode ? 'bg-charcoal text-slate-200' : 'bg-[#f8fafc] text-slate-900'}`}>
      <div className="fixed inset-0 bg-[linear-gradient(rgba(229,57,53,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(229,57,53,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99] md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      <aside className={`fixed inset-y-0 left-0 z-[100] w-72 backdrop-blur-3xl border-r transform transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'} ${isDarkMode ? 'bg-black/95 border-white/10' : 'bg-white/95 border-gray-200'}`}>
        <div className="h-16 md:h-24 flex items-center justify-between px-6 md:px-10">
          <div className="flex items-baseline gap-0 font-black italic text-3xl md:text-4xl tracking-tighter">
            <span className="text-white">a</span><span className="text-red-600">b</span><span className="text-abnYellow">n</span>
          </div>
          <button 
            className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors" 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        <nav className="px-4 md:px-6 space-y-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 8rem)' }}>
          {filteredNav.map(item => (
            <button key={item.id} onClick={() => { setCurrentView(item.id); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-bold text-sm ${currentView === item.id ? 'bg-red-600 text-white shadow-lg' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
              <item.icon size={18} /> {item.label}
            </button>
          ))}
          <div className="pt-10 space-y-2 border-t border-white/5 mt-10">
            <button onClick={() => setIsSettingsOpen(true)} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-500 font-bold text-sm hover:text-white hover:bg-white/5 transition-all"><Settings size={18} /> System Config</button>
            <button onClick={() => setUser(null)} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 font-bold text-sm hover:bg-red-500/10 transition-all"><LogOut size={18} /> Terminal Exit</button>
          </div>
        </nav>
      </aside>

      <main className="md:ml-72 flex-1 flex flex-col relative z-10">
        <header className="h-16 md:h-20 sticky top-0 z-[90] backdrop-blur-xl border-b border-gray-200 dark:border-white/5 flex items-center justify-between px-4 md:px-6 lg:px-10">
           <div className="flex items-center gap-2 md:gap-4">
              <button className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors" onClick={() => setIsMobileMenuOpen(true)}><Menu size={18}/></button>
              <StudioClock />
           </div>
           <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden lg:flex items-center gap-2 bg-black/40 px-4 py-2 rounded-2xl border border-white/5 group focus-within:ring-2 focus-within:ring-red-600/50">
                <Search size={14} className="text-gray-500" />
                <input type="text" placeholder="Access records..." className="bg-transparent border-none outline-none text-xs text-white placeholder-gray-700 w-32 focus:w-48 transition-all" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">{isDarkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
              <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-4 border-l border-white/10 cursor-pointer" onClick={() => setIsSettingsOpen(true)}>
                <div className="text-right hidden md:block">
                   <p className="text-[10px] font-black dark:text-white leading-none">{user.name}</p>
                   <p className="text-[8px] font-bold text-red-600 uppercase mt-0.5 tracking-widest">{user.role}</p>
                </div>
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center font-black text-white text-sm shadow-xl">
                   {user.name.charAt(0)}
                </div>
              </div>
           </div>
        </header>

        <div className="p-4 md:p-6 lg:p-10 flex-1 overflow-y-auto custom-scrollbar">
            {currentView === 'overview' && (
              <div className="space-y-6 md:space-y-8 pb-20">
                 {renderKPIs()}
                 <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8">
                    <div className="xl:col-span-8 space-y-6 md:space-y-8">
                       {MOCK_SCHEDULE.find(i => i.status === 'On Air') && (
                         <div className="relative overflow-hidden rounded-2xl md:rounded-[2.5rem] bg-[#05070a] border border-white/5 shadow-2xl p-6 md:p-8 group">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-10">
                               <div className="bg-red-600 text-white text-[9px] md:text-[10px] font-black px-3 md:px-4 py-1 md:py-1.5 rounded-full uppercase tracking-wider md:tracking-widest flex items-center gap-2 animate-pulse">LIVE FEED</div>
                               <LiveWaveform />
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white tracking-tighter leading-none mb-4 md:mb-6 group-hover:text-abnYellow transition-colors">{MOCK_SCHEDULE.find(i => i.status === 'On Air')?.title}</h2>
                            <button onClick={() => setRundownItem(MOCK_SCHEDULE.find(i => i.status === 'On Air')!)} className="px-6 md:px-8 py-2.5 md:py-3 bg-white text-black rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-wider md:tracking-widest hover:bg-abnYellow transition-colors">Rundown Console</button>
                         </div>
                       )}
                       {renderScheduleView()}
                    </div>
                    <div className="xl:col-span-4 space-y-6 md:space-y-8">
                       <div className="bg-white dark:bg-white/5 rounded-2xl md:rounded-[2.5rem] p-6 md:p-8 border border-gray-200 dark:border-white/10 shadow-xl">
                          <h3 className="text-xs md:text-sm font-black text-gray-500 uppercase tracking-wider md:tracking-widest mb-6 md:mb-10 flex items-center justify-between">Audience Share <TrendingUp size={14} className="text-red-600" /></h3>
                          <div className="h-56 md:h-64">
                             <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie data={CHART_DATA} innerRadius={70} outerRadius={95} paddingAngle={8} dataKey="value" stroke="none" animationDuration={1500}>
                                     {CHART_DATA.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                  </Pie>
                                  <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                             </ResponsiveContainer>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            )}
            {currentView === 'schedule' && renderScheduleView()}
            {currentView === 'archive' && renderArchiveView()}
            {currentView === 'analytics' && renderAnalyticsView()}
            {currentView === 'ads' && renderAdsView()}
            {currentView === 'equipment' && renderEquipmentView()}
        </div>
      </main>

      <BreakingNewsTicker />
      
      {/* Modals */}
      <EditProgramModal isOpen={!!editingItem} item={editingItem} onClose={() => setEditingItem(null)} onSave={() => setEditingItem(null)} />
      <RundownModal isOpen={!!rundownItem} item={rundownItem} onClose={() => setRundownItem(null)} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />
    </div>
  );
};

export default App;
