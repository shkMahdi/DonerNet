import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    const { amount } = await req.json();

    if (!amount || amount < 100) {
        return Response.json({ error: 'Minimum donation is $1' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        automatic_payment_methods: { enabled: true },
    });

    return Response.json({ clientSecret: paymentIntent.client_secret });
}