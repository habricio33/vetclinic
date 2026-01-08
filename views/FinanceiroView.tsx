
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';

type Transaction = Database['public']['Tables']['transactions']['Row'];

const FinanceiroView: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching transactions:', error);
    } else {
      setTransactions(data || []);
    }
    setLoading(false);
  };

  const revenues = transactions
    .filter(t => t.type === 'in')
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expenses = transactions
    .filter(t => t.type === 'out')
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const netBalance = revenues - expenses;
  const healthPercent = revenues > 0 ? Math.min((netBalance / revenues) * 100, 100) : 0;

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-8">
      <PageHeader
        title="Fluxo de Caixa"
        description="Relatório financeiro detalhado do mês atual."
        actionLabel="Nova Transação"
        onActionClick={() => { }}
        secondaryActionLabel="Exportar PDF"
        onSecondaryActionClick={() => { }}
        secondaryActionIcon="download"
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="size-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-text-secondary text-sm font-bold uppercase tracking-widest">Carregando Financeiro...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              label="Receitas"
              value={`R$ ${revenues.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              change="+15% que o mês anterior"
              icon="trending_up"
              trend="up"
              color="text-green-600"
            />
            <StatCard
              label="Despesas"
              value={`R$ ${expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              change="-5% que o mês anterior"
              icon="trending_down"
              trend="down"
              color="text-red-500"
            />
            <div className="bg-primary/10 p-6 rounded-2xl border border-primary/20 shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-primary-dark">
                <span className="material-symbols-outlined">payments</span>
                <span className="text-xs font-black uppercase tracking-widest">Saldo Líquido</span>
              </div>
              <p className="text-3xl font-black text-sidebar-bg">
                R$ {netBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <div className="h-1.5 w-full bg-white/50 rounded-full mt-4 overflow-hidden">
                <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${healthPercent}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h3 className="font-black text-text-main">Últimas Transações</h3>
              <button className="text-primary text-sm font-bold">Ver tudo</button>
            </div>
            <div className="divide-y divide-gray-50">
              {transactions.length > 0 ? transactions.map((t) => (
                <div key={t.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`size-10 rounded-full flex items-center justify-center ${t.type === 'in' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                      <span className="material-symbols-outlined text-[20px]">{t.type === 'in' ? 'add' : 'remove'}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-main">{t.description}</p>
                      <p className="text-[10px] text-gray-400 font-black uppercase">
                        {t.category || 'Geral'} • {new Date(t.date || '').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <span className={`font-black text-sm ${t.type === 'in' ? 'text-green-600' : 'text-red-500'}`}>
                    {t.type === 'in' ? '+' : '-'} R$ {Number(t.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              )) : (
                <div className="p-12 text-center text-text-secondary font-medium uppercase text-xs tracking-widest">
                  Nenhuma transação encontrada
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FinanceiroView;
