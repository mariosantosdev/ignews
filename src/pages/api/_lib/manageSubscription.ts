import { query as q } from "faunadb";

import { fauna } from "@services/fauna";
import { stripe } from "@services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction: boolean = false
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

  if (createAction) {
    await fauna.query(
      q.Create(q.Collection("subscriptions"), { data: subcriptionData })
    );
  } else {
    await fauna.query(
      q.Replace(
        q.Select(
          "ref",
          q.Get(q.Match(q.Index("subscriptions_by_id"), subscriptionId))
        ),
        { data: subcriptionData }
      )
    );
  }
}
