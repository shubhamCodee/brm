import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
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

const DetailItem = ({ label, value }: { label: string; value: string | null | undefined }) => {
    if (!value) return null;
    return (
        <div>
            <dt className="text-sm font-medium text-gray-400">{label}</dt>
            <dd className="mt-1 text-base text-white">{value}</dd>
        </div>
    );
};

const StatusBadge = ({ status }: { status: string }) => {
    const baseClasses = 'px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full';
    const statusClasses = {
        lead: 'bg-blue-500/20 text-blue-300',
        active: 'bg-green-500/20 text-green-300',
        former: 'bg-gray-500/20 text-gray-400',
    };
    return <span className={`${baseClasses} ${statusClasses[status as keyof typeof statusClasses] || statusClasses.former}`}>{status}</span>;
};

export default function Show() {
    const { organization } = usePage<PageProps & { organization: Organization }>().props;

    return (
        <>
            <Head title={`Organization: ${organization.name}`} />
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-x-3">
                                <Link href={route('admin.organizations.index')} className="text-gray-400 transition hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </Link>
                                <h1 className="text-3xl font-bold text-white">{organization.name}</h1>
                            </div>
                            <p className="mt-2 text-gray-400">Detailed information and actions for this organization.</p>
                        </div>
                        <div className="mt-4 flex-shrink-0 sm:mt-0">
                            <Link
                                href={route('admin.organizations.edit', organization.id)}
                                className="hover:bg-opacity-90 inline-flex items-center gap-x-2 rounded-md bg-[#ECB365] px-5 py-2.5 text-sm font-bold text-[#041C32] shadow-lg shadow-[#ECB365]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#ECB365]/30"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Edit Organization
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div className="space-y-8 lg:col-span-2">
                            <div className="rounded-lg border border-[#064663]/50 bg-[#04293A] p-6 shadow-lg">
                                <h3 className="mb-4 border-b border-[#064663] pb-3 text-lg font-semibold text-[#ECB365]">Contact & Location</h3>
                                <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                    <DetailItem label="Email" value={organization.email} />
                                    <DetailItem label="Phone" value={organization.phone} />
                                    <div className="sm:col-span-2">
                                        <DetailItem label="Address" value={organization.address} />
                                    </div>
                                    <DetailItem label="City" value={organization.city} />
                                    <DetailItem label="Region / State" value={organization.region} />
                                    <DetailItem label="Postal Code" value={organization.postal_code} />
                                    <DetailItem label="Country" value={organization.country} />
                                </dl>
                            </div>

                            <div className="rounded-lg border border-[#064663]/50 bg-[#04293A] p-6 shadow-lg">
                                <h3 className="mb-4 border-b border-[#064663] pb-3 text-lg font-semibold text-[#ECB365]">Notes</h3>
                                <div className="prose prose-invert max-w-none text-gray-300">
                                    {organization.notes ? (
                                        <p>{organization.notes}</p>
                                    ) : (
                                        <p className="text-gray-500 italic">No notes have been added for this organization.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="rounded-lg border border-[#064663]/50 bg-[#04293A] p-6 shadow-lg">
                                <h3 className="mb-4 border-b border-[#064663] pb-3 text-lg font-semibold text-[#ECB365]">Status & Industry</h3>
                                <div className="space-y-4">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-400">Status</dt>
                                        <dd className="mt-1">
                                            <StatusBadge status={organization.status} />
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-400">Industries</dt>
                                        <dd className="mt-2 flex flex-wrap gap-2">
                                            {organization.industry && organization.industry.length > 0 ? (
                                                organization.industry.map((ind) => (
                                                    <span
                                                        key={ind}
                                                        className="rounded-full bg-[#064663] px-2.5 py-0.5 text-xs font-semibold text-[#ECB365]"
                                                    >
                                                        {ind}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-sm text-gray-500 italic">Not specified</span>
                                            )}
                                        </dd>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Show.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
