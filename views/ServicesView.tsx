
import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

type Service = Database['public']['Tables']['services']['Row'];

const ServicesView: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching services:', error);
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  const formatPrice = (price: number | null) => {
    if (price === null) return 'N/A';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <PageHeader
        title="Catálogo de Serviços"
        description="Gerencie seus serviços veterinários, tabelas de preços e pacotes promocionais ativos."
        actionLabel="Novo Serviço"
        onActionClick={() => { }}
        variant="gradient"
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="size-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-sm font-black text-text-secondary uppercase tracking-widest animate-pulse">Carregando serviços...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.id} className={`group flex flex-col bg-white rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden relative p-5 ${s.is_promo ? 'border-primary' : 'border-gray-100 hover:border-primary/30'}`}>
              {s.is_promo && <div className="absolute top-0 right-0 bg-primary text-sidebar-bg text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest">PROMO</div>}
              <div className="flex justify-between items-start mb-4">
                <div className={`h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors`}>
                  <span className="material-symbols-outlined text-2xl font-bold">{s.icon || 'medical_services'}</span>
                </div>
                <button className="size-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"><span className="material-symbols-outlined text-lg">more_horiz</span></button>
              </div>
              <div className="mb-4">
                <h3 className="font-bold text-lg text-text-main mb-1 group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-xs text-text-secondary line-clamp-2 font-medium">{s.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 text-[10px] font-bold text-gray-600">
                  <span className="material-symbols-outlined text-[14px]">schedule</span> {s.duration}
                </span>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${s.is_promo ? 'bg-orange-100 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>{s.category}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex flex-col">
                  {s.old_price && <span className="text-[10px] font-bold text-red-400 line-through">{formatPrice(s.old_price)}</span>}
                  <span className="text-xl font-black text-text-main">{formatPrice(s.price)}</span>
                </div>
                <button className="size-8 rounded-full bg-primary/10 hover:bg-primary text-primary-dark hover:text-sidebar-bg flex items-center justify-center transition-all">
                  <span className="material-symbols-outlined text-lg font-bold">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesView;

