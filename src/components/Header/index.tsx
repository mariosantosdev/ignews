import { ActiveLink } from "@components/ActiveLink";
import { SignInButton } from "@components/SignInButton";
import Image from "next/image";

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
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>Postagens</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}
