import React from 'react';

interface StatCardProps {
    label: string;
    value: string;
    change?: string;
    icon: string;
    trend?: 'up' | 'down';
    sub?: string;
    color?: string;
    border?: string;
}

const StatCard: React.FC<StatCardProps> = ({
    label,
    value,
    change,
    icon,
    trend,
    sub,
    color,
    border
}) => (
    <div className={`flex flex-col gap-1 rounded-xl p-5 bg-white border shadow-sm relative overflow-hidden ${border || 'border-gray-100'}`}>
        <div className="flex items-center gap-2">
            <span className={`material-symbols-outlined text-[20px] ${color || 'text-text-secondary'}`}>{icon}</span>
            <p className="text-text-secondary text-sm font-bold uppercase tracking-widest">{label}</p>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
            <p className="text-text-main text-3xl font-black">{value}</p>
            {change && (
                <span className={`${trend === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'} px-1.5 py-0.5 rounded text-[10px] font-black flex items-center`}>
                    {change}
                </span>
            )}
            {sub && <span className={`text-[10px] font-bold ${color || 'text-text-secondary'}`}>{sub}</span>}
        </div>
    </div>
);

export default StatCard;
