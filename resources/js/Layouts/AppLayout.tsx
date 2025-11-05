// In resources/js/Layouts/AppLayout.tsx

import Navbar from '@/Components/User/Navbar';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEcho } from '@laravel/echo-react'; 
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    // useEcho(`user.${user?.id}`, 'UserProfileUpdated', (event: any) => {
    //     console.log('Real-time event received via useEcho:', event);
    //     toast.success(event.message);
    // });

    return (
        <div className="min-h-screen bg-[#041C32]">
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: '#064663',
                        color: '#FFFFFF',
                        border: '1px solid #ECB365',
                    },
                }}
            />

            <Navbar />
            <main>{children}</main>
        </div>
    );
}
