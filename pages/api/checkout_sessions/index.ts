import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// async function CreateStripeSession(req: NextApiRequest, res: NextApiResponse) {
//   const { products } = req.body;

  
//   const redirectURL =
//     process.env.NODE_ENV === 'development'
//       ? 'http://localhost:3000'
//       : 'https://stripe-checkout-next-js-demo.vercel.app';

//   const transformedItem = {
//     price_data: {
//       currency: 'usd',
//       product_data: {
//         images: [item.image],
//         name: item.name,
//       },
//       unit_amount: item.price * 100,
//     },
//     description: item.description,
//     quantity: item.quantity,
//   };

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [transformedItem],
//     mode: 'payment',
//     success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
//     cancel_url: `${req.headers.origin}/cart`,
//     metadata: {
//       images: item.image,
//     },
//   });

//   res.json({ id: session.id });
// }

// export default CreateStripeSession;




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: req.body.products ?? [],
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
      });

      res.status(200).json(session);
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}