import { ReactNode } from 'react';
import Navbar from '../Components/Admin/Navbar.js';

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default AdminLayout;
