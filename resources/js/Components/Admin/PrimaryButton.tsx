import { ButtonHTMLAttributes } from 'react';

// Define the component's props, extending standard button attributes
interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    disabled?: boolean;
}

export default function PrimaryButton({ className = '', disabled, children, ...props }: PrimaryButtonProps) {
    return (
        <button
            {...props}
            role='button'
            className={
                `inline-flex items-center rounded-md bg-[#ECB365] px-6 py-2.5 text-sm font-bold text-[#041C32] shadow-lg shadow-[#ECB365]/20 ` +
                `hover:bg-opacity-90 transition-all duration-300 hover:shadow-xl hover:shadow-[#ECB365]/30` +
                `disabled:cursor-not-allowed disabled:opacity-50 ${className}`
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
