'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button, Chip, Label, ListBox, Select, Table } from '@heroui/react';
import { format } from 'date-fns';
import { Eye, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { deleteRequest } from '@/app/lib/actions/deleteRequest';
import DeleteConfirmModal from '@/components/dashboard/DeleteConfirmModal';
import { updateRequestStatus } from '@/app/lib/actions/updateRequestStatus';

const STATUS_FILTERS = [
    { label: 'All Requests', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in progress' },
    { label: 'Done', value: 'done' },
    { label: 'Canceled', value: 'canceled' },
];

export default function MyRequestsTable({ requests: initialRequests = [] }) {
    const [requests, setRequests] = useState(initialRequests);
    const [statusFilter, setStatusFilter] = useState('all');
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        setRequests(initialRequests);
    }, [initialRequests]);

    const filteredRequests = useMemo(() => {
        if (statusFilter === 'all') return requests;
        return requests.filter((req) => req.status === statusFilter);
    }, [requests, statusFilter]);

    const handleDelete = async (id) => {
        const result = await deleteRequest(id);
        if (result && result.error) {
            toast.error(result.error);
        } else if (result && result.success) {
            toast.success('Request deleted successfully');
            setRequests((prev) => prev.filter((req) => req._id !== id));
        } else {
            toast.error('Something went wrong. Please try again.');
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        setUpdatingId(id);
        const result = await updateRequestStatus(id, newStatus);

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success(`Request marked as ${newStatus}`);
            setRequests((prev) =>
                prev.map((req) => (req._id === id ? { ...req, status: newStatus } : req))
            );
        }
        setUpdatingId(null);
    };

    return (
        <>
            <div className="mb-6">
                <Select
                    className="w-fit px-4"
                    aria-label="Filter by status"
                    value={statusFilter}
                    onChange={setStatusFilter}
                >
                    <Select.Trigger aria-label="Filter by status">
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                        <ListBox aria-label="Status filter options">
                            {STATUS_FILTERS.map(({ label, value }) => (
                                <ListBox.Item key={value} id={value} textValue={label}>
                                    {label}
                                </ListBox.Item>
                            ))}
                        </ListBox>
                    </Select.Popover>
                </Select>
            </div>

            <Table className="min-w-full">
                <Table.ScrollContainer>
                    <Table.Content aria-label="My Donation Requests">
                        <Table.Header>
                            <Table.Column isRowHeader>#</Table.Column>
                            <Table.Column>Recipient Name</Table.Column>
                            <Table.Column>Location</Table.Column>
                            <Table.Column>Hospital</Table.Column>
                            <Table.Column>Date & Time</Table.Column>
                            <Table.Column>Blood Group</Table.Column>
                            <Table.Column>Status</Table.Column>
                            <Table.Column>Actions</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {filteredRequests.length > 0 ? (
                                filteredRequests.map((req, index) => (
                                    <Table.Row key={req._id || index}>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell className="font-medium">{req.name}</Table.Cell>
                                        <Table.Cell>
                                            {req.district}, {req.upazila}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="text-sm">
                                                <p className="font-medium">{req.hospitalName}</p>
                                                {req.hospitalAddress && (
                                                    <p className="text-gray-500 text-xs line-clamp-1">{req.hospitalAddress}</p>
                                                )}
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <p>{format(new Date(req.date), 'dd MMM yyyy')}</p>
                                            <p className="text-xs text-gray-500 line-clamp-1">{req.time}</p>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Chip color="danger" variant="soft" className="font-bold rounded-sm">
                                                {req.bloodGroup.toUpperCase()}
                                            </Chip>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Chip
                                                className="rounded-sm text-xs"
                                                color={
                                                    req.status === 'pending' ? 'warning' :
                                                        req.status === 'in progress' ? 'info' :
                                                            req.status === 'done' ? 'success' : 'error'
                                                }
                                                variant="soft"
                                            >
                                                {req.status.toUpperCase()}
                                            </Chip>
                                            {req.status === 'in progress' && <p className="text-xs text-gray-500 line-clamp-1">by {req.donorName}</p>}
                                            {req.status === 'in progress' && <p className="text-xs text-gray-500 line-clamp-1">{req.donorEmail}</p>}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="flex items-center">
                                                <Button
                                                    size="sm"
                                                    variant="light"
                                                    isIconOnly
                                                    aria-label="View details"
                                                    className="hover:text-blue-400"
                                                    onClick={() => window.location.href = `/donation-requests/${req._id}`}
                                                >
                                                    <Eye size={18} />
                                                </Button>

                                                {req.status === 'pending' && (
                                                    <Button
                                                        size="sm"
                                                        variant="light"
                                                        isIconOnly
                                                        aria-label="Edit request"
                                                        className="hover:text-blue-400"
                                                        onClick={() => window.location.href = `/dashboard/edit-request/${req._id}`}
                                                    >
                                                        <Edit2 size={18} />
                                                    </Button>
                                                )}

                                                <DeleteConfirmModal
                                                    request={req}
                                                    onDelete={() => handleDelete(req._id)}
                                                />

                                                {req.status === 'in progress' && (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            variant="light"
                                                            disabled={updatingId === req._id}
                                                            className="text-green-500/50 hover:text-green-400 flex items-center gap-1 disabled:opacity-50"
                                                            onClick={() => handleStatusUpdate(req._id, 'done')}
                                                        >
                                                            <CheckCircle size={16} />
                                                            Done
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="light"
                                                            disabled={updatingId === req._id}
                                                            className="text-red-500/50 hover:text-red-400 flex items-center gap-1 disabled:opacity-50"
                                                            onClick={() => handleStatusUpdate(req._id, 'canceled')}
                                                        >
                                                            <XCircle size={16} />
                                                            Cancel
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ) : (
                                <Table.Row>
                                    <Table.Cell colSpan={8} className="text-center py-16 text-gray-400">
                                        {requests.length === 0
                                            ? "You haven't made any donation requests yet."
                                            : `No ${statusFilter === 'all' ? '' : STATUS_FILTERS.find((f) => f.value === statusFilter)?.label.toLowerCase()} requests found.`}
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>

            <div className="flex justify-center mt-10">
                <div className="join">
                    <button className="join-item btn btn-sm">«</button>
                    <button className="join-item btn btn-sm">1</button>
                    <button className="join-item btn btn-sm btn-active">2</button>
                    <button className="join-item btn btn-sm">3</button>
                    <button className="join-item btn btn-sm">»</button>
                </div>
            </div>
        </>
    );
}