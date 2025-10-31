import { PageProps, User } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import AdminLayout from '../../../Layouts/AdminLayout.js';

const columns: TableColumn<User>[] = [
    {
        name: 'Avatar',
        cell: (row: User) => (
            <div className="py-2">
                {row.profile_picture ? (
                    <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={`/storage/${row.profile_picture}`} // The magic path!
                        alt={row.name}
                    />
                ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#064663] font-bold text-[#ECB365]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>
                )}
            </div>
        ),
        width: '100px',
    },
    {
        name: 'Name',
        selector: (row) => row.name.charAt(0).toUpperCase() + row.name.slice(1),
        sortable: true,
    },
    {
        name: 'Email',
        selector: (row) => row.email,
        sortable: true,
    },
    {
        name: 'Role',
        selector: (row) => row.role.charAt(0).toUpperCase() + row.role.slice(1),
        sortable: true,
    },
    {
        name: 'Actions',
        cell: (row: User) => (
            <div className="flex space-x-2">
                <Link href={`/admin/users/${row.id}/edit`} className="font-semibold text-blue-400 hover:text-blue-600">
                    Edit
                </Link>
                <Link href={`/admin/users/${row.id}`} method="delete" as="button" className="font-semibold text-red-400 hover:text-red-600">
                    Delete
                </Link>
            </div>
        ),
        button: true,
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
    // We also need a style for the select dropdown arrow
    select: {
        style: {
            color: '#FFFFFF',
        },
    },
};

export default function Index() {
    const { users } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Users" />

            {/* Header */}
            <div className="mb-10 flex flex-col items-center justify-between sm:flex-row">
                <h1 className="text-4xl font-extrabold tracking-wide">👥 All Users</h1>
                <Link
                    href={'/admin/users/create'}
                    className="mt-4 rounded-xl bg-[#ECB365] px-6 py-3 font-semibold text-[#041C32] shadow-md transition-all hover:bg-[#d6a84e] sm:mt-0"
                >
                    + Add New User
                </Link>
            </div>

            {/* Table */}
            <div className="rounded-md border border-[#064663]/50 bg-[#04293A] shadow-xl backdrop-blur-sm">
                <DataTable columns={columns} data={users} pagination highlightOnHover customStyles={customStyles} />
            </div>
        </>
    );
}

Index.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
