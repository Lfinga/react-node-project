import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const getCheckoutSession = async (request, response) => {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    success_url: `${HOST}?success=true`,
    cancel_url: `${HOST}?canceled=true`,
    customer_email: request.user.courriel,
    client_reference_id: req.params.orderId,
    line_items: [
      {
        price: 50 * 100,
        currency: 'cad',
        quantity: 1,
      },
    ],
  });
  response.redirect(303, session.url);
};
