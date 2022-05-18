import { query as q } from "faunadb";

import { fauna } from "@services/fauna";
import { stripe } from "@services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string
) {
  const userRef = await fauna.query(
    q.Select("ref", q.Get(q.Match(q.Index("index_by_customer_id"), customerId)))
  );

  const subcription = await stripe.subscriptions.retrieve(subscriptionId);

  const subcriptionData = {
    id: subcription.id,
    userId: userRef,
    status: subcription.status,
    priceId: subcription.items.data[0].price.id,
  };

  await fauna.query(
    q.Create(q.Collection("subscriptions"), { data: subcriptionData })
  );
}
