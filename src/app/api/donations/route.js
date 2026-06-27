import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET() {
    const paymentIntents = await stripe.paymentIntents.list({
        limit: 100, // max 100 per request
    });

    const donations = paymentIntents.data
        .filter((pi) => pi.status === 'succeeded') // only successful payments
        .map((pi) => ({
            id: pi.id,
            amount: pi.amount / 100, // convert cents to dollars
            currency: pi.currency,
            date: new Date(pi.created * 1000).toISOString(), // stripe uses unix timestamp
            status: pi.status,
        }));

    return Response.json({ donations });
}