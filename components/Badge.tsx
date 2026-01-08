import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'gray';
    className?: string;
    dot?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'gray',
    className = '',
    dot = false
}) => {
    const variants = {
        success: 'bg-green-100 text-green-700',
        warning: 'bg-yellow-100 text-yellow-700',
        danger: 'bg-red-100 text-red-700',
        info: 'bg-blue-100 text-blue-700',
        primary: 'bg-primary text-sidebar-bg',
        gray: 'bg-gray-100 text-gray-600'
    };

    const dotColors = {
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        danger: 'bg-red-500',
        info: 'bg-blue-500',
        primary: 'bg-primary',
        gray: 'bg-gray-400'
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${variants[variant]} ${className}`}>
            {dot && <span className={`size-1.5 rounded-full ${dotColors[variant]}`}></span>}
            {children}
        </span>
    );
};

export default Badge;
