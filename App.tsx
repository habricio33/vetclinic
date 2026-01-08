
import React, { useState, useEffect } from 'react';
import { View } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './views/DashboardView';
import AgendaView from './views/AgendaView';
import InventoryView from './views/InventoryView';
import ServicesView from './views/ServicesView';
import PatientsView from './views/PatientsView';
import FinanceiroView from './views/FinanceiroView';
import ConfiguracoesView from './views/ConfiguracoesView';
import SmartAssistant from './components/SmartAssistant';
import LoginView from './views/LoginView';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-text-secondary text-sm font-black uppercase tracking-widest animate-pulse">Carregando VetClinic...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <LoginView />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView />;
      case 'agenda': return <AgendaView />;
      case 'estoque': return <InventoryView />;
      case 'servicos': return <ServicesView />;
      case 'pacientes': return <PatientsView />;
      case 'financeiro': return <FinanceiroView />;
      case 'configuracoes': return <ConfiguracoesView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-background-light overflow-hidden font-sans">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header />
        <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          {renderView()}
        </div>

        {/* Floating Assistant Trigger */}
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="absolute bottom-8 right-8 size-16 bg-primary text-sidebar-bg rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group border-4 border-white"
        >
          <span className="material-symbols-outlined text-[32px] group-hover:rotate-12 transition-transform">smart_toy</span>
        </button>

        {isAssistantOpen && (
          <SmartAssistant onClose={() => setIsAssistantOpen(false)} />
        )}
      </main>
    </div>
  );
};

export default App;
