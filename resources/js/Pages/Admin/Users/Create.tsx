import PrimaryButton from '@/Components/Admin/PrimaryButton';
import SelectInput, { SelectOption } from '@/Components/Admin/SelectInput';
import TextInput from '@/Components/Admin/TextInput';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { route } from 'ziggy-js';

export default function Create() {
    const roleOptions: SelectOption[] = [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'user',
        profile_picture: null as File | null,
    });
    const [preview, setPreview] = useState<string | null>(null);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/users');
    }

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

    return (
        <>
            <Head title="Create User" />
            <div className="flex min-h-screen w-full items-center justify-center bg-[#041C32] p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-[#04293A] shadow-2xl shadow-[#064663]/30">
                    <div className="p-8 sm:p-10">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Create New User</h1>
                            <p className="mt-2 text-base text-gray-400">Add a new member to the system</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                    Upload Picture
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
                                <TextInput
                                    label="Name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    error={errors.name}
                                    placeholder="e.g., Shubham Mohapatra"
                                />

                                <TextInput
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    error={errors.email}
                                    placeholder="e.g., shubham@example.com"
                                />

                                <TextInput
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    error={errors.password}
                                    placeholder="••••••••"
                                />

                                <SelectInput
                                    label="Role"
                                    name="role"
                                    options={roleOptions}
                                    value={roleOptions.find((option) => option.value === data.role)}
                                    onChange={(option) => setData('role', (option as SelectOption)?.value as string)}
                                />
                            </div>

                            <div className="pt-4 flex justify-center">
                                <PrimaryButton type="submit" disabled={processing} >
                                    {processing ? 'Creating...' : 'Create User'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                    <div className="bg-[#041C32] p-4 text-center">
                        <Link href={route('admin.users.index')} className="text-sm text-gray-400 hover:text-[#ECB365] hover:underline">
                            Back to Users List
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

Create.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
