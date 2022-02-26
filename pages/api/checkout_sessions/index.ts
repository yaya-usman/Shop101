import { NextApiRequest, NextApiResponse } from "next";
import { ProductWithQty } from "../../../types";

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { items } = req.body;  

    const transformedItems = items.map((item : ProductWithQty) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            images: [item.image],
            name: item.title,
          },
          unit_amount_decimal: (item.discountedPrice*100).toFixed(0),
        },
        quantity: item.qty,
      }
    })    

  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items:  transformedItems,
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
      });
      res.json({ id: session.id });

    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');


  }

 
}
