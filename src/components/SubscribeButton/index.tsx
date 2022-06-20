import { useCallback } from "react";
import { api } from "@services/api";
import { getStripeJS } from "@services/stripeJs";
import { signIn, getSession, useSession } from "next-auth/react";

import styles from "./styles.module.scss";
import { useRouter } from "next/router";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubscribe = useCallback(async () => {
    if (!session) return signIn("github");

    if (session.activeSubscription) {
      router.push("/posts");
      return;
    }

    try {
      const response = await api.post("/stripe/subscribe", { priceId });

      const { sessionId } = response.data;

      const stripeJs = await getStripeJS();
      await stripeJs.redirectToCheckout({ sessionId });
    } catch (error) {
      alert(error.message);
    }
  }, [priceId, session, router]);

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Assinar Agora
    </button>
  );
}
