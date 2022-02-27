import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FilterCard from "../../components/FilterCard";
import styles from "../../styles/Products.module.css";
import { IProducts } from "../../types";
import ProductCard from "../../components/ProductCard";
import { CircularProgress } from "@mui/material";
import { faArrowUp, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWindowScroll } from "react-use";
import SideBar from "../../components/SideBar";

const Products: NextPage<{ products: IProducts[] }> = ({ products }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { y: pageYOffset } = useWindowScroll();
  const [visibility, setVisibility] = useState(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  useEffect(() => {
    if (pageYOffset > 600) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  }, [pageYOffset]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterClick = () => {
    setIsActive(true);
    setShowFilter(true);
  };
  return (
    <div className={styles.cover}>
      {showFilter && (
        <SideBar setShowFilter={setShowFilter} showFilter={showFilter} />
      )}
      <div className={styles.productsContainer}>
        <div className={styles.wrapper}>
          {!showFilter &&
            <FilterCard /> }
          <div className={styles.filterCan} onClick={handleFilterClick}>
            <FontAwesomeIcon icon={faFilter} size="2x" />
            <span>FILTER</span>
          </div>
          <div className={styles.right}>
            {loading ? (
              <CircularProgress color="secondary" className={styles.progress} />
            ) : (
              <>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </>
            )}
          </div>
          {visibility && (
            <div className={styles.fixedScroll} onClick={scrollToTop}>
              <FontAwesomeIcon icon={faArrowUp} size="2x" />
            </div>
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
