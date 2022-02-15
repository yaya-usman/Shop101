import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FilterCard from "../../components/FilterCard";
import styles from "../../styles/Products.module.css";

const Products: NextPage = () => {
  const router = useRouter();
  return (
    <div className={styles.productsContainer}>
      <div className={styles.wrapper}>
        <FilterCard />
        <div className={styles.right}>Right</div>
      </div>
    </div>
  );
};

export default Products;
