import { Fragment } from "react";
import Head from "next/head";
import Image from "next/image";

import styles from "@styles/home.module.scss";
import { SubscribeButton } from "@components/SubscribeButton";
import { GetStaticProps } from "next";
import { stripe } from "@services/stripe";

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <Fragment>
      <Head>
        <title>Ig.news - Inicio</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Olá, bem vindo!</span>
          <h1>
            Notícias sobre <br />o mundo <span>React</span>
          </h1>
          <p>
            Tenha acesso a todas as publicações <br />
            <span>por apenas {product?.amount} mensais.</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <Image
          src="/images/avatar.svg"
          alt="Garota programando"
          width={336}
          height={521}
        />
      </main>
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1L0fVNBkb8DvbWYIDzd1yVxQ");

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(price.unit_amount / 100),
  };

  return {
    props: { product },
    revalidate: 60 * 60 * 60, // 24 horas
  };
};
