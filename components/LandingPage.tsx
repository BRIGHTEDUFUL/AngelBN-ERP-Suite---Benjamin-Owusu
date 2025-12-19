import React from 'react';
import { Shield, ArrowRight, Signal, Radio, Tv, Zap } from 'lucide-react';
import { UserRole } from '../types';

const ROLES: UserRole[] = ['Admin', 'Production Manager', 'Producer', 'Programs Manager', 'Traffic Manager'];

const LandingPage: React.FC<{ onLogin: (role: UserRole) => void }> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-[#02040a] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-yellow-600/5 rounded-full blur-[150px]"></div>
      
      <div className="w-full max-w-lg z-10 text-center">
        <div className="flex justify-center items-baseline gap-0 font-black italic text-7xl tracking-tighter mb-4 animate-in slide-in-from-top-4 duration-1000">
           <span className="text-white">a</span><span className="text-red-600">b</span><span className="text-[#ffeb3b]">n</span>
        </div>
        <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.5em] mb-12">Network Operations Console</p>
        
        <div className="bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[3rem] p-10 shadow-2xl">
           <Shield className="mx-auto text-white/20 mb-6" size={48} />
           <h2 className="text-2xl font-black text-white mb-8">System Access Portal</h2>
           <div className="space-y-3">
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest text-left px-2">Select Command Context</p>
              {ROLES.map(role => (
                <button key={role} onClick={() => onLogin(role)} className="w-full group flex items-center justify-between px-6 py-4 bg-white/5 border border-white/5 hover:border-red-600 hover:bg-red-600 transition-all rounded-2xl text-left">
                   <span className="text-sm font-black text-gray-400 group-hover:text-white uppercase tracking-widest">{role}</span>
                   <ArrowRight size={18} className="text-gray-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
              ))}
           </div>
        </div>
        <p className="mt-8 text-[8px] font-black text-gray-700 uppercase tracking-widest">Authorized Access Only • Global ID: ERP-V3.1.2</p>
      </div>
    </div>
  );
};

export default LandingPage;