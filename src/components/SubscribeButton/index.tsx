import { useCallback } from "react";
import { api } from "@services/api";
import { getStripeJS } from "@services/stripeJs";
import { signIn, useSession } from "next-auth/react";

import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { status } = useSession();
  const handleSubscribe = useCallback(async () => {
    if (status !== "authenticated") return signIn("github");

    try {
      const response = await api.post("/stripe/subscribe", { priceId });

      const { sessionId } = response.data;

      const stripeJs = await getStripeJS();
      await stripeJs.redirectToCheckout({ sessionId });
    } catch (error) {
      alert(error.message);
    }
  }, [status, priceId]);

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
