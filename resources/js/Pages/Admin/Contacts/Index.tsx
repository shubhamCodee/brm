import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React, { useCallback, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { route } from 'ziggy-js';

// Define the shape of our data for TypeScript
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

    // --- STATE MANAGEMENT ---
    const [selectedRows, setSelectedRows] = useState<Contact[]>([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState<'bulkDelete' | null>(null);

    // --- FORM HOOKS ---
    const {
        data: massDeleteData,
        setData: setMassDeleteData,
        delete: massDelete,
        processing: massDeleteProcessing,
        errors: massDeleteErrors,
    } = useForm({
        ids: [] as number[],
    });

    // --- HANDLERS ---
    const handleRowSelected = useCallback((state: { selectedRows: Contact[] }) => {
        setSelectedRows(state.selectedRows);
        // Keep the form state in sync, just like in the Users page
        setMassDeleteData(
            'ids',
            state.selectedRows.map((curr) => curr.id),
        );
    }, []);

    const openModal = (action: 'bulkDelete') => {
        setModalAction(action);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalAction(null);
    };

    const handleMassDelete = () => {
        massDelete(route('admin.contacts.mass-destroy'), {
            onSuccess: () => {
                closeModal();
                setToggleCleared(!toggleCleared);
                setSelectedRows([]);
            },
            preserveScroll: true,
        });
    };

    const isMultipleRowsSelected = selectedRows.length >= 1;

    // --- DATA TABLE CONFIGURATION ---
    const columns: TableColumn<Contact>[] = [
        {
            name: 'Name',
            selector: (row) => `${row.first_name} ${row.last_name}`,
            sortable: true,
            cell: (row) => (
                <Link href={route('admin.contacts.show', row.id)} className="font-semibold text-white hover:text-[#ECB365] hover:underline">
                    {`${row.first_name} ${row.last_name}`}
                </Link>
            ),
        },
        {
            name: 'Organization',
            selector: (row) => (row.organization ? row.organization.name : 'N/A'),
            sortable: true,
            cell: (row) =>
                row.organization ? (
                    <Link
                        href={route('admin.organizations.show', row.organization.id)}
                        className="text-gray-400 hover:text-[#ECB365] hover:underline"
                    >
                        {row.organization.name}
                    </Link>
                ) : (
                    <span className="text-gray-500 italic">No Organization</span>
                ),
        },
        { name: 'Email', selector: (row) => row.email },
        { name: 'Phone', selector: (row) => row.phone },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex space-x-3">
                    <Link href={route('admin.contacts.edit', row.id)} className="font-semibold text-blue-400 hover:text-blue-500">
                        Edit
                    </Link>
                    <Link
                        href={route('admin.contacts.destroy', row.id)}
                        method="delete"
                        as="button"
                        className="font-semibold text-red-400 hover:text-red-500"
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
                <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Contacts</h1>
                        <p className="mt-1 text-gray-400">Browse and manage all contact records.</p>
                    </div>
                    <Link
                        href={route('admin.contacts.create')}
                        className="hover:bg-opacity-90 inline-flex items-center gap-x-2 rounded-md bg-[#ECB365] px-5 py-2.5 text-sm font-bold text-[#041C32] shadow-lg transition-all"
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

                <div className="mb-4 flex h-16 items-center justify-between rounded-lg border border-[#064663]/50 bg-[#04293A] px-4">
                    <span className="text-sm font-semibold text-white">
                        {selectedRows.length > 0 ? `${selectedRows.length} item(s) selected` : 'Select multiple rows to perform an action'}
                    </span>
                    <div className="flex items-center space-x-3">
                        {isMultipleRowsSelected && (
                            <button
                                onClick={() => openModal('bulkDelete')}
                                className="rounded-md bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
                            >
                                Bulk Delete
                            </button>
                        )}
                    </div>
                </div>

                <div className="rounded-lg border border-[#064663]/50 bg-[#04293A] shadow-xl">
                    <DataTable
                        selectableRows
                        clearSelectedRows={toggleCleared}
                        onSelectedRowsChange={handleRowSelected}
                        columns={columns}
                        data={contacts}
                        pagination
                        highlightOnHover
                        customStyles={customStyles}
                    />
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#041C32]/80 backdrop-blur-sm" onClick={closeModal}></div>

                    <div className="relative w-full max-w-md transform rounded-2xl border border-[#064663] bg-[#04293A] p-6 shadow-xl">
                        {modalAction === 'bulkDelete' && (
                            <>
                                <h3 className="text-lg font-bold text-red-500">Confirm Bulk Deletion</h3>
                                <p className="mt-2 text-gray-400">
                                    You are about to delete {selectedRows.length} contacts. This action cannot be undone.
                                </p>
                                {massDeleteErrors.ids && <p className="mt-2 text-sm text-red-500">{massDeleteErrors.ids}</p>}
                                <div className="mt-6 flex justify-end space-x-4">
                                    <button onClick={closeModal} className="text-gray-400 hover:text-white">
                                        Cancel
                                    </button>
                                    <button
                                        disabled={massDeleteProcessing}
                                        onClick={handleMassDelete}
                                        className="hover:bg-opacity-90 rounded-md bg-red-600 px-5 py-2 text-base font-bold text-white shadow-lg disabled:opacity-50"
                                    >
                                        {massDeleteProcessing ? 'Deleting...' : 'Delete All'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

Index.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
