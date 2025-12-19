import React, { useState } from 'react';
import { Shield, ArrowRight, Signal, Radio, Tv, Zap, Clock, TrendingUp, Users } from 'lucide-react';
import { UserRole } from '../types';

const ROLES: UserRole[] = ['Admin', 'Production Manager', 'Producer', 'Programs Manager', 'Traffic Manager'];

const FEATURES = [
  { icon: Signal, label: 'Live Monitoring', color: 'text-red-500' },
  { icon: Clock, label: 'Studio Clock', color: 'text-yellow-500' },
  { icon: TrendingUp, label: 'Analytics', color: 'text-blue-500' },
  { icon: Users, label: 'Multi-User', color: 'text-green-500' },
];

const LandingPage: React.FC<{ onLogin: (role: UserRole) => void }> = ({ onLogin }) => {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#02040a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[150px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-yellow-600/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(229,57,53,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(229,57,53,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="w-full max-w-6xl z-10">
        <div className="text-center mb-12 animate-in slide-in-from-top-4 duration-1000">
          {/* Logo */}
          <div className="flex justify-center items-baseline gap-0 font-black italic text-8xl tracking-tighter mb-6">
            <span className="text-white">a</span>
            <span className="text-red-600 drop-shadow-[0_0_30px_rgba(229,57,53,0.5)]">b</span>
            <span className="text-[#ffeb3b] drop-shadow-[0_0_30px_rgba(255,235,59,0.5)]">n</span>
          </div>
          
          {/* Tagline */}
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Broadcast Operations Console
          </h1>
          <p className="text-red-600 text-xs font-black uppercase tracking-[0.3em] mb-6">
            Enterprise ERP Suite • Network Command Center
          </p>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
            Professional-grade dashboard for real-time broadcast management, scheduling, analytics, and operations control across radio and television platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Access Portal */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[3rem] p-10 shadow-2xl animate-in slide-in-from-left-4 duration-1000">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-red-600/10 rounded-2xl">
                <Shield className="text-red-600" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">System Access</h2>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Authorized Portal</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest px-2 mb-4">
                Select Your Role
              </p>
              {ROLES.map((role, index) => (
                <button 
                  key={role} 
                  onClick={() => onLogin(role)} 
                  onMouseEnter={() => setHoveredRole(role)}
                  onMouseLeave={() => setHoveredRole(null)}
                  className="w-full group flex items-center justify-between px-6 py-4 bg-white/5 border border-white/5 hover:border-red-600 hover:bg-red-600 transition-all duration-300 rounded-2xl text-left transform hover:scale-[1.02] hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-sm font-black text-gray-400 group-hover:text-white uppercase tracking-widest transition-colors">
                    {role}
                  </span>
                  <ArrowRight 
                    size={18} 
                    className={`text-gray-700 group-hover:text-white transition-all ${hoveredRole === role ? 'translate-x-2' : ''}`}
                  />
                </button>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/5">
              <p className="text-[9px] font-black text-gray-700 uppercase tracking-widest text-center">
                Secured Access • Global ID: ERP-V3.2.0
              </p>
            </div>
          </div>

          {/* Features Showcase */}
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-1000" style={{ animationDelay: '200ms' }}>
            {/* Key Features */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[3rem] p-8 shadow-2xl">
              <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                <Zap className="text-yellow-500" size={24} />
                Platform Capabilities
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {FEATURES.map((feature, index) => (
                  <div 
                    key={feature.label} 
                    className="p-4 bg-black/40 border border-white/5 rounded-2xl hover:border-white/20 transition-all group"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <feature.icon className={`${feature.color} mb-3 group-hover:scale-110 transition-transform`} size={24} />
                    <p className="text-xs font-black text-white uppercase tracking-wider">{feature.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 backdrop-blur-3xl rounded-2xl p-6 text-center">
                <Radio className="text-red-600 mx-auto mb-2" size={24} />
                <p className="text-2xl font-black text-white">2+</p>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Platforms</p>
              </div>
              <div className="bg-white/5 border border-white/10 backdrop-blur-3xl rounded-2xl p-6 text-center">
                <Tv className="text-yellow-500 mx-auto mb-2" size={24} />
                <p className="text-2xl font-black text-white">24/7</p>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Uptime</p>
              </div>
              <div className="bg-white/5 border border-white/10 backdrop-blur-3xl rounded-2xl p-6 text-center">
                <Signal className="text-green-500 mx-auto mb-2" size={24} />
                <p className="text-2xl font-black text-white">Live</p>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Broadcast</p>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-br from-red-600/10 to-yellow-600/10 border border-red-600/20 backdrop-blur-3xl rounded-2xl p-6">
              <p className="text-sm text-white font-bold leading-relaxed">
                <span className="text-red-500 font-black">⚡ Pro Tip:</span> Each role provides tailored access to specific operational areas. Select your role to explore the full suite of broadcasting tools.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 animate-in fade-in duration-1000" style={{ animationDelay: '400ms' }}>
          <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest">
            © 2025 Angel Broadcasting Network • All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;