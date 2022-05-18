import { fauna } from "@services/fauna";
import { stripe } from "@services/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { query as q } from "faunadb";

type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
};

export default async function Subscribe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getSession({ req });
    const { priceId } = req.body;

    const { email, name } = session.user;

    const user = await fauna.query<User>(
      q.Get(q.Match(q.Index("index_by_email"), q.Casefold(email)))
    );
    let stripeCustomerId = user.data.stripe_customer_id;

    if (!stripeCustomerId) {
      const stripeCustomer = await stripe.customers.create({ email, name });
      stripeCustomerId = stripeCustomer.id;

      await fauna.query(
        q.Update(q.Ref(q.Collection("users"), user.ref.id), {
          data: { stripe_customer_id: stripeCustomerId },
        })
      );
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return res.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
}
