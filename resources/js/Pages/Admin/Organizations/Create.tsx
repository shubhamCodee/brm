import PrimaryButton from '@/Components/Admin/PrimaryButton';
import SelectInput, { SelectOption } from '@/Components/Admin/SelectInput';
import TextInput from '@/Components/Admin/TextInput';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';
import { route } from 'ziggy-js';

const statusOptions: SelectOption[] = [
    { value: 'lead', label: 'Lead' },
    { value: 'active', label: 'Active' },
    { value: 'former', label: 'Former' },
];

const industryOptions: SelectOption[] = [
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
                                <TextInput
                                    label="Organization Name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    error={errors.name}
                                />
                            </div>
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
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    error={errors.phone}
                                />
                            </div>
                        </div>

                        <div className="border-t border-[#064663] pt-8">
                            <h3 className="mb-4 text-lg font-semibold text-white">Location Details</h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <TextInput
                                        label="Address"
                                        name="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        error={errors.address}
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        label="City"
                                        name="city"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        error={errors.city}
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        label="Region / State"
                                        name="region"
                                        value={data.region}
                                        onChange={(e) => setData('region', e.target.value)}
                                        error={errors.region}
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        label="Country"
                                        name="country"
                                        value={data.country}
                                        onChange={(e) => setData('country', e.target.value)}
                                        error={errors.country}
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        label="Postal Code"
                                        name="postal_code"
                                        value={data.postal_code}
                                        onChange={(e) => setData('postal_code', e.target.value)}
                                        error={errors.postal_code}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-[#064663] pt-8">
                            <h3 className="mb-4 text-lg font-semibold text-white">Categorization</h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <SelectInput
                                    label="Status"
                                    name="status"
                                    options={statusOptions}
                                    value={statusOptions.find((o) => o.value === data.status)}
                                    onChange={(option) => setData('status', (option as SelectOption)?.value as string)}
                                />
                                <SelectInput
                                    label="Industry"
                                    name="industry"
                                    isMulti
                                    options={industryOptions}
                                    value={industryOptions.filter((o) => data.industry.includes(o.value as string))}
                                    onChange={(options) =>
                                        setData(
                                            'industry',
                                            (options as SelectOption[]).map((o) => o.value as string),
                                        )
                                    }
                                />
                                <div className="md:col-span-2">
                                    <TextInput
                                        label="Notes"
                                        name="notes"
                                        as="textarea"
                                        rows={4}
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        error={errors.notes}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-x-4 border-t border-[#064663] pt-8">
                            <Link href={route('admin.organizations.index')} className="text-sm font-semibold text-gray-400 hover:text-white">
                                Cancel
                            </Link>
                            <PrimaryButton type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Create Organization'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

Create.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
