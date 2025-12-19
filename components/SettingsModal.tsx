import React, { useState } from 'react';
import { X, User, Bell, Moon, Shield, Save, Monitor, Sun, CheckCircle2 } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, isDarkMode, toggleTheme }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'security'>('profile');
  const [profile, setProfile] = useState({ name: 'Program Manager', email: 'manager@abn.com', role: 'Admin' });
  const [notifications, setNotifications] = useState({ email: true, push: true, weekly: false });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10 flex flex-col md:flex-row h-[600px] md:h-[500px]">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-gray-50 dark:bg-[#0a0f1c] border-b md:border-b-0 md:border-r border-gray-200 dark:border-white/10 p-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 px-2">Settings</h2>
            <nav className="space-y-1">
                <button 
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5'}`}
                >
                    <User size={18} /> Profile
                </button>
                <button 
                    onClick={() => setActiveTab('preferences')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'preferences' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5'}`}
                >
                    <Monitor size={18} /> Preferences
                </button>
                <button 
                    onClick={() => setActiveTab('security')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'security' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5'}`}
                >
                    <Shield size={18} /> Security
                </button>
            </nav>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 dark:text-white capitalize">{activeTab} Settings</h3>
                <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400">
                    <X size={20} />
                </button>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                {activeTab === 'profile' && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-white dark:border-[#0f172a] shadow-lg">
                                PM
                            </div>
                            <div>
                                <button className="text-sm font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400">Change Avatar</button>
                                <p className="text-xs text-gray-500">JPG, PNG up to 2MB</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Display Name</label>
                                <input 
                                    type="text" 
                                    value={profile.name}
                                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-black/20 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                <input 
                                    type="email" 
                                    value={profile.email}
                                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-black/20 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                                <input 
                                    type="text" 
                                    value={profile.role}
                                    disabled
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'preferences' && (
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Monitor size={16} /> Appearance
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    onClick={() => isDarkMode && toggleTheme()}
                                    className={`relative p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${!isDarkMode ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-white/20'}`}
                                >
                                    <div className="w-full aspect-video bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden relative">
                                        <div className="absolute top-2 left-2 w-16 h-2 bg-white rounded-md shadow-sm"></div>
                                        <div className="absolute top-6 left-2 w-8 h-8 bg-white rounded-full shadow-sm"></div>
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <Sun size={28} className="text-orange-400" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm font-medium ${!isDarkMode ? 'text-blue-700' : 'text-gray-600 dark:text-gray-400'}`}>Light Mode</span>
                                        {!isDarkMode && <CheckCircle2 size={16} className="text-blue-500" />}
                                    </div>
                                </button>

                                <button 
                                    onClick={() => !isDarkMode && toggleTheme()}
                                    className={`relative p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${isDarkMode ? 'border-blue-500 bg-blue-500/10' : 'border-gray-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-white/20'}`}
                                >
                                    <div className="w-full aspect-video bg-[#02040a] rounded-lg border border-white/10 flex items-center justify-center overflow-hidden relative">
                                        <div className="absolute top-2 left-2 w-16 h-2 bg-white/10 rounded-md"></div>
                                        <div className="absolute top-6 left-2 w-8 h-8 bg-white/10 rounded-full"></div>
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <Moon size={28} className="text-blue-400" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>Dark Mode</span>
                                        {isDarkMode && <CheckCircle2 size={16} className="text-blue-500" />}
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Bell size={16} /> Notifications
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Email Notifications</span>
                                    <input 
                                        type="checkbox" 
                                        checked={notifications.email} 
                                        onChange={() => setNotifications({...notifications, email: !notifications.email})}
                                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Push Notifications (Live Status)</span>
                                    <input 
                                        type="checkbox" 
                                        checked={notifications.push} 
                                        onChange={() => setNotifications({...notifications, push: !notifications.push})}
                                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Weekly Reports</span>
                                    <input 
                                        type="checkbox" 
                                        checked={notifications.weekly} 
                                        onChange={() => setNotifications({...notifications, weekly: !notifications.weekly})}
                                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="space-y-6">
                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-500/20 rounded-xl">
                            <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">Password last changed 3 months ago.</p>
                            <button className="mt-2 text-xs font-bold text-yellow-700 dark:text-yellow-400 uppercase tracking-wide">Update Password</button>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                            <input type="password" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-black/20 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                            <input type="password" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-black/20 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0a0f1c] flex justify-end gap-3">
                <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                    Cancel
                </button>
                <button 
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md flex items-center gap-2"
                >
                    <Save size={16} /> Save Changes
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;