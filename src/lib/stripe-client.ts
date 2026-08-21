import { loadStripe, Stripe } from "@stripe/stripe-js";

let _stripePromise: Promise<Stripe | null> | null = null;

export function getStripeClient(): Promise<Stripe | null> {
  if (!_stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    _stripePromise = key ? loadStripe(key) : Promise.resolve(null);
  }
  return _stripePromise;
}
