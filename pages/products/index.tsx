import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FilterCard from "../../components/FilterCard";
import styles from "../../styles/Products.module.css";
import { IProducts } from "../../types";
import ProductCard from "../../components/ProductCard";
import { CircularProgress, Skeleton } from "@mui/material";


const Products: NextPage<{ products: IProducts[] }> = ({ products }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
      console.log("start");
    };
    const end = () => {
      setLoading(false);
      console.log("end");
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router]);

  return (
    <div className={styles.productsContainer}>
      <div className={styles.wrapper}>
        <FilterCard />
        <div className={styles.right}>
          {loading ? (
            <CircularProgress color="secondary" className={styles.progress}/>
          ) : (
            <>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const category = query.category;
  const sort = query.sort;

  const { data } = await axios.get(
    `https://fakestoreapi.com/products${
      category ? `/category/${category}?sort=${sort}` : `?sort=${sort}`
    }`
  );

  let sortByPrice;

  if (sort === "asc") {
    sortByPrice = data.sort((a: IProducts, b: IProducts) =>
      a.price > b.price ? 1 : -1
    );
  } else {
    sortByPrice = data.sort((a: IProducts, b: IProducts) =>
      a.price < b.price ? 1 : -1
    );
  }

  return {
    props: {
      products: sortByPrice,
    },
  };
};

export default Products;
