import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';

type Product = Database['public']['Tables']['inventory']['Row'];

const InventoryView: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching inventory:', error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const totalProducts = products.length;
  const totalValue = products.reduce((acc, p) => acc + (Number(p.price || 0) * (p.quantity || 0)), 0);
  const lowStockCount = products.filter(p => (p.quantity || 0) <= (p.min_quantity || 0)).length;
  const bestSeller = products.length > 0 ? products[0].name : "N/A";

  return (
    <div className="p-10 max-w-[1400px] mx-auto">
      <PageHeader
        title="Painel de Produtos & Estoque"
        description="Gerencie seu inventário e alertas de reposição em tempo real."
        actionLabel="Adicionar Produto"
        onActionClick={() => { }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total de Produtos" value={totalProducts.toString()} icon="inventory_2" color="text-primary" />
        <StatCard label="Valor em Estoque" value={`R$ ${totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} icon="attach_money" color="text-green-600" />
        <StatCard
          label="Estoque Baixo"
          value={lowStockCount.toString()}
          sub="Ação Necessária"
          icon="warning"
          color="text-danger"
          border={lowStockCount > 0 ? "border-danger/30" : "border-gray-100"}
        />
        <StatCard label="Mais Vendido" value={bestSeller} sub="Destaque" icon="stars" color="text-yellow-600" />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="size-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-text-secondary text-sm font-bold uppercase tracking-widest">Carregando Estoque...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((prod) => {
            const isLowStock = (prod.quantity || 0) <= (prod.min_quantity || 0);
            return (
              <div key={prod.id} className={`group flex flex-col gap-3 rounded-xl border bg-white p-3 shadow-sm hover:shadow-lg transition-all duration-300 relative ${isLowStock ? 'border-danger/30' : 'border-gray-100'}`}>
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                  {isLowStock && (
                    <div className="absolute top-2 left-2 z-10 flex items-center gap-1 rounded px-2 py-1 text-[10px] font-black uppercase tracking-widest shadow-sm bg-danger text-white animate-pulse">
                      Estoque Baixo
                    </div>
                  )}
                  {prod.image_url ? (
                    <img src={prod.image_url} className="bg-center bg-cover h-full w-full group-hover:scale-110 transition-transform duration-500 object-cover" alt={prod.name} />
                  ) : (
                    <span className="material-symbols-outlined text-gray-300 text-6xl">inventory</span>
                  )}
                </div>
                <div className="flex flex-col gap-1 px-1">
                  <div className="flex justify-between items-start">
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{prod.category || 'Geral'}</p>
                  </div>
                  <h3 className="font-bold text-text-main truncate text-base">{prod.name}</h3>
                  <p className="text-lg font-black text-text-main">R$ {Number(prod.price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="flex flex-col gap-1.5 mt-auto px-1">
                  <div className="flex justify-between text-xs items-center font-bold">
                    <span className={isLowStock ? 'text-danger' : 'text-text-secondary'}>
                      {isLowStock ? 'Repor imediatamente' : 'Estoque saudável'}
                    </span>
                    <span className={isLowStock ? 'text-danger' : 'text-text-main'}>{prod.quantity} {prod.unit}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div className={`h-full rounded-full ${isLowStock ? 'bg-danger' : 'bg-primary'}`} style={{ width: `${Math.min((Number(prod.quantity || 0) / 50) * 100, 100)}%` }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button className="py-2 text-sm font-bold text-text-main hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">Editar</button>
                  <button className={`py-2 text-sm font-bold rounded-lg transition-all ${isLowStock ? 'bg-danger/10 text-danger hover:bg-danger hover:text-white' : 'bg-primary text-sidebar-bg hover:bg-primary-dark'}`}>
                    {isLowStock ? 'Solicitar' : 'Vender'}
                  </button>
                </div>
              </div>
            );
          })}

          <button className="group flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-6 hover:bg-white hover:border-primary transition-all min-h-[350px]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm group-hover:scale-110 transition-transform group-hover:text-primary">
              <span className="material-symbols-outlined text-[32px] font-bold">add</span>
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-text-main">Novo Produto</h3>
              <p className="text-sm text-text-secondary mt-1">Adicionar ao inventário</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default InventoryView;

