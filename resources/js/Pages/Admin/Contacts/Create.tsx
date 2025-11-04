import PrimaryButton from '@/Components/Admin/PrimaryButton';
import SelectInput, { SelectOption } from '@/Components/Admin/SelectInput';
import TextInput from '@/Components/Admin/TextInput';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React from 'react';
import { route } from 'ziggy-js';

// Define the shape of the organization data we received
interface OrganizationOption {
    id: number;
    name: string;
}

export default function Create() {
    // Get the organizations list from the controller
    const { organizations } = usePage<PageProps & { organizations: OrganizationOption[] }>().props;

    const { data, setData, post, processing, errors } = useForm({
        organization_id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        position: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.contacts.store'));
    }

    // Convert our organizations data into the format react-select expects: { value, label }
    const organizationOptions: SelectOption[] = organizations.map((org) => ({
        value: org.id,
        label: org.name,
    }));

    return (
        <>
            <Head title="Create Contact" />
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white">Create New Contact</h1>
                        <p className="mt-2 text-gray-400">Add a new person to your contact list.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 rounded-lg border border-[#064663]/50 bg-[#04293A] p-8 shadow-2xl">
                        {/* Organization Selector - The Key New Field */}
                        <div>
                            <SelectInput
                                label="Organization"
                                name="organization_id"
                                options={organizationOptions}
                                onChange={(option) => setData('organization_id', (option as SelectOption)?.value.toString() || '')}
                                error={errors.organization_id}
                                placeholder="Search for an organization..."
                                isClearable
                                isSearchable
                            />
                            {/* The original error <p> tag is no longer needed, as it's inside the component */}
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
                                {processing ? 'Saving...' : 'Create Contact'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

Create.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
