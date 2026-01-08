
export type View = 'dashboard' | 'agenda' | 'pacientes' | 'financeiro' | 'estoque' | 'configuracoes' | 'servicos';

export interface Patient {
  id: string;
  name: string;
  breed: string;
  tutor: string;
  lastVisit: string;
  image: string;
  status: 'Healthy' | 'Needs Vaccine' | 'Follow-up';
}

export interface Appointment {
  id: string;
  time: string;
  duration: string;
  patientName: string;
  breed: string;
  tutor: string;
  service: string;
  status: 'Aguardando' | 'Confirmado' | 'Cancelado' | 'Agora';
  image: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  stockStatus: 'saudavel' | 'baixo' | 'critico' | 'inicial';
  image: string;
}
