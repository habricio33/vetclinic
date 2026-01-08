
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 flex-shrink-0 z-20">
      <div>
        <h2 className="text-xl font-bold text-text-main">Bem-vindo, Dr. Silva 👋</h2>
        <p className="text-sm text-text-secondary">Aqui está o resumo da sua clínica hoje.</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">search</span>
          </div>
          <input 
            className="block w-64 pl-10 pr-3 py-2.5 border-none bg-background-light rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" 
            placeholder="Buscar paciente, tutor, serviço..." 
            type="text"
          />
        </div>
        <button className="relative p-2 rounded-lg text-gray-500 hover:bg-background-light hover:text-primary transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
