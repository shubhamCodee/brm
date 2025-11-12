import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps, User } from '@/types'; // Use your global User type
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React, { useCallback, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import Select from 'react-select';
import { route } from 'ziggy-js';

// Reusing the same select styles
const selectStyles = {
    control: (base: any) => ({
        ...base,
        backgroundColor: '#041C32',
        borderColor: '#064663',
        '&:hover': { borderColor: '#ECB365' },
        boxShadow: 'none',
    }),
    menu: (base: any) => ({ ...base, backgroundColor: '#04293A' }),
    option: (base: any, { isFocused, isSelected }: any) => ({
        ...base,
        backgroundColor: isSelected ? '#ECB365' : isFocused ? '#064663' : 'transparent',
        color: isSelected ? '#041C32' : '#FFFFFF',
        '&:active': { backgroundColor: '#ECB365' },
    }),
    singleValue: (base: any) => ({ ...base, color: '#FFFFFF' }),
    input: (base: any) => ({ ...base, color: '#FFFFFF' }),
};

export default function Index() {
    const { users } = usePage<PageProps & { users: User[] }>().props;

    const roleOptions = [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
    ];

    // --- STATE MANAGEMENT ---
    const [selectedRows, setSelectedRows] = useState<User[]>([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState<'bulkEdit' | 'bulkDelete' | null>(null);

    // --- HANDLERS ---
    const handleRowSelected = useCallback((state: { selectedRows: User[] }) => {
        setSelectedRows(state.selectedRows);
        setMassUpdateData(
            'ids',
            state.selectedRows.map((curr) => curr.id),
        );
        setMassDeleteData(
            'ids',
            state.selectedRows.map((curr) => curr.id),
        );
    }, []);

    const openModal = (action: 'bulkEdit' | 'bulkDelete') => {
        setModalAction(action);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalAction(null);
    };

    const isMultipleRowsSelected = selectedRows.length >= 1; // Changed to allow action on 1 or more

    // --- FORM HOOKS ---
    const {
        data: massUpdateData,
        setData: setMassUpdateData,
        patch,
        processing: massUpdateProcessing,
        errors: massUpdateErrors,
    } = useForm({
        ids: [] as number[],
        role: 'user',
    });

    const {
        data: massDeleteData,
        setData: setMassDeleteData,
        delete: massDelete,
        processing: massDeleteProcessing,
        errors: massDeleteErrors,
    } = useForm({
        ids: [] as number[],
    });

    const handleMassUpdate = () => {
        patch(route('admin.users.mass-update'), {
            onSuccess: () => {
                closeModal();
                setToggleCleared(!toggleCleared);
                setSelectedRows([]);
            },
            preserveScroll: true,
        });
    };

    const handleMassDelete = () => {
        massDelete(route('admin.users.mass-destroy'), {
            onSuccess: () => {
                closeModal();
                setToggleCleared(!toggleCleared);
                setSelectedRows([]);
            },
            preserveScroll: true,
        });
    };

    // --- DATA TABLE CONFIGURATION ---
    const getInitials = (name: string): string => {
        const names = name.split(' ');
        const initials = names.map((n) => n[0]).join('');
        return initials.slice(0, 2).toUpperCase();
    };

    const columns: TableColumn<User>[] = [
        {
            name: 'Avatar',
            cell: (row) => (
                <div className="py-2">
                    <img className="h-10 w-10 rounded-full object-cover" src={row.profile_picture_url} alt={row.name} />
                </div>
            ),
            width: '100px',
        },
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true,
            cell: (row) => <div className="font-semibold text-white"> {row.name.charAt(0).toUpperCase() + row.name.slice(1)}</div>,
        },
        { name: 'Email', selector: (row) => row.email, sortable: true },
        {
            name: 'Role',
            selector: (row) => row.role,
            sortable: true,
            cell: (row) => (
                <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs leading-5 font-bold ${row.role === 'admin' ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-400'}`}
                >
                    {row.role.charAt(0).toUpperCase() + row.role.slice(1)}
                </span>
            ),
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex space-x-3">
                    <Link href={route('admin.users.edit', row.id)} className="font-semibold text-blue-400 hover:text-blue-500">
                        Edit
                    </Link>
                    <Link
                        href={route('admin.users.destroy', row.id)}
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
            <Head title="Users" />

            <div className="p-4 sm:p-6 lg:p-8">
                <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <div>
                        <h1 className="text-3xl font-bold text-white">User Management</h1>
                        <p className="mt-1 text-gray-400">Administer all user accounts in the system.</p>
                    </div>
                    <Link
                        href={route('admin.users.create')}
                        className="hover:bg-opacity-90 inline-flex items-center gap-x-2 rounded-md bg-[#ECB365] px-5 py-2.5 text-sm font-bold text-[#041C32] shadow-lg transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Create User
                    </Link>
                </div>

                <div className="mb-4 flex h-16 items-center justify-between rounded-lg border border-[#064663]/50 bg-[#04293A] px-4">
                    <span className="text-sm font-semibold text-white">
                        {selectedRows.length > 0 ? `${selectedRows.length} item(s) selected` : 'Select multiple rows to perform an action'}
                    </span>
                    <div className="flex items-center space-x-3">
                        {isMultipleRowsSelected && (
                            <>
                                <button
                                    onClick={() => openModal('bulkEdit')}
                                    className="rounded-md bg-yellow-500 px-4 py-2 text-sm font-bold text-[#041C32] hover:bg-yellow-600"
                                >
                                    Bulk Change Role
                                </button>
                                <button
                                    onClick={() => openModal('bulkDelete')}
                                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
                                >
                                    Bulk Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="rounded-lg border border-[#064663]/50 bg-[#04293A] shadow-xl">
                    <DataTable
                        selectableRows
                        clearSelectedRows={toggleCleared}
                        onSelectedRowsChange={handleRowSelected}
                        columns={columns}
                        data={users}
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
                        {modalAction === 'bulkEdit' && (
                            <>
                                <h3 className="text-lg font-bold text-[#ECB365]">Bulk Role Update</h3>
                                <p className="mt-2 text-gray-400">Update role for {selectedRows.length} selected users.</p>
                                <div className="mt-4">
                                    <Select
                                        options={roleOptions}
                                        styles={selectStyles}
                                        onChange={(option) => setMassUpdateData('role', option?.value || 'user')}
                                        defaultValue={roleOptions.find((o) => o.value === 'user')}
                                    />
                                    {massUpdateErrors.ids && <p className="mt-2 text-sm text-red-500">{massUpdateErrors.ids}</p>}
                                    {massUpdateErrors.role && <p className="mt-2 text-sm text-red-500">{massUpdateErrors.role}</p>}
                                </div>
                                <div className="mt-6 flex justify-end space-x-4">
                                    <button onClick={closeModal} className="text-gray-400 hover:text-white">
                                        Cancel
                                    </button>
                                    <button
                                        disabled={massUpdateProcessing}
                                        onClick={handleMassUpdate}
                                        className="hover:bg-opacity-90 rounded-md bg-[#ECB365] px-5 py-2 text-base font-bold text-[#041C32] shadow-lg disabled:opacity-50"
                                    >
                                        {massUpdateProcessing ? 'Updating...' : 'Update Role'}
                                    </button>
                                </div>
                            </>
                        )}

                        {modalAction === 'bulkDelete' && (
                            <>
                                <h3 className="text-lg font-bold text-red-500">Confirm Bulk Deletion</h3>
                                <p className="mt-2 text-gray-400">
                                    You are about to delete {selectedRows.length} users. This action cannot be undone.
                                </p>
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
