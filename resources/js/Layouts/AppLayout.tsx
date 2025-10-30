import { ReactNode } from 'react';
import Navbar from '../Components/User/Navbar.js';

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
        </div>
    );
}
