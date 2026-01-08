import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';
import { IMAGES } from '../constants';

type AppointmentWithDetails = Database['public']['Tables']['appointments']['Row'] & {
  patients: (Database['public']['Tables']['patients']['Row'] & {
    owners: Database['public']['Tables']['owners']['Row'] | null;
  }) | null;
};

const AgendaView: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('appointments')
      .select('*, patients(*, owners(*))')
      .order('start_time', { ascending: true });

    if (error) {
      console.error('Error fetching appointments:', error);
    } else {
      setAppointments((data as any) || []);
    }
    setLoading(false);
  };

  const getDayAppointments = (day: number) => {
    return appointments.filter(app => {
      const appDate = new Date(app.start_time);
      return appDate.getDate() === day && appDate.getMonth() === selectedDate.getMonth();
    });
  };

  const currentDayAppointments = getDayAppointments(selectedDate.getDate());

  return (
    <div className="flex flex-col h-full bg-background-light">
      <div className="px-8 py-4 bg-white border-b border-gray-100 flex flex-wrap items-center justify-between gap-4 z-10 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200">
            <button className="px-4 py-1.5 text-sm font-bold bg-white shadow-sm rounded-md text-gray-900">Mês</button>
            <button className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900">Semana</button>
            <button className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900">Dia</button>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 border border-gray-200"><span className="material-symbols-outlined">chevron_left</span></button>
            <h3 className="text-xl font-bold text-gray-900 w-48 text-center">
              {selectedDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </h3>
            <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 border border-gray-200"><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-primary hover:bg-primary-dark text-sidebar-bg px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm shadow-primary/30 transition-all flex items-center gap-2 transform hover:-translate-y-0.5">
            <span className="material-symbols-outlined text-[20px] font-bold">add</span> Novo Agendamento
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Calendar Grid */}
        <div className="flex-1 bg-white p-6 overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-7 mb-4">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
              <div key={day} className="text-center text-xs font-black text-gray-400 uppercase tracking-widest">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 grid-rows-5 gap-4 h-full min-h-[500px]">
            {Array.from({ length: 35 }).map((_, idx) => {
              const day = idx - 2; // Fixed simplistic logic for demonstration
              const isCurrent = day === selectedDate.getDate();
              const dayApps = day > 0 && day <= 31 ? getDayAppointments(day) : [];
              const isPrevNext = day <= 0 || day > 31;

              return (
                <div
                  key={idx}
                  onClick={() => day > 0 && day <= 31 && setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
                  className={`border rounded-2xl p-3 transition-all cursor-pointer flex flex-col ${isCurrent ? 'border-2 border-primary bg-primary/5 ring-4 ring-primary/5 shadow-lg' :
                    isPrevNext ? 'border-gray-50 bg-gray-50/30 opacity-40' : 'border-gray-100 bg-white hover:border-primary/50 hover:shadow-md'
                    }`}
                >
                  <span className={`text-sm font-black ${isCurrent ? 'text-primary' : isPrevNext ? 'text-gray-300' : 'text-text-main'}`}>
                    {day <= 0 ? 30 + day : day > 31 ? day - 31 : day}
                  </span>

                  {dayApps.length > 0 && (
                    <div className="mt-2 space-y-1 overflow-hidden">
                      {dayApps.slice(0, 2).map((app, i) => (
                        <div key={i} className="bg-white border-l-2 border-primary text-[9px] p-1 rounded shadow-sm font-bold truncate">
                          {app.patients?.name}
                        </div>
                      ))}
                      {dayApps.length > 2 && (
                        <div className="text-center text-[9px] text-gray-400 font-bold">+{dayApps.length - 2}</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Side Detail Bar */}
        <div className="w-96 bg-white border-l border-gray-100 flex flex-col shadow-xl z-20">
          <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
              <h3 className="text-xl font-black text-text-main">
                {selectedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
              </h3>
              <p className="text-sm text-text-secondary font-bold tracking-widest uppercase mt-1">
                {selectedDate.toLocaleDateString('pt-BR', { weekday: 'long' })}
              </p>
            </div>
            <div className="bg-primary/10 text-primary font-black px-4 py-2 rounded-xl text-xs">
              {currentDayAppointments.length} Agend.
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-5 no-scrollbar">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="size-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Buscando...</p>
              </div>
            ) : currentDayAppointments.length > 0 ? (
              currentDayAppointments.map((app) => (
                <div key={app.id} className="flex gap-4 p-5 rounded-[24px] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-l-2xl"></div>
                  <div className="flex flex-col items-center gap-1 min-w-[3.5rem] pt-1">
                    <span className="text-lg font-black text-text-main">
                      {new Date(app.start_time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">30 min</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4 mb-4">
                      {app.patients?.image_url ? (
                        <img src={app.patients.image_url} className="size-12 rounded-2xl border border-gray-100 shadow-sm object-cover" alt={app.patients.name} />
                      ) : (
                        <div className="size-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300">
                          <span className="material-symbols-outlined">pets</span>
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-base font-black text-text-main leading-tight truncate">{app.patients?.name}</p>
                        <p className="text-xs text-text-secondary font-medium truncate">{app.patients?.owners?.full_name}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-3">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="material-symbols-outlined text-[18px] text-primary font-bold">medical_services</span>
                        <span className="truncate font-bold">{app.type}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${app.status === 'Confirmado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {app.status || 'Pendente'}
                      </span>
                      <button className="text-gray-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px] font-bold">edit</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-40">
                <span className="material-symbols-outlined text-6xl">event_busy</span>
                <p className="text-xs font-black uppercase tracking-widest">Nenhum agendamento</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaView;
