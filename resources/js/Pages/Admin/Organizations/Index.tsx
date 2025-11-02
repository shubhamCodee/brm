import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React, { useCallback, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import Select from 'react-select';
import { route } from 'ziggy-js';

interface Organization {
    id: number;
    name: string;
    phone: string;
    city: string;
    status: string;
}

const selectStyles = {
    control: (base: any) => ({
        ...base,
        backgroundColor: '#041C32',
        borderColor: '#064663',
        '&:hover': { borderColor: '#ECB365' },
        boxShadow: 'none',
    }),
    menu: (base: any) => ({
        ...base,
        backgroundColor: '#04293A',
    }),
    option: (base: any, { isFocused, isSelected }: any) => ({
        ...base,
        backgroundColor: isSelected ? '#ECB365' : isFocused ? '#064663' : 'transparent',
        color: isSelected ? '#041C32' : '#FFFFFF',
        '&:active': { backgroundColor: '#ECB365' },
    }),
    multiValue: (base: any) => ({
        ...base,
        backgroundColor: '#064663',
    }),
    multiValueLabel: (base: any) => ({
        ...base,
        color: '#ECB365',
    }),
    singleValue: (base: any) => ({
        ...base,
        color: '#FFFFFF',
    }),
    input: (base: any) => ({
        ...base,
        color: '#FFFFFF',
    }),
};

export default function Index() {
    const statusOptions = [
        { value: 'lead', label: 'Lead' },
        { value: 'active', label: 'Active' },
        { value: 'former', label: 'Former' },
    ];

    const { organizations } = usePage<PageProps & { organizations: Organization[] }>().props;

    const [selectedRows, setSelectedRows] = useState<Organization[]>([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState<'edit' | 'delete' | 'bulkDelete' | 'bulkEdit' | null>(null);

    const handleRowSelected = useCallback((state: { selectedRows: Organization[] }) => {
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

    const openModal = (action: 'bulkDelete' | 'bulkEdit') => {
        setModalAction(action);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalAction(null);
    };

    const isMultipleRowsSelected = selectedRows.length >= 1;

    const {
        data: massUpdateData,
        setData: setMassUpdateData,
        patch,
        processing: massUpdateProcessing,
        errors: massUpdateErrors,
    } = useForm({ ids: [] as number[], status: 'lead' });

    const {
        data: massDeleteData,
        setData: setMassDeleteData,
        delete: massDelete,
        processing: massDeleteProcessing,
        errors: massDeleteErrors,
    } = useForm({ ids: [] as number[] });

    const handleMassUpdate = () => {
        patch(route('admin.organizations.mass-update'), {
            onSuccess: () => {
                closeModal();
                setToggleCleared(!toggleCleared);
                setSelectedRows([]);
            },
            preserveScroll: true,
        });
    };

    const handleMassDelete = () => {
        massDelete(route('admin.organizations.mass-destroy'), {
            onSuccess: () => {
                closeModal();
                setToggleCleared(!toggleCleared);
                setSelectedRows([]);
            },
            preserveScroll: true,
        });
    };

    const columns: TableColumn<Organization>[] = [
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true,
            cell: (row) => (
                <Link href={route('admin.organizations.show', row.id)} className="font-semibold text-white hover:text-[#ECB365] hover:underline">
                    {row.name}
                </Link>
            ),
        },
        { name: 'Phone', selector: (row) => row.phone },
        { name: 'City', selector: (row) => row.city, sortable: true },
        { name: 'Status', selector: (row) => row.status.charAt(0).toUpperCase() + row.status.slice(1), sortable: true },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex space-x-3">
                    <Link href={route('admin.organizations.edit', row.id)} className="font-semibold text-blue-400 hover:text-blue-500">
                        Edit
                    </Link>
                    <Link
                        href={route('admin.organizations.destroy', row.id)}
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
            <Head title="Organizations" />

            <div className="p-4 sm:p-6 lg:p-8">
                <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Organizations</h1>
                        <p className="mt-1 text-gray-400">Browse and manage all company records.</p>
                    </div>
                    <Link
                        href={route('admin.organizations.create')}
                        className="hover:bg-opacity-90 inline-flex items-center gap-x-2 rounded-md bg-[#ECB365] px-5 py-2.5 text-sm font-bold text-[#041C32] shadow-lg transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Create Organization
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
                                    Bulk Edit Status
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
                        data={organizations}
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
                                <h3 className="text-lg font-bold text-[#ECB365]">Bulk Edit Status</h3>
                                <p className="mt-2 text-gray-400">Update status for {selectedRows.length} selected organizations.</p>
                                <div className="mt-4">
                                    <Select
                                        options={statusOptions}
                                        styles={selectStyles}
                                        onChange={(option) => setMassUpdateData('status', option?.value || 'lead')}
                                        defaultValue={statusOptions.find((o) => o.value === 'lead')}
                                    />
                                    {massUpdateErrors.ids && <p className="mt-2 text-sm text-red-500">{massUpdateErrors.ids}</p>}
                                    {massUpdateErrors.status && <p className="mt-2 text-sm text-red-500">{massUpdateErrors.status}</p>}
                                </div>
                                <div className="mt-6 flex justify-end space-x-4">
                                    {massDeleteErrors.ids && <p className="my-2 text-sm text-red-500">{massDeleteErrors.ids}</p>}
                                    <button onClick={closeModal} className="text-gray-400 hover:text-white">
                                        Cancel
                                    </button>
                                    <button
                                        disabled={massUpdateProcessing}
                                        onClick={handleMassUpdate}
                                        className="hover:bg-opacity-90 rounded-md bg-[#ECB365] px-5 py-2 text-base font-bold text-[#041C32] shadow-lg shadow-[#ECB365]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#ECB365]/30 disabled:opacity-50"
                                    >
                                        {massUpdateProcessing ? 'Updating...' : 'Update Status'}
                                    </button>
                                </div>
                            </>
                        )}

                        {modalAction === 'bulkDelete' && (
                            <>
                                <h3 className="text-lg font-bold text-red-500">Confirm Bulk Deletion</h3>
                                <p className="mt-2 text-gray-400">
                                    You are deleting {selectedRows.length} organizations. This action cannot be undone.
                                </p>
                                <div className="mt-6 flex justify-end space-x-4">
                                    <button onClick={closeModal} className="text-gray-400 hover:text-white">
                                        Cancel
                                    </button>
                                    <button
                                        disabled={massDeleteProcessing}
                                        onClick={handleMassDelete}
                                        className="hover:bg-opacity-90 hover:shadow:-red-600/30 rounded-md bg-red-600 px-5 py-2 text-base font-bold text-[#041C32] shadow-lg shadow-red-600/20 transition-all duration-300 hover:shadow-xl disabled:opacity-50"
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
