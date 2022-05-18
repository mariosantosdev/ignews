import { Fragment } from "react";
import Head from "next/head";
import Image from "next/image";

import styles from "@styles/home.module.scss";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Ig.news - Inicio</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Olá, bem vindo!</span>
          <h1>
            Notícias sobre o mundo <span>React</span>
          </h1>
          <p>
            Tenha acesso a todas as publicações <br />
            <span>por apenas R$9,90 mensais.</span>
          </p>
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
