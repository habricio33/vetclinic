
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';
import Badge from '../components/Badge';
import Card from '../components/Card';
import AddPatientModal from '../components/AddPatientModal';

type PatientWithOwner = Database['public']['Tables']['patients']['Row'] & {
  owners: Database['public']['Tables']['owners']['Row'] | null;
};

const PatientsView: React.FC = () => {
  const [patients, setPatients] = useState<PatientWithOwner[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('patients')
      .select('*, owners(*)');

    if (error) {
      console.error('Error fetching patients:', error);
    } else {
      const patientsData = data as any[];
      setPatients(patientsData || []);
      if (patientsData && patientsData.length > 0) {
        setSelectedPatientId(patientsData[0].id);
      }
    }
    setLoading(false);
  };

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.owners?.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.breed?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedPatient = patients.find(p => p.id === selectedPatientId);

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      {/* Search Sidebar */}
      <aside className="w-full lg:w-96 flex flex-col border-r border-gray-100 bg-white">
        <div className="p-6 border-b border-gray-100 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-text-main">Pacientes</h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
            >
              <span className="material-symbols-outlined font-bold">person_add</span>
            </button>
          </div>
          <div className="relative">
            <input
              className="w-full pl-10 pr-4 py-3 rounded-xl border-gray-100 bg-gray-50 text-sm focus:ring-primary focus:border-primary transition-all transition-all"
              placeholder="Buscar por nome, pet ou tutor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400">search</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <div className="size-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Buscando...</p>
            </div>
          ) : filteredPatients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => setSelectedPatientId(patient.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${selectedPatientId === patient.id ? 'bg-primary/5 border-primary/20 shadow-sm' : 'border-transparent hover:bg-gray-50'}`}
            >
              {patient.image_url ? (
                <img src={patient.image_url} className="size-12 rounded-full object-cover border-2 border-white shadow-sm" alt={patient.name} />
              ) : (
                <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <span className="material-symbols-outlined">pets</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-text-main">{patient.name} <span className="text-xs font-normal text-gray-400">({patient.breed})</span></p>
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{patient.owners?.full_name || 'Sem tutor'}</p>
              </div>
              <Badge variant={patient.status === 'Healthy' ? 'success' : 'warning'} dot children={""} />
            </div>
          ))}
        </div>
      </aside>

      {/* Main Details Panel */}
      <main className="flex-1 overflow-y-auto p-10 bg-background-light no-scrollbar">
        {selectedPatient ? (
          <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Pet Profile Header */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32"></div>
              <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                {selectedPatient.image_url ? (
                  <img src={selectedPatient.image_url} className="size-32 rounded-3xl object-cover border-4 border-white shadow-xl" alt={selectedPatient.name} />
                ) : (
                  <div className="size-32 rounded-3xl bg-gray-100 flex items-center justify-center text-gray-400 border-4 border-white shadow-xl">
                    <span className="material-symbols-outlined text-[64px]">pets</span>
                  </div>
                )}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-black text-text-main flex items-center gap-3">
                        {selectedPatient.name}
                        <span className="material-symbols-outlined text-blue-500 font-bold">male</span>
                      </h1>
                      <p className="text-text-secondary font-bold text-sm tracking-widest uppercase">{selectedPatient.species} • {selectedPatient.breed} • {selectedPatient.birth_date ? new Date().getFullYear() - new Date(selectedPatient.birth_date).getFullYear() : '?'} anos</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="p-3 bg-gray-50 text-text-main rounded-xl hover:bg-gray-100 transition-all">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button className="px-6 py-3 bg-primary text-sidebar-bg rounded-xl font-black shadow-lg shadow-primary/20 hover:scale-105 active:scale-100 transition-all">
                        Agendar Consulta
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                      <p className="text-[10px] font-bold text-green-700 uppercase tracking-widest mb-1">Status</p>
                      <p className="text-sm font-black text-green-900">{selectedPatient.status === 'Healthy' ? 'Saudável' : selectedPatient.status}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                      <p className="text-[10px] font-bold text-blue-700 uppercase tracking-widest mb-1">Tutor</p>
                      <p className="text-sm font-black text-blue-900 truncate">{selectedPatient.owners?.full_name}</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
                      <p className="text-[10px] font-bold text-purple-700 uppercase tracking-widest mb-1">Telefone</p>
                      <p className="text-sm font-black text-purple-900">{selectedPatient.owners?.phone || 'N/A'}</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                      <p className="text-[10px] font-bold text-orange-700 uppercase tracking-widest mb-1">Vacinas</p>
                      <p className="text-sm font-black text-orange-900">Em dia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical History */}
            <Card
              title="Histórico Médico"
              icon="history"
              iconBgColor="bg-primary/10"
              iconTextColor="text-primary"
              className="overflow-hidden"
            >
              <div className="overflow-x-auto -mx-6 -mb-6">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Data</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Serviço</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Veterinário</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { date: '10 Out 2023', service: 'Check-up de Rotina', doc: 'Dr. Ricardo Silva', status: 'Concluído' },
                      { date: '15 Ago 2023', service: 'Vacina V10', doc: 'Dr. Ricardo Silva', status: 'Concluído' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-5 font-black text-text-main text-sm">{row.date}</td>
                        <td className="px-8 py-5 text-text-secondary text-sm font-medium">{row.service}</td>
                        <td className="px-8 py-5 text-text-secondary text-sm font-medium">{row.doc}</td>
                        <td className="px-8 py-5">
                          <Badge variant="success">{row.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
            <div className="size-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
              <span className="material-symbols-outlined text-[48px]">pets</span>
            </div>
            <div>
              <h3 className="text-xl font-black text-text-main">Selecione um Paciente</h3>
              <p className="text-text-secondary">Escolha um pet na lista lateral para ver os detalhes.</p>
            </div>
          </div>
        )}
      </main>

      <AddPatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchPatients}
      />
    </div>
  );
};

export default PatientsView;
