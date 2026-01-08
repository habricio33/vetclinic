import React from 'react';

interface PageHeaderProps {
    title: string;
    description: string;
    actionLabel?: string;
    onActionClick?: () => void;
    actionIcon?: string;
    secondaryActionLabel?: string;
    onSecondaryActionClick?: () => void;
    secondaryActionIcon?: string;
    variant?: 'simple' | 'gradient';
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    description,
    actionLabel,
    onActionClick,
    actionIcon = 'add_circle',
    secondaryActionLabel,
    onSecondaryActionClick,
    secondaryActionIcon,
    variant = 'simple'
}) => {
    const renderActions = () => (
        <div className="flex gap-3">
            {secondaryActionLabel && (
                <button
                    onClick={onSecondaryActionClick}
                    className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 border border-gray-200 text-sm font-bold bg-white hover:bg-gray-50 transition-all ${variant === 'gradient' ? 'h-12' : ''}`}
                >
                    {secondaryActionIcon && <span className="material-symbols-outlined text-[18px]">{secondaryActionIcon}</span>}
                    <span>{secondaryActionLabel}</span>
                </button>
            )}
            {actionLabel && (
                <button
                    onClick={onActionClick}
                    className={`flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-sidebar-bg rounded-xl font-black shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 ${variant === 'gradient' ? 'px-6 py-3' : 'px-6 h-12 text-sm'}`}
                >
                    <span className="material-symbols-outlined font-bold">{actionIcon}</span>
                    <span>{actionLabel}</span>
                </button>
            )}
        </div>
    );

    if (variant === 'gradient') {
        return (
            <div className="flex flex-wrap justify-between items-end gap-6 bg-gradient-to-r from-primary/10 to-transparent p-8 rounded-2xl border border-primary/20 mb-10">
                <div className="flex flex-col gap-2 max-w-2xl">
                    <h2 className="text-text-main text-3xl font-black tracking-tight">{title}</h2>
                    <p className="text-text-secondary text-base font-medium leading-relaxed">{description}</p>
                </div>
                {renderActions()}
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-text-main tracking-tight text-[32px] font-black leading-tight">{title}</h1>
                <p className="text-text-secondary font-medium">{description}</p>
            </div>
            {renderActions()}
        </div>
    );
};

export default PageHeader;
