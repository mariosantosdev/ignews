import { SignInButton } from "@components/SignInButton";
import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          src="/images/logo.svg"
          alt="Logo ig.news"
          width={110}
          height={31}
        />

        <nav>
          <Link href="/">
            <a className={styles.active}>Home</a>
          </Link>
          <Link href="/posts">
            <a>Postagens</a>
          </Link>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}
