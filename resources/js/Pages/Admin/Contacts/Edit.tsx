import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React from 'react';
import Select from 'react-select';
import { route } from 'ziggy-js';

interface Organization {
    id: number;
    name: string;
}

interface Contact {
    id: number;
    organization_id: number;
    first_name: string;
    last_name: string;
    email: string | null;
    phone: string | null;
    position: string | null;
}

interface OrganizationOption {
    value: number;
    label: string;
}

export default function Edit() {
    const { contact, organizations } = usePage<PageProps & { contact: Contact; organizations: Organization[] }>().props;

    const { data, setData, put, processing, errors } = useForm({
        organization_id: contact.organization_id.toString(),
        first_name: contact.first_name || '',
        last_name: contact.last_name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        position: contact.position || '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('admin.contacts.update', contact.id));
    }

    const organizationOptions: OrganizationOption[] = organizations.map((org) => ({
        value: org.id,
        label: org.name,
    }));

    const defaultOrganization = organizationOptions.find((option) => option.value === contact.organization_id);

    const selectStyles = {
        control: (base: any) => ({
            ...base,
            backgroundColor: '#041C32',
            borderColor: '#064663',
            '&:hover': { borderColor: '#ECB365' },
            boxShadow: 'none',
        }),
        menu: (base: any) => ({ ...base, backgroundColor: '#04293A' }),
        option: (base: any, { isFocused, isSelected }: any) => ({
            ...base,
            backgroundColor: isSelected ? '#ECB365' : isFocused ? '#064663' : 'transparent',
            color: isSelected ? '#041C32' : '#FFFFFF',
            '&:active': { backgroundColor: '#ECB365' },
        }),
        singleValue: (base: any) => ({ ...base, color: '#FFFFFF' }),
        input: (base: any) => ({ ...base, color: '#FFFFFF' }),
    };

    return (
        <>
            <Head title={`Edit Contact: ${contact.first_name}`} />
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white">Edit Contact</h1>
                        <p className="mt-2 text-gray-400">
                            Updating details for <span className="font-semibold text-[#ECB365]">{`${contact.first_name} ${contact.last_name}`}</span>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 rounded-lg border border-[#064663]/50 bg-[#04293A] p-8 shadow-2xl">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#ECB365]">
                                Organization <span className="text-red-500">*</span>
                            </label>
                            <Select
                                options={organizationOptions}
                                styles={selectStyles}
                                defaultValue={defaultOrganization}
                                onChange={(option) => setData('organization_id', option?.value.toString() || '')}
                                placeholder="Search for an organization..."
                                isClearable
                                isSearchable
                            />
                            {errors.organization_id && <p className="mt-1 text-sm text-red-500">{errors.organization_id}</p>}
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#ECB365]">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    className="w-full rounded-md border-2 border-transparent bg-[#041C32] px-4 py-2.5 text-white placeholder-gray-500 transition focus:border-[#ECB365] focus:ring-0 focus:outline-none"
                                />
                                {errors.first_name && <p className="mt-1 text-sm text-red-500">{errors.first_name}</p>}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#ECB365]">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    className="w-full rounded-md border-2 border-transparent bg-[#041C32] px-4 py-2.5 text-white placeholder-gray-500 transition focus:border-[#ECB365] focus:ring-0 focus:outline-none"
                                />
                                {errors.last_name && <p className="mt-1 text-sm text-red-500">{errors.last_name}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#ECB365]">Position / Job Title</label>
                            <input
                                type="text"
                                value={data.position}
                                onChange={(e) => setData('position', e.target.value)}
                                className="w-full rounded-md border-2 border-transparent bg-[#041C32] px-4 py-2.5 text-white placeholder-gray-500 transition focus:border-[#ECB365] focus:ring-0 focus:outline-none"
                            />
                            {errors.position && <p className="mt-1 text-sm text-red-500">{errors.position}</p>}
                        </div>

                        <div className="flex items-center justify-end gap-x-4 border-t border-[#064663] pt-8">
                            <Link href={route('admin.contacts.index')} className="text-sm font-semibold text-gray-400 hover:text-white">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="hover:bg-opacity-90 rounded-md bg-[#ECB365] px-6 py-2.5 text-sm font-bold text-[#041C32] shadow-lg shadow-[#ECB365]/20 transition-all duration-300 disabled:opacity-50"
                            >
                                {processing ? 'Saving Changes...' : 'Update Contact'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

Edit.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
