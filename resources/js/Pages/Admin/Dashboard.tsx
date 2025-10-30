import { Head, Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Dashboard() {
    const { auth }: any = usePage().props;

    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="flex min-h-screen flex-col bg-[#041C32] text-[#DFE0DF]">
                <main className="flex-1 p-10">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Manage Users Card */}
                        <Link
                            href="/admin/users"
                            className="rounded-2xl bg-[#064663] p-8 text-center shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-[#04293A]"
                        >
                            <h2 className="mb-3 text-2xl font-semibold text-[#ECB365]">Manage Users</h2>
                            <p className="text-[#DFE0DF]/70">View, create, update, and delete users easily.</p>
                        </Link>

                        {/* Future cards */}
                        <div className="rounded-2xl border border-[#064663]/30 bg-[#064663]/40 p-8 text-center shadow-inner">
                            <h2 className="mb-3 text-2xl font-semibold text-[#ECB365]/50">Accounts</h2>
                            <p className="text-[#DFE0DF]/40 italic">Coming soon...</p>
                        </div>

                        <div className="rounded-2xl border border-[#064663]/30 bg-[#064663]/40 p-8 text-center shadow-inner">
                            <h2 className="mb-3 text-2xl font-semibold text-[#ECB365]/50">Reports</h2>
                            <p className="text-[#DFE0DF]/40 italic">Coming soon...</p>
                        </div>
                    </div>
                </main>

                <footer className="border-t border-[#064663] bg-[#04293A] py-4 text-center text-sm text-[#ECB365]/70">
                    © {new Date().getFullYear()} Admin Panel — All rights reserved.
                </footer>
            </div>
        </>
    );
}

Dashboard.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
