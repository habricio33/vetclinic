import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { IMAGES } from '../constants';

const LoginView: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                        }
                    }
                });
                if (error) throw error;
                alert('Verifique seu e-mail para confirmar o cadastro! Você precisará clicar no link de confirmação antes de entrar.');
                setIsLogin(true);
            }
        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro na autenticação.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-accent-purple/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="w-full max-w-[1100px] min-h-[500px] max-h-[95vh] bg-white rounded-[40px] shadow-2xl border border-white/20 flex flex-col lg:flex-row overflow-hidden relative z-10 backdrop-blur-xl my-4">
                {/* Left Side - Visual/Hero */}
                <div className="hidden lg:flex w-1/2 bg-sidebar-bg relative overflow-hidden flex-col justify-between p-12 shrink-0">
                    <div className="absolute inset-0 z-0 opacity-40">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent-purple/20"></div>
                    </div>

                    <div className="relative z-10 flex items-center gap-3">
                        <div className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                            <span className="material-symbols-outlined text-sidebar-bg font-bold">pets</span>
                        </div>
                        <h1 className="text-white text-2xl font-black tracking-tighter">VetClinic <span className="text-primary-dark">Pro</span></h1>
                    </div>

                    <div className="relative z-10 space-y-6">
                        <h2 className="text-5xl font-black text-white leading-tight tracking-tight">
                            Gestão <span className="text-primary italic">Inteligente</span> para seu Pet Shop.
                        </h2>
                        <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-sm">
                            Simplifique sua rotina, encante seus clientes e foque no que realmente importa: o cuidado animal.
                        </p>
                    </div>

                    <div className="relative z-10 flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-md">
                        <div className="flex -space-x-3">
                            {[IMAGES.REX, IMAGES.LUNA, IMAGES.THOR].map((img, i) => (
                                <img key={i} src={img} className="size-10 rounded-full border-2 border-sidebar-bg object-cover" alt="users" />
                            ))}
                        </div>
                        <p className="text-gray-300 text-sm font-bold">+500 clínicas cadastradas</p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-12 relative bg-white overflow-y-auto no-scrollbar">
                    <div className="max-w-md w-full mx-auto space-y-10">
                        <div className="space-y-4">
                            <h3 className="text-4xl font-black text-text-main tracking-tight">
                                {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
                            </h3>
                            <p className="text-text-secondary font-medium">
                                {isLogin
                                    ? 'Sentimos sua falta. Entre para gerenciar sua clínica.'
                                    : 'Comece hoje mesmo a transformar seu atendimento veterinário.'}
                            </p>
                        </div>

                        <form onSubmit={handleAuth} className="space-y-6">
                            {error && (
                                <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm font-bold animate-in fade-in slide-in-from-top-2">
                                    <span className="material-symbols-outlined text-[18px] align-middle mr-2">error</span>
                                    {error}
                                </div>
                            )}

                            <div className="space-y-5">
                                {!isLogin && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                        <label className="text-xs font-black uppercase text-text-secondary tracking-widest px-1">Nome Completo</label>
                                        <div className="relative group">
                                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">person</span>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Como gostaria de ser chamado?"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 text-sm font-bold focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase text-text-secondary tracking-widest px-1">E-mail</label>
                                    <div className="relative group">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">mail</span>
                                        <input
                                            type="email"
                                            required
                                            placeholder="seu@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 text-sm font-bold focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between px-1">
                                        <label className="text-xs font-black uppercase text-text-secondary tracking-widest">Senha</label>
                                        {isLogin && <button type="button" className="text-[10px] font-black uppercase text-primary tracking-widest hover:underline">Esqueceu?</button>}
                                    </div>
                                    <div className="relative group">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">lock</span>
                                        <input
                                            type="password"
                                            required
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 text-sm font-bold focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 bg-primary text-sidebar-bg rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3"
                            >
                                {loading ? (
                                    <div className="size-6 border-4 border-sidebar-bg/30 border-t-sidebar-bg rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>{isLogin ? 'Entrar' : 'Criar Conta'}</span>
                                        <span className="material-symbols-outlined font-black">arrow_forward</span>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="pt-6 border-t border-gray-100 text-center">
                            <p className="text-text-secondary text-sm font-medium">
                                {isLogin ? 'Ainda não tem uma conta?' : 'Já possui uma conta?'} {' '}
                                <button
                                    onClick={() => {
                                        setIsLogin(!isLogin);
                                        setError(null);
                                    }}
                                    className="text-primary font-black hover:underline"
                                >
                                    {isLogin ? 'Crie agora' : 'Entre aqui'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginView;
