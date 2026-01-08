
import React from 'react';
import { IMAGES } from '../constants';

const AgendaView: React.FC = () => {
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
            <h3 className="text-xl font-bold text-gray-900 w-40 text-center">Outubro 2023</h3>
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
            {['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'].map(day => (
              <div key={day} className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 grid-rows-5 gap-4 h-full min-h-[600px]">
            {Array.from({ length: 35 }).map((_, idx) => {
              const day = idx - 1; // Simplistic calendar logic
              const isCurrent = day === 18;
              const isPrevNext = day <= 0 || day > 31;
              
              return (
                <div key={idx} className={`border rounded-xl p-2 transition-all cursor-pointer ${
                  isCurrent ? 'border-2 border-primary bg-primary/5 ring-2 ring-primary/10 shadow-md' : 
                  isPrevNext ? 'border-gray-100 bg-gray-50/50 opacity-60' : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
                }`}>
                  <span className={`text-sm font-bold ${isCurrent ? 'text-primary' : isPrevNext ? 'text-gray-400' : 'text-gray-700'}`}>
                    {day <= 0 ? 30 + day : day > 31 ? day - 31 : day}
                  </span>
                  
                  {isCurrent && (
                    <div className="mt-2 space-y-1 overflow-hidden">
                      <div className="bg-white border-l-2 border-accent-blue text-[10px] p-1.5 rounded shadow-sm font-bold truncate flex justify-between">
                        <span>Rex</span> <span className="text-gray-400">14:00</span>
                      </div>
                      <div className="bg-white border-l-2 border-accent-purple text-[10px] p-1.5 rounded shadow-sm font-bold truncate flex justify-between">
                        <span>Luna</span> <span className="text-gray-400">14:45</span>
                      </div>
                      <div className="text-center text-[10px] text-gray-500 font-medium py-1">+2 agend.</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Side Detail Bar */}
        <div className="w-96 bg-white border-l border-gray-100 flex flex-col shadow-xl z-10">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
            <div>
              <h3 className="text-lg font-bold text-gray-900">18 de Outubro</h3>
              <p className="text-sm text-gray-500 mt-0.5 font-medium">Quarta-feira</p>
            </div>
            <div className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-xs">
              4 Agendamentos
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {[
              { time: '14:00', patient: 'Rex', tutor: 'Ana Paula', service: 'Vacinação V10', status: 'Aguardando', color: 'bg-yellow-400', img: IMAGES.REX },
              { time: '14:45', patient: 'Luna', tutor: 'Marcos Silva', service: 'Consulta Dermatol.', status: 'Confirmado', color: 'bg-green-500', img: IMAGES.LUNA },
              { time: '15:30', patient: 'Thor', tutor: 'Carla Dias', service: 'Retorno', status: 'Confirmado', color: 'bg-green-500', img: IMAGES.THOR },
            ].map((app, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${app.color} rounded-l-xl`}></div>
                <div className="flex flex-col items-center gap-1 min-w-[3rem]">
                  <span className="text-base font-black text-gray-900">{app.time}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">30 min</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={app.img} className="size-10 rounded-full border border-gray-100 shadow-sm object-cover" alt={app.patient} />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 leading-tight truncate">{app.patient}</p>
                      <p className="text-xs text-gray-500 truncate">{app.tutor}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="material-symbols-outlined text-[16px] text-primary">medical_services</span>
                      <span className="truncate font-semibold">{app.service}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${app.status === 'Confirmado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {app.status}
                    </span>
                    <button className="text-gray-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaView;
