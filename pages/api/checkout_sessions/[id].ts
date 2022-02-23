import { NextApiRequest, NextApiResponse } from 'next';
import { stringify } from 'querystring';
import Stripe from 'stripe';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;
 

  try {
    const checkout_session = await stripe.checkout.sessions.retrieve(id);
    res.status(200).json(checkout_session);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}