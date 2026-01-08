import React from 'react';

interface CardProps {
    title: string;
    icon?: string;
    iconBgColor?: string;
    iconTextColor?: string;
    actionLabel?: string;
    onActionClick?: () => void;
    children: React.ReactNode;
    className?: string;
    footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
    title,
    icon,
    iconBgColor = 'bg-gray-50',
    iconTextColor = 'text-gray-600',
    actionLabel,
    onActionClick,
    children,
    className = '',
    footer
}) => {
    return (
        <div className={`bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col ${className}`}>
            <div className="flex items-center justify-between p-6 pb-4">
                <div className="flex items-center gap-3">
                    {icon && (
                        <div className={`${iconBgColor} ${iconTextColor} p-2 rounded-lg flex items-center justify-center`}>
                            <span className="material-symbols-outlined">{icon}</span>
                        </div>
                    )}
                    <h3 className="text-lg font-bold text-text-main">{title}</h3>
                </div>
                {actionLabel && (
                    <button
                        onClick={onActionClick}
                        className="text-primary text-sm font-semibold hover:text-primary-dark transition-colors"
                    >
                        {actionLabel}
                    </button>
                )}
            </div>
            <div className="flex-1 px-6 pb-6">
                {children}
            </div>
            {footer && (
                <div className="px-6 py-4 border-t border-gray-50 bg-gray-50/30">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;
