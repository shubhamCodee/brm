import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Footer from '../Components/Admin/Footer.js';
import Navbar from '../Components/Admin/Navbar.js';

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
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
