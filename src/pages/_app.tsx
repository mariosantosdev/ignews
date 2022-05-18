import { Header } from "@components/Header";
import "@styles/global.scss";

import { AppProps } from "next/app";
import { Fragment } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Header />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
