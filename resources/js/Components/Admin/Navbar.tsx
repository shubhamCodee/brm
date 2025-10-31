import { PageProps } from '@/types'; // Using our global PageProps for type safety
import { Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function AdminNavbar() {
    const { auth } = usePage<PageProps>().props;
    const user = auth?.user;

    // Helper to determine if a link is the currently active page
    const isActive = (routeName: string) => {
        return route().current(routeName);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b-2 border-[#064663] bg-[#041C32]">
            <nav className="container mx-auto flex items-center justify-between px-6 py-3">
                {/* Left side — Admin Brand & Navigation */}
                <div className="flex items-center gap-x-8">
                    {/* Brand */}
                    <div className="text-xl font-black tracking-wider text-white">
                        <Link href={route('admin.dashboard')} className="flex items-center gap-x-2">
                            <span className="rounded-md bg-[#ECB365] px-2 py-0.5 text-sm font-bold text-[#041C32]">ADMIN</span>
                            <span className="text-gray-300">Panel</span>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden items-center gap-x-6 text-sm font-semibold md:flex">
                        <Link
                            href={route('admin.users.index')}
                            className={`transition-colors duration-300 ${isActive('admin.users.index') ? 'text-[#ECB365]' : 'text-gray-400 hover:text-white'}`}
                        >
                            Users
                        </Link>
                        <Link
                            href={route('admin.organizations.index')}
                            className={`transition-colors duration-300 ${isActive('admin.organizations.index') ? 'text-[#ECB365]' : 'text-gray-400 hover:text-white'}`}
                        >
                            Organizations
                        </Link>
                        <Link
                            href={route('admin.contacts.index')}
                            className={`transition-colors duration-300 ${isActive('admin.contacts.index') ? 'text-[#ECB365]' : 'text-gray-400 hover:text-white'}`}
                        >
                            Contacts
                        </Link>
                    </div>
                </div>

                {/* Right side — User Menu */}
                <div className="flex items-center gap-x-4">
                    <div className="text-right">
                        <p className="text-sm font-medium text-white">
                            {user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : 'Admin'}
                        </p>
                        <p className="text-xs font-bold tracking-wider text-[#ECB365] uppercase">{user?.role ? user.role : 'Admin Role'}</p>
                    </div>

                    {/* Logout Button with Icon */}
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        title="Logout"
                        className="group flex h-10 w-10 items-center justify-center rounded-full bg-[#064663] text-gray-400 transition-all duration-300 hover:bg-[#ECB365] hover:text-[#041C32] focus-visible:ring-2 focus-visible:ring-[#ECB365] focus-visible:ring-offset-2 focus-visible:ring-offset-[#041C32] focus-visible:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                    </Link>
                </div>
            </nav>
        </header>
    );
}
