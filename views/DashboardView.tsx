
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';

type AppointmentWithPatient = Database['public']['Tables']['appointments']['Row'] & {
  patients: (Database['public']['Tables']['patients']['Row'] & {
    owners: Database['public']['Tables']['owners']['Row'] | null;
  }) | null;
};

const DashboardView: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentWithPatient[]>([]);
  const [inventoryAlerts, setInventoryAlerts] = useState<Database['public']['Tables']['inventory']['Row'][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);

    // Fetch Next Appointments
    const { data: apptData } = await supabase
      .from('appointments')
      .select('*, patients(*, owners(*))')
      .order('start_time')
      .limit(3);

    // Fetch Inventory Alerts
    const { data: invData } = await supabase
      .from('inventory')
      .select('*')
      .lt('quantity', 10) // Basic filter for low stock
      .limit(3);

    setAppointments((apptData as any[]) || []);
    setInventoryAlerts(invData || []);
    setLoading(false);
  };

  const occupationPercent = 85; // Simulated for now

  return (
    <div className="p-8 bg-background-light">
      <div className="max-w-7xl mx-auto mb-8">
        <PageHeader
          title="Resumo Geral"
          description="Acompanhe o desempenho da sua clínica em tempo real."
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="size-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-text-secondary text-sm font-bold uppercase tracking-widest">Carregando Dashboard...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-7xl mx-auto pb-8">
          {/* Next Appointments */}
          <Card
            title="Próximos Atendimentos"
            icon="schedule"
            iconBgColor="bg-blue-50"
            iconTextColor="text-blue-600"
            actionLabel="Ver todos"
            onActionClick={() => { }}
            className="min-h-[360px]"
          >
            <div className="flex flex-col gap-3">
              {appointments.length > 0 ? appointments.map((app, idx) => (
                <div key={app.id} className={`flex items-center gap-4 p-3 rounded-xl transition-all cursor-pointer ${idx === 0 ? 'bg-yellow-50/80 border border-yellow-100/50 relative overflow-hidden group hover:shadow-md' : 'hover:bg-gray-50 border border-transparent hover:border-gray-100'}`}>
                  {idx === 0 && <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400 rounded-l-xl"></div>}
                  {app.patients?.image_url ? (
                    <img src={app.patients.image_url} className="rounded-full size-12 shrink-0 border border-white shadow-sm object-cover" alt={app.patients.name} />
                  ) : (
                    <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                      <span className="material-symbols-outlined">pets</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="text-text-main font-bold truncate">{app.patients?.name} ({app.patients?.breed})</p>
                      {idx === 0 && <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-0.5 rounded-full">Agora</span>}
                    </div>
                    <p className="text-text-secondary text-sm truncate">Tutor: {app.patients?.owners?.full_name} • {app.type}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${idx === 0 ? 'text-lg text-text-main' : 'text-gray-500'}`}>
                      {new Date(app.start_time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              )) : (
                <div className="py-10 text-center text-text-secondary text-xs font-bold uppercase tracking-widest">Sem consultas agendadas</div>
              )}
            </div>
          </Card>

          {/* Daily Agenda Calendar Mini */}
          <Card
            title="Agenda do Dia"
            icon="calendar_today"
            iconBgColor="bg-purple-50"
            iconTextColor="text-accent-purple"
            className="min-h-[360px]"
            footer={
              <div className="flex items-center justify-between">
                <button className="bg-primary hover:bg-primary-dark text-sidebar-bg px-4 py-2 rounded-lg text-sm font-bold shadow-sm shadow-primary/30 transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm font-bold">add</span> Novo
                </button>
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-gray-200 rounded text-gray-500"><span className="material-symbols-outlined text-xs">chevron_left</span></button>
                  <button className="p-1 hover:bg-gray-200 rounded text-gray-500"><span className="material-symbols-outlined text-xs">chevron_right</span></button>
                </div>
              </div>
            }
          >
            <div className="flex gap-6 h-full">
              <div className="w-1/2 bg-background-light rounded-xl p-4 border border-gray-100 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-text-main">Janeiro 2026</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-1 font-bold">
                  <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-700 flex-1 content-start">
                  <span className="opacity-30">29</span><span className="opacity-30">30</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                  <span>6</span><span>7</span><span className="bg-primary text-sidebar-bg rounded-md shadow-sm">8</span><span>9</span><span>10</span><span>11</span><span>12</span>
                  <span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span>
                </div>
              </div>
              <div className="w-1/2 flex flex-col justify-center gap-4">
                <div>
                  <p className="text-4xl font-bold text-text-main mb-1">{appointments.length}</p>
                  <p className="text-text-secondary text-sm font-medium">Agendamentos próximos</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-text-main">Ocupação</span>
                    <span className="text-primary-dark">{occupationPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${occupationPercent}%` }}></div>
                  </div>
                  <p className="text-xs text-text-secondary pt-1">Fluxo de atendimento estável para hoje.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Stock Alerts */}
          <Card
            title="Alertas de Estoque"
            icon="inventory_2"
            iconBgColor="bg-red-50"
            iconTextColor="text-danger"
            className="min-h-[300px]"
          >
            <div className="flex flex-col gap-3">
              {inventoryAlerts.length > 0 ? inventoryAlerts.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border border-red-100 bg-red-50/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded border border-gray-100 text-danger">
                      <span className="material-symbols-outlined text-[20px]">inventory</span>
                    </div>
                    <div>
                      <p className="text-text-main font-semibold text-sm">{item.name}</p>
                      <p className="text-danger text-xs font-bold">{item.quantity} {item.unit} restantes</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-white border border-gray-200 text-text-main text-xs font-semibold rounded hover:bg-gray-50 transition-colors shadow-sm">
                    Repor
                  </button>
                </div>
              )) : (
                <div className="py-10 text-center text-text-secondary text-xs font-bold uppercase tracking-widest">Estoque em dia</div>
              )}
            </div>
          </Card>

          {/* Top Services Chart */}
          <Card
            title="Top Serviços"
            icon="donut_large"
            iconBgColor="bg-green-50"
            iconTextColor="text-green-600"
            className="min-h-[300px]"
          >
            <div className="flex items-center justify-center flex-1 gap-8 h-full">
              <div className="relative size-40 shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f1f5f9" strokeWidth="3.8"></circle>
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#13ecc8" strokeWidth="3.8" strokeDasharray="45 100"></circle>
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#3b82f6" strokeWidth="3.8" strokeDasharray="30 100" strokeDashoffset="-45"></circle>
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#8b5cf6" strokeWidth="3.8" strokeDasharray="25 100" strokeDashoffset="-75"></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-xs text-text-secondary font-medium uppercase tracking-widest">Total</span>
                  <span className="text-xl font-black text-text-main">145</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full">
                {[
                  { label: 'Consultas', val: '45%', color: 'bg-primary' },
                  { label: 'Vacinação', val: '30%', color: 'bg-accent-blue' },
                  { label: 'Banho/Tosa', val: '25%', color: 'bg-accent-purple' },
                ].map((serv, idx) => (
                  <div key={idx} className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <span className={`size-3 rounded-full ${serv.color}`}></span>
                      <span className="text-sm font-medium text-gray-700">{serv.label}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{serv.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DashboardView;
