'use client';

import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

export default function CheckoutForm({ amount }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setError(null);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/funding/success`,
            },
        });

        // only runs if there's an error — success redirects automatically
        if (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <PaymentElement />

            {error && (
                <p className="text-[#E63946] font-mono text-xs uppercase tracking-wider">{error}</p>
            )}

            <button
                type="submit"
                disabled={!stripe || !elements || loading}
                className="w-full bg-[#E63946] text-white font-semibold text-sm rounded-sm py-3.5 hover:bg-[#d12d3a] transition-colors disabled:opacity-50"
            >
                {loading ? 'Processing...' : `Donate $${amount}`}
            </button>
        </form>
    );
}