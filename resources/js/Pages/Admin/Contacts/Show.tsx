import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import React, { ReactNode } from 'react';
import { route } from 'ziggy-js';

// Define the shape of the data we receive from the controller
interface Organization {
    id: number;
    name: string;
}

interface Contact {
    id: number;
    first_name: string;
    last_name: string;
    email: string | null;
    phone: string | null;
    position: string | null;
    organization: Organization; // The organization is included
}

// A small helper component for displaying a single detail item with an icon
const DetailItem = ({
    icon,
    label,
    value,
    isLink = false,
}: {
    icon: ReactNode;
    label: string;
    value: string | null | undefined;
    isLink?: boolean;
}) => {
    if (!value) return null;

    const content = isLink ? (
        <a href={label === 'Email' ? `mailto:${value}` : `tel:${value}`} className="text-white hover:text-[#ECB365] hover:underline">
            {value}
        </a>
    ) : (
        <span className="text-white">{value}</span>
    );

    return (
        <div className="flex items-center">
            <div className="h-6 w-6 flex-shrink-0 text-[#ECB365]/70">{icon}</div>
            <div className="ml-4">
                <dt className="text-sm font-medium text-gray-400">{label}</dt>
                <dd className="mt-1 text-base">{content}</dd>
            </div>
        </div>
    );
};

export default function Show() {
    const { contact } = usePage<PageProps & { contact: Contact }>().props;
    const fullName = `${contact.first_name} ${contact.last_name}`;

    return (
        <>
            <Head title={`Contact: ${fullName}`} />
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-4xl">
                    {/* Header: Back Link */}
                    <div className="mb-6">
                        <Link
                            href={route('admin.contacts.index')}
                            className="inline-flex items-center gap-x-2 text-sm font-semibold text-gray-400 transition hover:text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Back to Contacts
                        </Link>
                    </div>

                    {/* Main Content Card */}
                    <div className="overflow-hidden rounded-lg border border-[#064663]/50 bg-[#04293A] shadow-2xl">
                        <div className="p-8">
                            {/* Profile Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-x-5">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#064663] text-3xl font-bold text-[#ECB365] ring-4 ring-[#041C32]">
                                        <span>{`${contact.first_name[0]}${contact.last_name[0]}`}</span>
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold text-white">{fullName}</h1>
                                        <p className="mt-1 text-lg text-gray-400">{contact.position || 'No position specified'}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex-shrink-0 sm:mt-0">
                                    <Link
                                        href={route('admin.contacts.edit', contact.id)}
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
                                        Edit Contact
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="border-t border-[#064663] bg-[#041C32]/30 p-8">
                            <dl className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                                <DetailItem
                                    label="Email"
                                    value={contact.email}
                                    isLink={true}
                                    icon={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                            />
                                        </svg>
                                    }
                                />
                                <DetailItem
                                    label="Phone"
                                    value={contact.phone}
                                    isLink={true}
                                    icon={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z"
                                            />
                                        </svg>
                                    }
                                />
                                <div>
                                    <div className="flex items-center">
                                        <div className="h-6 w-6 flex-shrink-0 text-[#ECB365]/70">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6.75M9 11.25h6.75M9 15.75h6.75"
                                                />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <dt className="text-sm font-medium text-gray-400">Organization</dt>
                                            <dd className="mt-1 text-base">
                                                <Link
                                                    href={route('admin.organizations.show', contact.organization.id)}
                                                    className="font-semibold text-white hover:text-[#ECB365] hover:underline"
                                                >
                                                    {contact.organization.name}
                                                </Link>
                                            </dd>
                                        </div>
                                    </div>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Show.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
