import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { route } from 'ziggy-js';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        post(route('login'));
    }

    return (
        <>
            <Head title="Log In" />
            <div className="flex min-h-screen w-full items-center justify-center bg-[#041C32] p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-md overflow-hidden rounded-2xl bg-[#04293A] shadow-2xl shadow-[#064663]/30">
                    <div className="p-8 sm:p-10">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Welcome Back</h1>
                            <p className="mt-2 text-base text-gray-400">Sign in to continue to your dashboard.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                {/* Email */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-300">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full rounded-md border-2 border-transparent bg-[#041C32] px-4 py-2.5 text-white placeholder-gray-500 transition focus:border-[#ECB365] focus:bg-[#064663] focus:ring-0 focus:outline-none"
                                        placeholder="e.g., shubham@example.com"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-300">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full rounded-md border-2 border-transparent bg-[#041C32] px-4 py-2.5 text-white placeholder-gray-500 transition focus:border-[#ECB365] focus:bg-[#064663] focus:ring-0 focus:outline-none"
                                        placeholder="••••••••"
                                    />
                                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="hover:bg-opacity-90 w-full rounded-md bg-[#ECB365] py-3 text-base font-bold text-[#041C32] shadow-lg shadow-[#ECB365]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#ECB365]/30 disabled:opacity-50"
                                >
                                    {processing ? 'Signing In...' : 'Sign In'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="bg-[#041C32] p-4 text-center">
                        <p className="text-sm text-gray-400">
                            Don't have an account?{' '}
                            <Link href={route('register')} className="font-semibold text-[#ECB365] hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
