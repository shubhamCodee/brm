import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { route } from 'ziggy-js';

interface Organization {
    id: number;
    name: string;
}

interface Contact {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    organization: Organization;
}

export default function Index() {
    const { contacts } = usePage<PageProps & { contacts: Contact[] }>().props;

    const columns: TableColumn<Contact>[] = [
        {
            name: 'Name',
            selector: (row) => `${row.first_name} ${row.last_name}`,
            sortable: true,
            cell: (
                row: Contact, // Use cell to render a link
            ) => (
                <Link href={route('admin.contacts.show', row.id)} className="font-semibold text-white hover:text-[#ECB365] hover:underline">
                    {`${row.first_name} ${row.last_name}`}
                </Link>
            ),
        },
        {
            name: 'Organization',
            selector: (row) => row.organization.name,
            sortable: true,
            cell: (row) => (
                <Link href={route('admin.organizations.show', row.organization.id)} className="text-gray-400 hover:text-[#ECB365] hover:underline">
                    {row.organization.name}
                </Link>
            ),
        },
        {
            name: 'Email',
            selector: (row) => row.email,
        },
        {
            name: 'Phone',
            selector: (row) => row.phone,
        },
        {
            name: 'Actions',
            cell: (row: Contact) => (
                <div className="flex space-x-2">
                    <Link href={route('admin.contacts.edit', row.id)} className="font-semibold text-blue-400 hover:text-blue-600">
                        Edit
                    </Link>
                    <Link
                        href={route('admin.contacts.destroy', row.id)}
                        method="delete"
                        as="button"
                        className="font-semibold text-red-400 hover:text-red-600"
                    >
                        Delete
                    </Link>
                </div>
            ),
        },
    ];

    const customStyles = {
        header: {
            style: {
                backgroundColor: '#041C32',
                color: '#ECB365',
                fontSize: '18px',
                fontWeight: 'bold',
            },
        },
        headRow: {
            style: {
                backgroundColor: '#064663',
                borderBottomColor: '#ECB365',
            },
        },
        headCells: {
            style: {
                color: '#ECB365',
                fontSize: '14px',
                fontWeight: 'bold',
            },
        },
        rows: {
            style: {
                backgroundColor: '#04293A',
                color: '#FFFFFF',
                '&:not(:last-of-type)': {
                    borderBottomColor: '#064663',
                },
            },
            highlightOnHoverStyle: {
                backgroundColor: '#064663',
                color: '#ECB365',
            },
        },
        pagination: {
            style: {
                backgroundColor: '#041C32',
                color: '#ECB365',
                borderTop: '1px solid #064663',
                fontSize: '14px',
                fontWeight: 'bold',
                minHeight: '56px',
            },
            pageButtonsStyle: {
                borderRadius: '50%',
                height: '40px',
                width: '40px',
                padding: '8px',
                margin: 'px',
                cursor: 'pointer',
                transition: '0.4s',
                color: '#FFFFFF',
                fill: '#FFFFFF',
                backgroundColor: 'transparent',
                '&:disabled': {
                    cursor: 'unset',
                    color: '#4A5568',
                    fill: '#4A5568',
                },
                '&:hover:not(:disabled)': {
                    backgroundColor: '#064663',
                },
                '&:focus': {
                    outline: 'none',
                },
            },
        },

        icon: {
            style: {
                '&:hover': {
                    opacity: 0.5,
                },
            },
        },
        select: {
            style: {
                color: '#FFFFFF',
            },
        },
    };

    return (
        <>
            <Head title="Contacts" />
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Contacts</h1>
                        <p className="mt-2 text-gray-400">A list of all the contacts in your database.</p>
                    </div>
                    <Link
                        href={route('admin.contacts.create')}
                        className="hover:bg-opacity-90 inline-flex items-center gap-x-2 rounded-md bg-[#ECB365] px-5 py-2.5 text-sm font-bold text-[#041C32] shadow-lg shadow-[#ECB365]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#ECB365]/30"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Create Contact
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg border border-[#064663] bg-[#04293A]">
                    <DataTable columns={columns} data={contacts} pagination highlightOnHover customStyles={customStyles} />
                </div>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
