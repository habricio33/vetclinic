
import React from 'react';
import { IMAGES } from '../constants';
import PageHeader from '../components/PageHeader';

const ConfiguracoesView: React.FC = () => {
  return (
    <div className="p-10 max-w-5xl mx-auto space-y-10">
      <PageHeader
        title="Configurações"
        description="Personalize sua plataforma e gerencie ativos de mídia."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="font-black text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">image</span>
            Ativos de Mídia (HTML Links)
          </h3>
          <p className="text-xs text-text-secondary">Estes são os links diretos utilizados em toda a interface.</p>

          <div className="space-y-4">
            {Object.entries(IMAGES).slice(0, 4).map(([key, url]) => (
              <div key={key} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4 group">
                <img src={url} className="size-10 rounded-lg object-cover bg-white" alt={key} />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black uppercase text-primary tracking-widest">{key}</p>
                  <p className="text-[10px] text-gray-400 truncate">{url}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white rounded-lg transition-all">
                  <span className="material-symbols-outlined text-[18px]">content_copy</span>
                </button>
              </div>
            ))}
          </div>
          <button className="w-full py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all">
            Atualizar Links de Mídia
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-black text-text-main mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">security</span>
              Segurança
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div>
                  <p className="text-sm font-bold text-text-main">Autenticação em 2 Etapas</p>
                  <p className="text-xs text-gray-500">Aumente a segurança da sua conta</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative">
                  <div className="absolute right-1 top-1 size-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div>
                  <p className="text-sm font-bold text-text-main">Acesso de Equipe</p>
                  <p className="text-xs text-gray-500">3 colaboradores ativos</p>
                </div>
                <span className="material-symbols-outlined text-gray-400">chevron_right</span>
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
            <h3 className="font-black text-red-700 mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined">dangerous</span>
              Zona de Risco
            </h3>
            <p className="text-xs text-red-600 mb-6 font-medium">Cuidado: estas ações são irreversíveis.</p>
            <button className="w-full py-3 border border-red-200 text-red-600 rounded-xl text-sm font-black hover:bg-red-100 transition-all">
              Redefinir Banco de Dados
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracoesView;

