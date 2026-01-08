import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

type Owner = Database['public']['Tables']['owners']['Row'];

interface AddPatientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const AddPatientModal: React.FC<AddPatientModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Patient State
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('Canino');
    const [breed, setBreed] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    // Owner State
    const [isNewOwner, setIsNewOwner] = useState(true);
    const [owners, setOwners] = useState<Owner[]>([]);
    const [selectedOwnerId, setSelectedOwnerId] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [ownerPhone, setOwnerPhone] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');

    useEffect(() => {
        if (isOpen && !isNewOwner) {
            fetchOwners();
        }
    }, [isOpen, isNewOwner]);

    const fetchOwners = async () => {
        const { data, error } = await supabase.from('owners').select('*').order('full_name');
        if (!error && data) setOwners(data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let ownerId = selectedOwnerId;

            if (isNewOwner) {
                const { data: newOwner, error: ownerError } = await supabase
                    .from('owners')
                    .insert({
                        full_name: ownerName,
                        phone: ownerPhone,
                        email: ownerEmail || null
                    })
                    .select()
                    .single();

                if (ownerError) throw ownerError;
                ownerId = newOwner.id;
            }

            if (!ownerId) throw new Error('Tutor não selecionado.');

            const { error: patientError } = await supabase
                .from('patients')
                .insert({
                    name,
                    species,
                    breed,
                    birth_date: birthDate || null,
                    owner_id: ownerId,
                    status: 'Healthy',
                    image_url: imageUrl || null
                });

            if (patientError) throw patientError;

            onSuccess();
            onClose();
            resetForm();
        } catch (err: any) {
            setError(err.message || 'Erro ao cadastrar paciente.');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setName('');
        setSpecies('Canino');
        setBreed('');
        setBirthDate('');
        setImageUrl('');
        setOwnerName('');
        setOwnerPhone('');
        setOwnerEmail('');
        setSelectedOwnerId('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-sidebar-bg/60 backdrop-blur-sm" onClick={onClose}></div>

            <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-2xl font-black text-text-main tracking-tight">Novo Paciente</h2>
                        <p className="text-text-secondary text-sm font-medium">Preencha os dados do pet e do tutor.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 overflow-y-auto max-h-[70vh] no-scrollbar space-y-8">
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined">error</span>
                            {error}
                        </div>
                    )}

                    <div className="space-y-6">
                        <h3 className="text-xs font-black uppercase text-primary tracking-widest border-l-4 border-primary pl-3">🐶 Informações do Pet</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Nome do Pet*</label>
                                <input required placeholder="Ex: Rex" value={name} onChange={e => setName(e.target.value)} className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-bold focus:bg-white focus:border-primary transition-all outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Espécie</label>
                                <select value={species} onChange={e => setSpecies(e.target.value)} className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-bold focus:bg-white focus:border-primary transition-all outline-none">
                                    <option value="Canino">Canino</option>
                                    <option value="Felino">Felino</option>
                                    <option value="Ave">Ave</option>
                                    <option value="Reptil">Réptil</option>
                                    <option value="Outro">Outro</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Raça</label>
                                <input placeholder="Ex: Golden Retriever" value={breed} onChange={e => setBreed(e.target.value)} className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-bold focus:bg-white focus:border-primary transition-all outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Data de Nascimento</label>
                                <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-bold focus:bg-white focus:border-primary transition-all outline-none" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-l-4 border-accent-purple pl-3">
                            <h3 className="text-xs font-black uppercase text-accent-purple tracking-widest">👤 Informações do Tutor</h3>
                            <div className="flex bg-gray-100 p-1 rounded-lg">
                                <button type="button" onClick={() => setIsNewOwner(true)} className={`px-3 py-1 text-[10px] font-black uppercase rounded-md transition-all ${isNewOwner ? 'bg-white shadow-sm text-accent-purple' : 'text-gray-400'}`}>Novo</button>
                                <button type="button" onClick={() => setIsNewOwner(false)} className={`px-3 py-1 text-[10px] font-black uppercase rounded-md transition-all ${!isNewOwner ? 'bg-white shadow-sm text-accent-purple' : 'text-gray-400'}`}>Existente</button>
                            </div>
                        </div>

                        {isNewOwner ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in duration-300">
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Nome Completo*</label>
                                    <input required placeholder="Nome do responsável" value={ownerName} onChange={e => setOwnerName(e.target.value)} className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-bold focus:bg-white focus:border-primary transition-all outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Telefone*</label>
                                    <input required placeholder="(00) 00000-0000" value={ownerPhone} onChange={e => setOwnerPhone(e.target.value)} className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-bold focus:bg-white focus:border-primary transition-all outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">E-mail</label>
                                    <input type="email" placeholder="email@exemplo.com" value={ownerEmail} onChange={e => setOwnerEmail(e.target.value)} className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-bold focus:bg-white focus:border-primary transition-all outline-none" />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2 animate-in fade-in duration-300">
                                <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest px-1">Selecionar Tutor*</label>
                                <select required value={selectedOwnerId} onChange={e => setSelectedOwnerId(e.target.value)} className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-bold focus:bg-white focus:border-primary transition-all outline-none">
                                    <option value="">Selecione um tutor...</option>
                                    {owners.map(owner => (
                                        <option key={owner.id} value={owner.id}>{owner.full_name} ({owner.phone})</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button type="button" onClick={onClose} className="flex-1 h-14 border border-gray-200 text-text-secondary rounded-2xl font-black hover:bg-gray-50 transition-all">Cancelar</button>
                        <button type="submit" disabled={loading} className="flex-[2] h-14 bg-primary text-sidebar-bg rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                            {loading ? (
                                <div className="size-5 border-3 border-sidebar-bg/30 border-t-sidebar-bg rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Cadastrar Tudo</span>
                                    <span className="material-symbols-outlined">check_circle</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPatientModal;
