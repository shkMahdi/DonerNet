'use client';

import { useMemo, useState } from 'react';
import { Button, Chip, Dropdown, Pagination, Table } from '@heroui/react';
import { EllipsisVertical } from '@gravity-ui/icons';
import toast from 'react-hot-toast';
import { authClient } from '@/app/lib/auth-client';

const ROWS_PER_PAGE = 8;

const STATUS_FILTERS = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Blocked', value: 'blocked' },
];

export default function AllUserTable({ AllUsers: initialUsers = [] }) {
    const [users, setUsers] = useState(initialUsers);
    const [statusFilter, setStatusFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [loadingId, setLoadingId] = useState(null);

    const filtered = useMemo(() => {
        if (statusFilter === 'all') return users;
        return users.filter((u) => u.status === statusFilter);
    }, [users, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
    const paginated = useMemo(() => {
        const start = (page - 1) * ROWS_PER_PAGE;
        return filtered.slice(start, start + ROWS_PER_PAGE);
    }, [filtered, page]);

    const handleFilterChange = (value) => {
        setStatusFilter(value);
        setPage(1);
    };

    const updateUser = async (id, body) => {
        setLoadingId(id);
        try {
            const { data: token } = await authClient.token();

            if (!token) {
                return { error: 'No token found' };
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token?.token}`,
                },
                body: JSON.stringify(body),
            });
            if (!res.ok) throw new Error('Update failed');
            setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, ...body } : u)));
            toast.success('User updated successfully');
        } catch {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setLoadingId(null);
        }
    };

    const handleRoleAction = (userId, currentRole, key) => {
        if (key === 'make-admin' && currentRole !== 'admin') {
            updateUser(userId, { role: 'admin' });
        } else if (key === 'make-volunteer' && currentRole !== 'volunteer') {
            updateUser(userId, { role: 'volunteer' });
        }
    };

    const start = (page - 1) * ROWS_PER_PAGE + 1;
    const end = Math.min(page * ROWS_PER_PAGE, filtered.length);

    return (
        <div>
            {/* Filter chips */}
            <div className="flex items-center gap-2 mb-5">
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
                    {filtered.length} user{filtered.length !== 1 ? 's' : ''}
                </span>
            </div>

            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="All Users" className="min-w-[800px]">
                        <Table.Header>
                            <Table.Column isRowHeader>#</Table.Column>
                            <Table.Column>User</Table.Column>
                            <Table.Column>Email</Table.Column>
                            <Table.Column>Role</Table.Column>
                            <Table.Column>Status</Table.Column>
                            <Table.Column>Block</Table.Column>
                            <Table.Column>More</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {paginated.length > 0 ? (
                                paginated.map((user, index) => (
                                    <Table.Row key={user._id}>
                                        <Table.Cell className="text-[#5B6270] font-mono text-xs">
                                            {(page - 1) * ROWS_PER_PAGE + index + 1}
                                        </Table.Cell>

                                        {/* Avatar + Name */}
                                        <Table.Cell>
                                            <div className="flex items-center gap-3">
                                                {user.avatar ? (
                                                    <img
                                                        src={user.avatar}
                                                        alt={user.name}
                                                        className="w-8 h-8 rounded-full object-cover border border-[#1D2127]"
                                                    />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-[#1D2127] border border-[#262B32] flex items-center justify-center font-mono text-xs text-[#5B6270]">
                                                        {user.name?.[0]?.toUpperCase() ?? '?'}
                                                    </div>
                                                )}
                                                <span className="text-[#E8E6E3] text-sm font-medium">
                                                    {user.name}
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell className="text-[#8B93A1] text-sm">
                                            {user.email}
                                        </Table.Cell>

                                        {/* Role */}
                                        <Table.Cell>
                                            <Chip
                                                className="rounded-sm text-[10px] font-mono uppercase"
                                                color={
                                                    user.role === 'admin' ? 'danger' :
                                                        user.role === 'volunteer' ? 'info' : 'default'
                                                }
                                                variant="soft"
                                            >
                                                {user.role}
                                            </Chip>
                                        </Table.Cell>

                                        {/* Status */}
                                        <Table.Cell>
                                            <Chip
                                                className="rounded-sm text-[10px] font-mono uppercase"
                                                color={user.status === 'active' ? 'success' : 'error'}
                                                variant="soft"
                                            >
                                                {user.status}
                                            </Chip>
                                        </Table.Cell>

                                        {/* Block / Unblock */}
                                        <Table.Cell>
                                            {user.status === 'active' ? (
                                                <Button
                                                    size="sm"
                                                    variant="light"
                                                    isLoading={loadingId === user._id}
                                                    isDisabled={loadingId === user._id || user.role === "admin"}
                                                    className="text-[11px] font-mono uppercase text-[#E63946] border border-[#E63946]/30 hover:bg-[#E63946]/10 rounded-sm px-2.5"
                                                    onClick={() => updateUser(user._id, { status: 'blocked' })}
                                                >
                                                    Block
                                                </Button>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    variant="light"
                                                    isLoading={loadingId === user._id}
                                                    isDisabled={loadingId === user._id}
                                                    className="text-[11px] font-mono uppercase text-emerald-400 border border-emerald-400/30 hover:bg-emerald-400/10 rounded-sm px-2.5"
                                                    onClick={() => updateUser(user._id, { status: 'active' })}
                                                >
                                                    Unblock
                                                </Button>
                                            )}
                                        </Table.Cell>

                                        {/* Three-dot role dropdown */}
                                        <Table.Cell>
                                            <Dropdown>
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    aria-label="More options"
                                                    isLoading={loadingId === user._id}
                                                    className="text-[#5B6270] hover:text-[#E8E6E3]"
                                                >
                                                    <EllipsisVertical className="size-4" />
                                                </Button>
                                                <Dropdown.Popover>
                                                    <Dropdown.Menu
                                                        aria-label="Role actions"
                                                        onAction={(key) => handleRoleAction(user._id, user.role, key)}
                                                    >
                                                        <Dropdown.Item
                                                            id="make-volunteer"
                                                            isDisabled={user.role === 'volunteer' || user.role === 'admin'}
                                                        >
                                                            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-sky-400">
                                                                Make Volunteer
                                                            </div>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            id="make-admin"
                                                            isDisabled={user.role === 'admin'}
                                                        >
                                                            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-amber-400">
                                                                Make Admin
                                                            </div>
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown.Popover>
                                            </Dropdown>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ) : (
                                <Table.Row>
                                    <Table.Cell colSpan={7} className="text-center py-16 text-[#5B6270] font-mono text-xs uppercase tracking-wider">
                                        No {statusFilter === 'all' ? '' : statusFilter} users found.
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
                                {start}–{end} of {filtered.length}
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