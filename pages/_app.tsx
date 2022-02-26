import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
import Router from "next/router";
import NProgress from "nprogress";
import React from "react";
import ProductsProvider from "../context/ProductsContext";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  NProgress.configure({ showSpinner: false });
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  return (
    <>
      <ProductsProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProductsProvider>
      <Toaster />
    </>
  );
}

export default MyApp;
