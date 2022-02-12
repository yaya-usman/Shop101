import type { NextPage } from "next";
import Head from "next/head";
import Featured from "../components/Featured";
import Category from "../components/Category";
import styles from "../styles/Home.module.css";
import { GetStaticProps } from "next";
import axios from "axios";
import { IProducts } from "../types";

const Home: NextPage<{products:IProducts[]}> = ({products}) => {
   
  return (
    <div className={styles.container}>
      <Head>
        <title>Shop101.</title>
        <meta name="description" content="Ecommerce Next website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured products ={products} />
      <Category />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get("https://fakestoreapi.com/products");

  const data = await res.data as IProducts[];

  return {
    props: {
      products: data,
    },
  };
};

export default Home;
