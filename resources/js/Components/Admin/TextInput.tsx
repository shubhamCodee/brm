import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';

// Use a TypeScript "type" instead of an interface for more complex scenarios
type TextInputProps = {
    label: string;
    error?: string;
    className?: string;
} & (({ as?: 'input' } & InputHTMLAttributes<HTMLInputElement>) | ({ as: 'textarea' } & TextareaHTMLAttributes<HTMLTextAreaElement>));

// This is the key: the ref can be EITHER an input OR a textarea element
type Ref = HTMLInputElement | HTMLTextAreaElement;

const TextInput = forwardRef<Ref, TextInputProps>(({ label, name, error, as = 'input', className = '', ...props }, ref) => {
    const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-transparent focus:border-[#ECB365]';

    const commonClasses = `w-full rounded-md border-2 bg-[#041C32] px-4 py-2.5 text-white placeholder-gray-500 transition focus:bg-[#064663] focus:ring-0 focus:outline-none ${errorClasses}`;

    return (
        <div className={`w-full ${className}`}>
            <label htmlFor={name} className="mb-2 block text-sm font-semibold text-[#ECB365]">
                {label}
            </label>

            {as === 'textarea' ? (
                <textarea
                    id={name}
                    name={name}
                    ref={ref as React.Ref<HTMLTextAreaElement>}
                    className={commonClasses}
                    {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
                />
            ) : (
                <input
                    id={name}
                    name={name}
                    ref={ref as React.Ref<HTMLInputElement>}
                    className={commonClasses}
                    {...(props as InputHTMLAttributes<HTMLInputElement>)}
                />
            )}

            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
});

export default TextInput;
