import PrimaryButton from '@/Components/Admin/PrimaryButton';
import SelectInput, { SelectOption } from '@/Components/Admin/SelectInput';
import TextInput from '@/Components/Admin/TextInput';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React from 'react';
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

    const organizationOptions: SelectOption[] = organizations.map((org) => ({
        value: org.id,
        label: org.name,
    }));

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
                            <SelectInput
                                label="Organization"
                                name="organization_id"
                                options={organizationOptions}
                                defaultValue={organizationOptions.find((option) => option.value === contact.organization_id)}
                                onChange={(option) => setData('organization_id', (option as SelectOption)?.value.toString() || '')}
                                error={errors.organization_id}
                                placeholder="Search for an organization..."
                                isClearable
                                isSearchable
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <TextInput
                                    label="First Name"
                                    name="first_name"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    error={errors.first_name}
                                />
                            </div>
                            <div>
                                <TextInput
                                    label="Last Name"
                                    name="last_name"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    error={errors.last_name}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <TextInput
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    error={errors.email}
                                />
                            </div>
                            <div>
                                <TextInput
                                    label="Phone"
                                    name="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    error={errors.phone}
                                />
                            </div>
                        </div>

                        <div>
                            <TextInput
                                label="Position / Job Title"
                                name="position"
                                value={data.position}
                                onChange={(e) => setData('position', e.target.value)}
                                error={errors.position}
                            />
                        </div>

                        <div className="flex items-center justify-end gap-x-4 border-t border-[#064663] pt-8">
                            <Link href={route('admin.contacts.index')} className="text-sm font-semibold text-gray-400 hover:text-white">
                                Cancel
                            </Link>
                            <PrimaryButton type="submit" disabled={processing}>
                                {processing ? 'Saving Changes...' : 'Update Contact'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

Edit.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
