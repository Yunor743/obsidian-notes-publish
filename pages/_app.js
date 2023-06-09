import Head from "next/head";
import "../styles/global.css";
import "../styles/style.css";
import "../styles/prism.css";
import PlausibleProvider from "next-plausible";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Hugo Perinazzo - Methodology</title>
      </Head>
      <PlausibleProvider domain="methodology.perinazzo.com">
        <Component {...pageProps} />
      </PlausibleProvider>
    </>
  );
}
