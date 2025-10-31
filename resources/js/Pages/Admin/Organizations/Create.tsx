import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';
import Select from 'react-select';
import { route } from 'ziggy-js';

const statusOptions = [
    { value: 'lead', label: 'Lead' },
    { value: 'active', label: 'Active' },
    { value: 'former', label: 'Former' },
];

const industryOptions = [
    { value: 'SaaS', label: 'SaaS' },
    { value: 'E-commerce', label: 'E-commerce' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'FinTech', label: 'FinTech' },
    { value: 'Education', label: 'Education' },
    { value: 'Marketing', label: 'Marketing' },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        region: '',
        country: '',
        postal_code: '',
        status: 'lead',
        industry: [] as string[],
        notes: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.organizations.store'));
    }

    const selectStyles = {
        control: (base: any) => ({
            ...base,
            backgroundColor: '#041C32',
            borderColor: '#064663',
            '&:hover': { borderColor: '#ECB365' },
            boxShadow: 'none',
        }),
        menu: (base: any) => ({
            ...base,
            backgroundColor: '#04293A',
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
        <>
            <Head title="Create Organization" />
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white">Create New Organization</h1>
                        <p className="mt-2 text-gray-400">Fill in the details to add a new organization to the system.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 rounded-lg border border-[#064663]/50 bg-[#04293A] p-8 shadow-2xl">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-semibold text-[#ECB365]">Organization Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full rounded-md border-2 border-transparent bg-[#041C32] px-4 py-2.5 text-white placeholder-gray-500 transition focus:border-[#ECB365] focus:ring-0 focus:outline-none"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#ECB365]">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full rounded-md border-2 border-transparent bg-[#041C32] px-4 py-2.5 text-white placeholder-gray-500 transition focus:border-[#ECB365] focus:ring-0 focus:outline-none"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#ECB365]">Phone</label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="w-full rounded-md border-2 border-transparent bg-[#041C32] px-4 py-2.5 text-white placeholder-gray-500 transition focus:border-[#ECB365] focus:ring-0 focus:outline-none"
                                />
                                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                            </div>
                        </div>

                        <div className="border-t border-[#064663] pt-8">
                            <h3 className="mb-4 text-lg font-semibold text-white">Location Details</h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-semibold text-[#ECB365]">Address</label>
                                    <input
                                        type="text"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        className="w-full rounded-md border-2 border-transparent bg-[#041C32] px-4 py-2.5 text-white placeholder-gray-500 transition focus:border-[#ECB365] focus:ring-0 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#ECB365]">City</label>
                                    <input
                                        type="text"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        className="w-full rounded-md border-2 border-transparent bg-[#041C32] px-4 py-2.5 text-white placeholder-gray-500 transition focus:border-[#ECB365] focus:ring-0 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#ECB365]">Region / State</label>
                                    <input
                                        type="text"
                                        value={data.region}
                                        onChange={(e) => setData('region', e.target.value)}
                                        className="w-full rounded-md border-2 border-transparent bg-[#041C32] px-4 py-2.5 text-white placeholder-gray-500 transition focus:border-[#ECB365] focus:ring-0 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#ECB365]">Country</label>
                                    <input
                                        type="text"
                                        value={data.country}
                                        onChange={(e) => setData('country', e.target.value)}
                                        className="w-full rounded-md border-2 border-transparent bg-[#041C32] px-4 py-2.5 text-white placeholder-gray-500 transition focus:border-[#ECB365] focus:ring-0 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#ECB365]">Postal Code</label>
                                    <input
                                        type="text"
                                        value={data.postal_code}
                                        onChange={(e) => setData('postal_code', e.target.value)}
                                        className="w-full rounded-md border-2 border-transparent bg-[#041C32] px-4 py-2.5 text-white placeholder-gray-500 transition focus:border-[#ECB365] focus:ring-0 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-[#064663] pt-8">
                            <h3 className="mb-4 text-lg font-semibold text-white">Categorization</h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#ECB365]">Status</label>
                                    <Select
                                        options={statusOptions}
                                        styles={selectStyles}
                                        onChange={(option) => setData('status', option?.value || 'lead')}
                                        defaultValue={statusOptions.find((o) => o.value === data.status)}
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#ECB365]">Industry</label>
                                    <Select
                                        isMulti
                                        options={industryOptions}
                                        styles={selectStyles}
                                        onChange={(options) =>
                                            setData(
                                                'industry',
                                                options.map((o) => o.value),
                                            )
                                        }
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-semibold text-[#ECB365]">Notes</label>
                                    <textarea
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        rows={4}
                                        className="w-full rounded-md border-2 border-transparent bg-[#041C32] px-4 py-2.5 text-white placeholder-gray-500 transition focus:border-[#ECB365] focus:ring-0 focus:outline-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-x-4 border-t border-[#064663] pt-8">
                            <Link href={route('admin.organizations.index')} className="text-sm font-semibold text-gray-400 hover:text-white">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="hover:bg-opacity-90 rounded-md bg-[#ECB365] px-6 py-2.5 text-sm font-bold text-[#041C32] shadow-lg shadow-[#ECB365]/20 transition-all duration-300 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Create Organization'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

Create.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
