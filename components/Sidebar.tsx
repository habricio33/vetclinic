
import React from 'react';
import { View } from '../types';
import { IMAGES } from '../constants';
import { supabase } from '../lib/supabase';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'agenda', label: 'Agenda', icon: 'calendar_month' },
    { id: 'pacientes', label: 'Pacientes', icon: 'pets' },
    { id: 'servicos', label: 'Serviços', icon: 'inventory_2' },
    { id: 'estoque', label: 'Estoque', icon: 'inventory' },
    { id: 'financeiro', label: 'Financeiro', icon: 'account_balance_wallet' },
    { id: 'configuracoes', label: 'Configurações', icon: 'settings' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col bg-sidebar-bg text-white h-full transition-all duration-300">
      <div className="h-20 flex items-center px-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <img src={IMAGES.LOGO} alt="Logo" className="size-8 object-contain" />
          <div>
            <h1 className="text-white text-lg font-black leading-none tracking-tight">VET<span className="text-primary">CLINIC</span></h1>
            <p className="text-primary text-[10px] font-bold tracking-widest uppercase mt-0.5">Pro Manager</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-8 px-4 flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as View)}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${currentView === item.id
              ? 'bg-primary text-sidebar-bg font-bold shadow-lg shadow-primary/20'
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
          >
            <span className={`material-symbols-outlined text-[22px] ${currentView === item.id ? 'icon-filled' : ''}`}>
              {item.icon}
            </span>
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 bg-black/20 m-4 rounded-2xl border border-white/5 relative group">
        <div className="flex items-center gap-3">
          <img src={IMAGES.DR_SILVA} className="rounded-full size-10 border-2 border-primary/50 object-cover shadow-sm" alt="Dr. Silva" />
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-bold truncate">Dr. Ricardo Silva</p>
            <span className="text-primary text-[10px] font-black uppercase tracking-tighter">Veterinário Chefe</span>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="size-8 bg-red-500/10 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
            title="Sair"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
