
import React from 'react';
import PageHeader from '../components/PageHeader';

const ServicesView: React.FC = () => {
  const services = [
    { title: 'Consulta Geral', desc: 'Avaliação clínica completa para check-up de rotina.', price: 'R$ 150,00', duration: '30 min', cat: 'Clínico', icon: 'medical_services', color: 'text-primary', bg: 'bg-teal-50' },
    { title: 'Vacina Antirrábica', desc: 'Imunização anual obrigatória para cães e gatos.', price: 'R$ 80,00', duration: '15 min', cat: 'Vacinação', icon: 'vaccines', color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'Kit Boas-vindas', desc: '3 vacinas essenciais + 1 exame de fezes.', price: 'R$ 380,00', duration: 'Pacote', cat: 'PROMO', icon: 'pets', color: 'text-orange-500', bg: 'bg-orange-50', promo: true, oldPrice: 'R$ 480,00' },
    { title: 'Banho e Tosa (P)', desc: 'Serviço completo de higiene para pequenos.', price: 'R$ 100,00', duration: '60 min', cat: 'Estética', icon: 'water_drop', color: 'text-accent-blue', bg: 'bg-blue-50' },
  ];

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <PageHeader
        title="Catálogo de Serviços"
        description="Gerencie seus serviços veterinários, tabelas de preços e pacotes promocionais ativos."
        actionLabel="Novo Serviço"
        onActionClick={() => { }}
        variant="gradient"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <div key={i} className={`group flex flex-col bg-white rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden relative p-5 ${s.promo ? 'border-primary' : 'border-gray-100 hover:border-primary/30'}`}>
            {s.promo && <div className="absolute top-0 right-0 bg-primary text-sidebar-bg text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest">PROMO</div>}
            <div className="flex justify-between items-start mb-4">
              <div className={`h-12 w-12 rounded-2xl ${s.bg} flex items-center justify-center ${s.color}`}>
                <span className="material-symbols-outlined text-2xl font-bold">{s.icon}</span>
              </div>
              <button className="size-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"><span className="material-symbols-outlined text-lg">more_horiz</span></button>
            </div>
            <div className="mb-4">
              <h3 className="font-bold text-lg text-text-main mb-1 group-hover:text-primary transition-colors">{s.title}</h3>
              <p className="text-xs text-text-secondary line-clamp-2 font-medium">{s.desc}</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-6 mt-auto">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 text-[10px] font-bold text-gray-600">
                <span className="material-symbols-outlined text-[14px]">schedule</span> {s.duration}
              </span>
              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${s.promo ? 'bg-orange-100 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>{s.cat}</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div className="flex flex-col">
                {s.oldPrice && <span className="text-[10px] font-bold text-red-400 line-through">{s.oldPrice}</span>}
                <span className="text-xl font-black text-text-main">{s.price}</span>
              </div>
              <button className="size-8 rounded-full bg-primary/10 hover:bg-primary text-primary-dark hover:text-sidebar-bg flex items-center justify-center transition-all">
                <span className="material-symbols-outlined text-lg font-bold">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesView;

