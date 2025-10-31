import { PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import React, { ReactNode } from 'react';
import { route } from 'ziggy-js';
import AdminLayout from '../../Layouts/AdminLayout';

// Define the props for our new, enhanced StatCard
interface StatCardProps {
    title: string;
    value: number;
    icon: ReactNode;
    href: string;
    color: string;
    glowColor: string;
}

// A small helper component for the icon background for cleaner code
const IconWrapper = ({ className, children }: { className: string; children: React.ReactNode }) => (
    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${className}`}>{children}</div>
);

// The redesigned StatCard component
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, href, color, glowColor }) => (
    <Link
        href={href}
        className="group relative block overflow-hidden rounded-xl border border-[#064663]/50 bg-[#04293A] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#ECB365]/50 hover:shadow-2xl hover:shadow-[#064663]/50"
    >
        <div
            className={`absolute top-0 right-0 h-24 w-24 rounded-full opacity-0 blur-3xl transition-opacity duration-500 ${glowColor} group-hover:opacity-20`}
        ></div>
        <div className="relative z-10">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-400">{title}</p>
                    <p className="mt-2 text-4xl font-bold text-white">{value}</p>
                </div>
                <IconWrapper className={color}>{icon}</IconWrapper>
            </div>
            <div className="absolute bottom-[-24px] left-0 h-1 w-full bg-[#064663] transition-all duration-300 group-hover:bg-[#ECB365]"></div>
        </div>
    </Link>
);

export default function Dashboard() {
    const { auth, stats } = usePage<PageProps & { stats: { users: number; organizations: number; contacts: number } }>().props;

    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        Welcome back, <span className="text-[#ECB365]">{auth.user?.name}</span>!
                    </h1>
                    <p className="mt-2 text-gray-400">Here's a snapshot of your CRM activity.</p>
                </div>

                {/* Stat Cards Grid with New Icons and Props */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <StatCard
                        title="Total Users"
                        value={stats.users}
                        href={route('admin.users.index')}
                        color="bg-sky-500/10"
                        glowColor="bg-sky-500"
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-sky-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        }
                    />
                    <StatCard
                        title="Total Organizations"
                        value={stats.organizations}
                        href={route('admin.organizations.index')}
                        color="bg-emerald-500/10"
                        glowColor="bg-emerald-500"
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-emerald-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-4h1m-1 4h1"
                                />
                            </svg>
                        }
                    />
                    <StatCard
                        title="Total Contacts"
                        value={stats.contacts}
                        href={route('admin.contacts.index')}
                        color="bg-amber-500/10"
                        glowColor="bg-amber-500"
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-amber-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                />
                            </svg>
                        }
                    />
                </div>

                {/* Placeholder for future content */}
                <div className="mt-12">
                    <div className="rounded-lg border-2 border-dashed border-[#064663] p-12 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#064663]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-400">Future Content Area</h3>
                        <p className="mt-2 text-gray-500">Charts and recent activity feeds will be displayed here.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
