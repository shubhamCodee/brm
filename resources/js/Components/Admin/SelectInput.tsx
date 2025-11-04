import Select, { Props as SelectProps } from 'react-select';

// Define the shape for a single option
export interface SelectOption {
    value: string | number;
    label: string;
}

// Define the props for our custom component
interface CustomSelectInputProps extends SelectProps<SelectOption | SelectOption[], boolean> {
    label: string;
    error?: string;
}

export default function SelectInput({ label, name, error, ...props }: CustomSelectInputProps) {
    const customStyles = {
        control: (base: any, state: any) => ({
            ...base,
            backgroundColor: '#041C32',
            borderColor: error ? '#EF4444' : state.isFocused ? '#ECB365' : '#064663',
            '&:hover': { borderColor: error ? '#EF4444' : '#ECB365' },
            boxShadow: 'none',
            borderRadius: '0.375rem',
            minHeight: '42px',
        }),
        menu: (base: any) => ({
            ...base,
            backgroundColor: '#04293A',
            zIndex: 9999,
        }),
        option: (base: any, { isFocused, isSelected }: any) => ({
            ...base,
            backgroundColor: isSelected ? '#ECB365' : isFocused ? '#064663' : 'transparent',
            color: isSelected ? '#041C32' : '#FFFFFF',
            '&:active': { backgroundColor: '#ECB365' },
        }),
        multiValue: (base: any) => ({
            ...base,
            backgroundColor: '#064663',
        }),
        multiValueLabel: (base: any) => ({
            ...base,
            color: '#ECB365',
        }),
        singleValue: (base: any) => ({
            ...base,
            color: '#FFFFFF',
        }),
        input: (base: any) => ({
            ...base,
            color: '#FFFFFF',
        }),
    };

    return (
        <div className="w-full">
            <label htmlFor={name} className="mb-2 block text-sm font-semibold text-[#ECB365]">
                {label}
            </label>
            <Select inputId={name} styles={customStyles} {...props} />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}
