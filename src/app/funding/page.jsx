'use client';

import { useEffect, useMemo, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { Table, Chip, Pagination } from '@heroui/react';
import { format } from 'date-fns';
import { Heart } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const presets = [5, 10, 25, 50];
const ROWS_PER_PAGE = 8;

export default function FundingPage() {
    const [amount, setAmount] = useState('');
    const [clientSecret, setClientSecret] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [donations, setDonations] = useState([]);
    const [donationsLoading, setDonationsLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch('/api/donations')
            .then((res) => res.json())
            .then(({ donations }) => setDonations(donations || []))
            .finally(() => setDonationsLoading(false));
    }, []);

    const totalPages = Math.max(1, Math.ceil(donations.length / ROWS_PER_PAGE));

    const paginated = useMemo(() => {
        const start = (page - 1) * ROWS_PER_PAGE;
        return donations.slice(start, start + ROWS_PER_PAGE);
    }, [donations, page]);

    const totalRaised = donations.reduce((sum, d) => sum + d.amount, 0);

    const start = (page - 1) * ROWS_PER_PAGE + 1;
    const end = Math.min(page * ROWS_PER_PAGE, donations.length);

    const handleProceed = async () => {
        const parsed = parseFloat(amount);
        if (!parsed || parsed < 1) {
            setError('Please enter a valid amount (minimum $1)');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: Math.round(parsed * 100) }),
            });
            if (!res.ok) throw new Error('Failed to initialize payment');
            const { clientSecret } = await res.json();
            setClientSecret(clientSecret);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#0B0D10] min-h-screen py-16">
            <div className="max-w-5xl mx-auto px-6">

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shadow-[0_0_0_3px_rgba(230,57,70,0.14)]" />
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#E63946]">
                            Support DonorNet
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold uppercase text-[#E8E6E3] mb-2">Fund our mission</h1>
                    <p className="text-[#8B93A1] text-sm max-w-xl">
                        Your contribution keeps DonorNet running and helps us connect more donors with patients in need.
                        Join {donations.length} others who have already contributed.
                    </p>
                </div>

                {/* Two-column layout: form + stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

                    {/* Payment form */}
                    <div className="bg-[#14171C] border border-[#1D2127] rounded-sm p-7">
                        <h2 className="text-lg font-bold text-[#E8E6E3] mb-6">Make a contribution</h2>

                        {!clientSecret ? (
                            <div className="space-y-5">
                                <div className="grid grid-cols-4 gap-2">
                                    {presets.map((preset) => (
                                        <button
                                            key={preset}
                                            onClick={() => setAmount(String(preset))}
                                            className={`font-mono text-sm py-2.5 rounded-sm border transition-colors ${amount === String(preset)
                                                ? 'bg-[#E63946] border-[#E63946] text-white'
                                                : 'border-[#262B32] text-[#5B6270] hover:border-[#5B6270] hover:text-[#8B93A1]'
                                                }`}
                                        >
                                            ${preset}
                                        </button>
                                    ))}
                                </div>

                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5B6270] font-mono text-sm">$</span>
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="Custom amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-[#0F1117] border border-[#262B32] rounded-sm pl-8 pr-4 py-3 text-[#E8E6E3] font-mono text-sm placeholder-[#5B6270] focus:outline-none focus:border-[#E63946] transition-colors"
                                    />
                                </div>

                                {error && (
                                    <p className="text-[#E63946] font-mono text-xs uppercase tracking-wider">{error}</p>
                                )}

                                <button
                                    onClick={handleProceed}
                                    disabled={!amount || loading}
                                    className="w-full bg-[#E63946] text-white font-semibold text-sm rounded-sm py-3.5 hover:bg-[#d12d3a] transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Preparing...' : 'Proceed to Payment →'}
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <p className="text-[#8B93A1] text-sm">
                                        Donating <span className="text-[#E8E6E3] font-semibold">${amount}</span>
                                    </p>
                                    <button
                                        onClick={() => setClientSecret(null)}
                                        className="font-mono text-[11px] uppercase tracking-wider text-[#5B6270] hover:text-[#8B93A1] transition-colors"
                                    >
                                        ← Change amount
                                    </button>
                                </div>
                                <Elements stripe={stripePromise} options={{ clientSecret }}>
                                    <CheckoutForm amount={amount} />
                                </Elements>
                            </div>
                        )}
                    </div>

                    {/* Stats panel */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-[#14171C] border border-[#1D2127] rounded-sm p-7 flex-1">
                            <p className="font-mono text-[11px] uppercase tracking-wider text-[#5B6270] mb-2">Total raised</p>
                            <p className="text-4xl font-bold text-[#E8E6E3]">
                                ${totalRaised.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                        </div>
                        <div className="bg-[#14171C] border border-[#1D2127] rounded-sm p-7 flex-1">
                            <p className="font-mono text-[11px] uppercase tracking-wider text-[#5B6270] mb-2">Contributors</p>
                            <p className="text-4xl font-bold text-[#E8E6E3]">{donations.length}</p>
                        </div>
                        <div className="bg-[#14171C] border border-[#1D2127] rounded-sm p-7 flex-1 flex items-center gap-4">
                            <Heart size={28} className="text-[#E63946] flex-shrink-0" fill="#E63946" />
                            <p className="text-sm text-[#8B93A1] leading-relaxed">
                                Every dollar goes toward keeping the platform running and helping patients find donors faster.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Donations table */}
                <div>
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-xl font-bold uppercase text-[#E8E6E3]">Recent contributions</h2>
                            <p className="text-[#5B6270] text-xs font-mono uppercase tracking-wider mt-1">
                                See who is keeping DonorNet alive
                            </p>
                        </div>
                        <span className="font-mono text-[11px] text-[#5B6270]">
                            {donations.length} contribution{donations.length !== 1 ? 's' : ''}
                        </span>
                    </div>

                    <Table>
                        <Table.ScrollContainer>
                            <Table.Content aria-label="Recent contributions" className="min-w-[500px]">
                                <Table.Header>
                                    <Table.Column isRowHeader>#</Table.Column>
                                    <Table.Column>Contributor</Table.Column>
                                    <Table.Column>Amount</Table.Column>
                                    <Table.Column>Date</Table.Column>
                                    <Table.Column>Status</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {donationsLoading ? (
                                        <Table.Row>
                                            <Table.Cell colSpan={5} className="text-center py-16 text-[#5B6270] font-mono text-xs uppercase tracking-wider">
                                                Loading contributions...
                                            </Table.Cell>
                                        </Table.Row>
                                    ) : paginated.length > 0 ? (
                                        paginated.map((donation, index) => (
                                            <Table.Row key={donation.id}>
                                                <Table.Cell className="text-[#5B6270] font-mono text-xs">
                                                    {(page - 1) * ROWS_PER_PAGE + index + 1}
                                                </Table.Cell>

                                                <Table.Cell>
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-7 h-7 rounded-full bg-[#E63946]/10 border border-[#E63946]/20 flex items-center justify-center flex-shrink-0">
                                                            <Heart size={12} className="text-[#E63946]" fill="#E63946" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[#E8E6E3] text-sm font-medium">Anonymous</p>
                                                            <p className="text-[#5B6270] font-mono text-[10px]">
                                                                {donation.id.slice(-8).toUpperCase()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Table.Cell>

                                                <Table.Cell>
                                                    <span className="text-[#E8E6E3] font-semibold font-mono text-sm">
                                                        ${donation.amount.toFixed(2)}
                                                    </span>
                                                    <span className="text-[#5B6270] font-mono text-[10px] ml-1 uppercase">
                                                        {donation.currency}
                                                    </span>
                                                </Table.Cell>

                                                <Table.Cell>
                                                    <p className="text-[#E8E6E3] text-sm">
                                                        {format(new Date(donation.date), 'dd MMM yyyy')}
                                                    </p>
                                                    <p className="text-[#5B6270] text-xs font-mono">
                                                        {format(new Date(donation.date), 'HH:mm')}
                                                    </p>
                                                </Table.Cell>

                                                <Table.Cell>
                                                    <Chip
                                                        color="success"
                                                        variant="soft"
                                                        className="rounded-sm font-mono text-[10px] uppercase"
                                                    >
                                                        {donation.status}
                                                    </Chip>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))
                                    ) : (
                                        <Table.Row>
                                            <Table.Cell colSpan={5} className="text-center py-16 text-[#5B6270] font-mono text-xs uppercase tracking-wider">
                                                No contributions yet — be the first!
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
                                        {start}–{end} of {donations.length}
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
            </div>
        </div>
    );
}
