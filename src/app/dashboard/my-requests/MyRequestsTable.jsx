'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button, Chip, ListBox, Pagination, Select, Table } from '@heroui/react';
import { format } from 'date-fns';
import { Eye, Edit2, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { deleteRequest } from '@/app/lib/actions/deleteRequest';
import DeleteConfirmModal from '@/components/dashboard/DeleteConfirmModal';
import { updateRequestStatus } from '@/app/lib/actions/updateRequestStatus';
import EditRequestModal from '@/components/dashboard/EditRequestModal';

const STATUS_FILTERS = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in progress' },
    { label: 'Done', value: 'done' },
    { label: 'Canceled', value: 'canceled' },
];

const ROWS_PER_PAGE = 8;

export default function MyRequestsTable({ requests: initialRequests = [] }) {
    const [requests, setRequests] = useState(initialRequests);
    const [statusFilter, setStatusFilter] = useState('all');
    const [updatingId, setUpdatingId] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setRequests(initialRequests);
    }, [initialRequests]);

    const filteredRequests = useMemo(() => {
        if (statusFilter === 'all') return requests;
        return requests.filter((req) => req.status === statusFilter);
    }, [requests, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredRequests.length / ROWS_PER_PAGE));

    const paginated = useMemo(() => {
        const start = (page - 1) * ROWS_PER_PAGE;
        return filteredRequests.slice(start, start + ROWS_PER_PAGE);
    }, [filteredRequests, page]);

    const handleFilterChange = (value) => {
        setStatusFilter(value);
        setPage(1);
    };

    const handleDelete = async (id) => {
        const result = await deleteRequest(id);
        if (result?.error) {
            toast.error(result.error);
        } else if (result?.success) {
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

    const start = (page - 1) * ROWS_PER_PAGE + 1;
    const end = Math.min(page * ROWS_PER_PAGE, filteredRequests.length);

    return (
        <div>
            {/* Filter chips */}
            <div className="flex items-center gap-2 mb-5 flex-wrap">
                {STATUS_FILTERS.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => handleFilterChange(f.value)}
                        className={`font-mono text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-sm border transition-colors ${statusFilter === f.value
                            ? 'bg-[#E63946] border-[#E63946] text-white'
                            : 'border-[#262B32] text-[#5B6270] hover:border-[#5B6270] hover:text-[#8B93A1]'
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
                <span className="ml-auto font-mono text-[11px] text-[#5B6270]">
                    {filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''}
                </span>
            </div>

            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="My Donation Requests" className="min-w-[900px]">
                        <Table.Header>
                            <Table.Column isRowHeader>#</Table.Column>
                            <Table.Column>Recipient</Table.Column>
                            <Table.Column>Location</Table.Column>
                            <Table.Column>Hospital</Table.Column>
                            <Table.Column>Date & Time</Table.Column>
                            <Table.Column>Blood</Table.Column>
                            <Table.Column>Status</Table.Column>
                            <Table.Column>Actions</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {paginated.length > 0 ? (
                                paginated.map((req, index) => (
                                    <Table.Row key={req._id || index}>
                                        <Table.Cell className="text-[#5B6270] font-mono text-xs">
                                            {(page - 1) * ROWS_PER_PAGE + index + 1}
                                        </Table.Cell>

                                        <Table.Cell className="text-[#E8E6E3] font-medium text-sm">
                                            {req.name}
                                        </Table.Cell>

                                        <Table.Cell className="text-[#8B93A1] text-sm">
                                            {req.district}, {req.upazila}
                                        </Table.Cell>

                                        <Table.Cell>
                                            <p className="text-[#E8E6E3] text-sm font-medium">{req.hospitalName}</p>
                                            {req.hospitalAddress && (
                                                <p className="text-[#5B6270] text-xs line-clamp-1">{req.hospitalAddress}</p>
                                            )}
                                        </Table.Cell>

                                        <Table.Cell>
                                            <p className="text-[#E8E6E3] text-sm">
                                                {format(new Date(req.date), 'dd MMM yyyy')}
                                            </p>
                                            <p className="text-[#5B6270] text-xs">{req.time}</p>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <Chip
                                                color="danger"
                                                variant="soft"
                                                className="font-bold rounded-sm font-mono text-[11px]"
                                            >
                                                {req.bloodGroup.toUpperCase()}
                                            </Chip>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <Chip
                                                className="rounded-sm font-mono text-[10px] uppercase"
                                                color={
                                                    req.status === 'pending' ? 'warning' :
                                                        req.status === 'in progress' ? 'info' :
                                                            req.status === 'done' ? 'success' : 'error'
                                                }
                                                variant="soft"
                                            >
                                                {req.status}
                                            </Chip>
                                            {req.status === 'in progress' && (
                                                <>
                                                    <p className="text-[#5B6270] text-xs mt-0.5">by {req.donorName}</p>
                                                    <p className="text-[#5B6270] text-xs line-clamp-1">{req.donorEmail}</p>
                                                </>
                                            )}
                                        </Table.Cell>

                                        <Table.Cell>
                                            <div className="flex items-center gap-0.5">
                                                <Button
                                                    size="sm"
                                                    variant="light"
                                                    isIconOnly
                                                    aria-label="View details"
                                                    className="text-[#5B6270] hover:text-sky-400"
                                                    onClick={() => window.location.href = `/donation-requests/${req._id}`}
                                                >
                                                    <Eye size={16} />
                                                </Button>

                                                {req.status === 'pending' && (
                                                    <EditRequestModal
                                                        request={req}
                                                        onUpdated={(updatedReq) =>
                                                            setRequests((prev) =>
                                                                prev.map((r) => (r._id === updatedReq._id ? updatedReq : r))
                                                            )
                                                        }
                                                    />
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
                                                            isDisabled={updatingId === req._id}
                                                            className="text-[11px] font-mono uppercase text-emerald-400 border border-emerald-400/30 hover:bg-emerald-400/10 rounded-sm px-2"
                                                            onClick={() => handleStatusUpdate(req._id, 'done')}
                                                        >
                                                            <CheckCircle size={13} />
                                                            Done
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="light"
                                                            isDisabled={updatingId === req._id}
                                                            className="text-[11px] font-mono uppercase text-[#E63946] border border-[#E63946]/30 hover:bg-[#E63946]/10 rounded-sm px-2"
                                                            onClick={() => handleStatusUpdate(req._id, 'canceled')}
                                                        >
                                                            <XCircle size={13} />
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
                                    <Table.Cell colSpan={8} className="text-center py-16 text-[#5B6270] font-mono text-xs uppercase tracking-wider">
                                        {requests.length === 0
                                            ? "You haven't made any donation requests yet."
                                            : `No ${statusFilter === 'all' ? '' : STATUS_FILTERS.find((f) => f.value === statusFilter)?.label.toLowerCase()} requests found.`}
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>

                {totalPages > 1 && (
                    <Table.Footer>
                        <Pagination size="sm">
                            <Pagination.Summary className="font-mono text-[11px] text-[#5B6270]">
                                {start}–{end} of {filteredRequests.length}
                            </Pagination.Summary>
                            <Pagination.Content>
                                <Pagination.Item>
                                    <Pagination.Previous
                                        isDisabled={page === 1}
                                        onPress={() => setPage((p) => Math.max(1, p - 1))}
                                    >
                                        <Pagination.PreviousIcon />
                                        Prev
                                    </Pagination.Previous>
                                </Pagination.Item>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <Pagination.Item key={p}>
                                        <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                                            {p}
                                        </Pagination.Link>
                                    </Pagination.Item>
                                ))}
                                <Pagination.Item>
                                    <Pagination.Next
                                        isDisabled={page === totalPages}
                                        onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    >
                                        Next
                                        <Pagination.NextIcon />
                                    </Pagination.Next>
                                </Pagination.Item>
                            </Pagination.Content>
                        </Pagination>
                    </Table.Footer>
                )}
            </Table>
        </div>
    );
}