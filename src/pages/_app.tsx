import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NoSSR from "react-no-ssr";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "500", subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NoSSR>
      <main className={roboto.className}>
        <Component {...pageProps} />
      </main>
      <div id="portal"></div>
    </NoSSR>
  );
}
