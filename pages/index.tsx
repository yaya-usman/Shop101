import type { NextPage } from "next";
import Head from "next/head";
import Script from "next/script";
import Featured from "../components/Featured";
import Category from "../components/Category";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Shop101.</title>
        <meta name="description" content="Ecommerce Next website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <Category />
    </div>
  );
};

export default Home;
