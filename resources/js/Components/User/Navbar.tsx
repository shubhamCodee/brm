import { PageProps } from '@/types'; // Using our global PageProps for type safety
import { Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Navbar() {
    // Using the globally defined PageProps type for auth object
    const { auth } = usePage<PageProps>().props;
    const user = auth?.user;

    // A helper function to get user initials as a fallback for the avatar
    const getInitials = (name: string | undefined): string => {
        if (!name) return 'U';
        const names = name.split(' ');
        const initials = names.map((n) => n[0]).join('');
        return initials.slice(0, 2).toUpperCase();
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#041C32]/80 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Left side — Brand */}
                    <div className="flex-shrink-0">
                        <Link href={route('dashboard')} className="group flex items-center gap-x-2">
                            <svg
                                className="h-8 w-8 text-[#ECB365]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5" />
                                <path d="M2 12l10 5 10-5" />
                            </svg>
                            <span className="text-xl font-bold tracking-wider text-white transition-colors group-hover:text-[#ECB365]">CRM</span>
                        </Link>
                    </div>

                    {/* Right side — User Menu */}
                    <div className="flex items-center gap-x-5">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="group relative inline-flex items-center justify-center overflow-hidden rounded-md px-4 py-2 text-sm font-semibold text-gray-300 transition-all duration-300 ease-in-out hover:text-white"
                        >
                            <span className="absolute h-0 w-0 rounded-full bg-[#ECB365]/20 transition-all duration-300 ease-out group-hover:h-32 group-hover:w-32"></span>
                            <span className="relative flex items-center gap-x-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                Logout
                            </span>
                        </Link>

                        {/* Divider */}
                        <div className="h-8 w-px bg-white/10"></div>

                        {/* User Info & Avatar */}
                        <div className="flex items-center gap-x-3">
                            <div className="text-right">
                                <p className="truncate font-semibold text-white">
                                    {user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : 'Welcome'}
                                </p>
                                <p className="text-xs font-medium text-gray-400">
                                    {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}
                                </p>
                            </div>

                            <div className="h-10 w-10 flex-shrink-0">
                                {user?.profile_picture ? (
                                    <img
                                        className="h-full w-full rounded-full object-cover"
                                        src={`/storage/${user.profile_picture}`}
                                        alt="User Avatar"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-[#064663] text-sm font-bold text-[#ECB365]">
                                        <span>{getInitials(user?.name)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
