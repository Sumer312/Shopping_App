import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/navbar";
import Product from "@/components/card";
import Footer from "@/components/footer";
import useStore, { themeEnum } from "@/components/store/store";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const theme = useStore((state) => state.theme);
  const [stateTheme, setStateTheme] = useState<string | undefined>(undefined);
  useEffect(() => {
    setStateTheme(theme);
  }, [theme]);
  return (
    <>
      <div data-theme={stateTheme}>
        <Navbar />
      </div>
      <div className={stateTheme === themeEnum.DARK ? "bg-black text-white" : "bg-white text-black"}>
        <Component {...pageProps} />
      </div>
      <div data-theme={stateTheme}>
        <Footer />
      </div>
    </>
  );
}
