import { Head, Link, useForm } from '@inertiajs/react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { route } from 'ziggy-js';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        profile_picture: null as File | null,
    });

    const [preview, setPreview] = useState<string | null>(null);

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('profile_picture', file);
        }
    }

    useEffect(() => {
        if (data.profile_picture) {
            const previewUrl = URL.createObjectURL(data.profile_picture);
            setPreview(previewUrl);
            return () => {
                URL.revokeObjectURL(previewUrl);
            };
        } else {
            setPreview(null);
        }
    }, [data.profile_picture]);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        post(route('register'));
    }

    return (
        <>
            <Head title="Create Account" />
            <div className="flex min-h-screen w-full items-center justify-center bg-[#041C32] p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-[#04293A] shadow-2xl shadow-[#064663]/30">
                    <div className="p-8 sm:p-10">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Create an Account</h1>
                            <p className="mt-2 text-base text-gray-400">Join our platform today!</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Profile Picture Uploader */}
                            <div className="text-center">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Profile Preview"
                                        className="mx-auto h-28 w-28 rounded-full object-cover ring-4 ring-[#064663]"
                                    />
                                ) : (
                                    <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#041C32] ring-4 ring-[#064663]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-12 w-12 text-gray-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                                <label
                                    htmlFor="profile_picture"
                                    className="hover:bg-opacity-80 mt-4 inline-block cursor-pointer rounded-md bg-[#064663] px-5 py-2 text-sm font-semibold text-[#ECB365] transition"
                                >
                                    Upload Avatar (Optional)
                                </label>
                                <input
                                    id="profile_picture"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept="image/png, image/jpeg, image/gif"
                                />
                                {errors.profile_picture && <p className="mt-2 text-sm text-red-500">{errors.profile_picture}</p>}
                            </div>

                            <div className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-300">Full Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full rounded-md border-2 border-transparent bg-[#041C32] px-4 py-2.5 text-white placeholder-gray-500 transition focus:border-[#ECB365] focus:bg-[#064663] focus:ring-0 focus:outline-none"
                                        placeholder="e.g., Shubham Mohapatra"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-300">Email Address</label>
                                    <input
                                        type="email"
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
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full rounded-md border-2 border-transparent bg-[#041C32] px-4 py-2.5 text-white placeholder-gray-500 transition focus:border-[#ECB365] focus:bg-[#064663] focus:ring-0 focus:outline-none"
                                        placeholder="••••••••"
                                    />
                                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-300">Confirm Password</label>
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="w-full rounded-md border-2 border-transparent bg-[#041C32] px-4 py-2.5 text-white placeholder-gray-500 transition focus:border-[#ECB365] focus:bg-[#064663] focus:ring-0 focus:outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="hover:bg-opacity-90 w-full rounded-md bg-[#ECB365] py-3 text-base font-bold text-[#041C32] shadow-lg shadow-[#ECB365]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#ECB365]/30 disabled:opacity-50"
                                >
                                    {processing ? 'Creating Account...' : 'Sign Up'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="bg-[#041C32] p-4 text-center">
                        <p className="text-sm text-gray-400">
                            Already have an account?{' '}
                            <Link href={route('login')} className="font-semibold text-[#ECB365] hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
