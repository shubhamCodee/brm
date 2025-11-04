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
    email: string | null;
    phone: string | null;
    address: string | null;
    city: string | null;
    region: string | null;
    country: string | null;
    postal_code: string | null;
    status: string;
    industry: string[] | null;
    notes: string | null;
}

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

type FormData = {
    _method: 'put';
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    region: string;
    country: string;
    postal_code: string;
    status: string;
    industry: string[];
    notes: string;
};

export default function Edit() {
    const { organization } = usePage<PageProps & { organization: Organization }>().props;

    const { data, setData, post, processing, errors } = useForm<FormData>({
        _method: 'put',
        name: organization.name || '',
        email: organization.email || '',
        phone: organization.phone || '',
        address: organization.address || '',
        city: organization.city || '',
        region: organization.region || '',
        country: organization.country || '',
        postal_code: organization.postal_code || '',
        status: organization.status || 'lead',
        industry: organization.industry || [],
        notes: organization.notes || '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.organizations.update', organization.id));
    }

    const defaultStatus = statusOptions.find((o) => o.value === data.status);
    const defaultIndustries = industryOptions.filter((o) => data.industry.includes(o.value.toString()));

    return (
        <>
            <Head title={`Edit ${organization.name}`} />
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white">Edit Organization</h1>
                        <p className="mt-2 text-gray-400">
                            Updating the details for <span className="font-semibold text-[#ECB365]">{organization.name}</span>.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 rounded-lg border border-[#064663]/50 bg-[#04293A] p-8 shadow-2xl">
                        {/* Basic Details Section */}
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
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    error={errors.phone}
                                />
                            </div>
                        </div>

                        {/* Location Details Section */}
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

                        {/* Categorization Section */}
                        <div className="border-t border-[#064663] pt-8">
                            <h3 className="mb-4 text-lg font-semibold text-white">Categorization</h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <SelectInput
                                        label="Status"
                                        name="status"
                                        options={statusOptions}
                                        defaultValue={defaultStatus}
                                        onChange={(option) => setData('status', (option as SelectOption)?.value?.toString() || '')}
                                        error={errors.status}
                                    />
                                </div>
                                <div>
                                    <SelectInput
                                        label="Industry"
                                        name="industry"
                                        isMulti
                                        options={industryOptions}
                                        defaultValue={defaultIndustries}
                                        value={industryOptions.filter((o) => data.industry.includes(o.value.toString()))}
                                        onChange={(options) =>
                                            setData(
                                                'industry',
                                                (options as SelectOption[]).map((o) => o.value.toString()),
                                            )
                                        }
                                        error={errors.industry}
                                    />
                                </div>
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
                                {processing ? 'Updating...' : 'Update Organization'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

Edit.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
