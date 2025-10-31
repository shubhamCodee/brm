import AdminLayout from '@/Layouts/AdminLayout'; // Check your path
import { PageProps } from '@/types'; // Assuming global types
import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { route } from 'ziggy-js';

interface Organization {
    id: number;
    name: string;
    phone: string;
    city: string;
    status: string;
}

export default function Index() {
    const { organizations } = usePage<PageProps & { organizations: Organization[] }>().props;

    const columns: TableColumn<Organization>[] = [
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true,
            cell: (
                row: Organization, // Use cell to render a link
            ) => (
                <Link href={route('admin.organizations.show', row.id)} className="font-semibold text-white hover:text-[#ECB365] hover:underline">
                    {row.name}
                </Link>
            ),
        },
        {
            name: 'Phone',
            selector: (row) => row.phone,
        },
        {
            name: 'City',
            selector: (row) => row.city,
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row) => row.status.charAt(0).toUpperCase() + row.status.slice(1),
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row: Organization) => (
                <div className="flex space-x-2">
                    <Link href={route('admin.organizations.edit', row.id)} className="font-semibold text-blue-400 hover:text-blue-600">
                        Edit
                    </Link>
                    <Link
                        href={route('admin.organizations.destroy', row.id)}
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
            <Head title="Organizations" />

            <div className="mb-10 flex flex-col items-center justify-between sm:flex-row">
                <h1 className="text-4xl font-extrabold tracking-wide">Organizations</h1>
                <Link
                    href={'/admin/organizations/create'}
                    className="mt-4 rounded-xl bg-[#ECB365] px-6 py-3 font-semibold text-[#041C32] shadow-md transition-all hover:bg-[#d6a84e] sm:mt-0"
                >
                    + Add New Organization
                </Link>
            </div>

            <div className="rounded-md border border-[#064663]/50 bg-[#04293A] shadow-xl backdrop-blur-sm">
                <DataTable columns={columns} data={organizations} pagination highlightOnHover customStyles={customStyles} />
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
