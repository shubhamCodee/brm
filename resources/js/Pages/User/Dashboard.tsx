import { Head, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import AppLayout from '../../Layouts/AppLayout.js';

export default function Dashboard() {
    const { auth }: any = usePage().props;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#041C32] px-6 text-[#DFE0DF]">
                <div className="w-full max-w-2xl rounded-2xl border border-[#064663] bg-[#04293A] p-10 text-center shadow-2xl">
                    <h1 className="mb-6 text-4xl font-extrabold tracking-wide text-[#ECB365]">Dashboard</h1>
                    <p className="mb-4 text-lg text-[#DFE0DF]/80">
                        Welcome back, <span className="font-semibold text-[#ECB365]">{auth?.user?.name || 'User'}</span>
                    </p>
                    <p className="mb-8 leading-relaxed text-[#DFE0DF]/60">
                        This is your main space — everything starts here. You can customize, explore, and navigate to different parts of your app.
                    </p>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;
