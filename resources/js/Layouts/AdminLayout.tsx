import { usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Footer from '../Components/Admin/Footer.js';
import Navbar from '../Components/Admin/Navbar.js';
import { PageProps } from '../types.js';

const AdminLayout = ({ children }: { children: ReactNode }) => {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    // useEffect(() => {
    //     if (user) {
    //         window.Echo.private(`user.${user.id}`).listen('UserProfileUpdated', (event: any) => {
    //             console.log('Real-time event received: ', event);
    //             toast.success(event.message);
    //         });
    //     }

    //     return () => {
    //         window.Echo.leave(`user.${user?.id}`);
    //     };
    // });

    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    className: '',
                    style: {
                        background: '#064663', // Your dark color
                        color: '#FFFFFF', // White text
                        border: '1px solid #ECB365',
                    },
                }}
            />
            <Navbar />
            <div className="min-h-screen bg-[#041C32] px-8 py-12 font-sans text-[#ECB365]">
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-7xl"
                ></motion.div>

                {children}
            </div>
            <Footer />
        </>
    );
};

export default AdminLayout;
