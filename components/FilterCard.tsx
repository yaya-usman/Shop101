import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/FilterCard.module.css";

const FilterCard = () => {
  const [catChecked, setCatChecked] = useState<string | undefined>();
  const [sortChecked, setSortChecked] = useState<string | undefined>();

  const router = useRouter();

  useEffect(() => {
    if (!router.query.category) {
      setCatChecked("all");
      setSortChecked(router.query.sort?.toString());
      return;
    }
    setCatChecked(router.query.category?.toString().split("'")[0]);
    setSortChecked(router.query.sort?.toString());
  }, [router.query]);

  const inputList = [
    {
      id: "all",
      name: "radio",
      value: "all",
      label: "All",
      href: `/products${router.query.sort ? `?sort=${router.query.sort}` : ``}`,
    },

    {
      id: "men",
      name: "radio",
      value: "men",
      label: "Men's Clothing",
      href: `/products?category=men's clothing${
        router.query.sort ? `&sort=${router.query.sort}` : ``
      }`,
    },
    {
      id: "women",
      name: "radio",
      value: "women",
      label: "Women's clothing",
      href: `/products?category=women's clothing${
        router.query.sort ? `&sort=${router.query.sort}` : ``
      }`,
    },
    {
      id: "jewelery",
      name: "radio",
      value: "jewelery",
      label: "Jewelery",
      href: `/products?category=jewelery${
        router.query.sort ? `&sort=${router.query.sort}` : ``
      }`,
    },
    {
      id: "electronics",
      name: "radio",
      value: "electronics",
      label: "Electronics",
      href: `/products?category=electronics${
        router.query.sort ? `&sort=${router.query.sort}` : ``
      }`,
    },
    {
      id: "price-asc",
      name: "radio2",
      value: "asc",
      label: "Low to High",
      href: `/products?${
        router.query.category === undefined
          ? `sort=asc`
          : `category=${router.query.category}&sort=asc`
      }`,
    },
    {
      id: "price-desc",
      name: "radio2",
      value: "desc",
      label: "High to Low",
      href: `/products?${
        router.query.category === undefined
          ? `sort=desc`
          : `category=${router.query.category}&sort=desc`
      }`,
    },
  ];

  return (
    <div className={styles.left}>
      <div className={styles.topLeft}>
        <h3>Categories</h3>
        <ul className={styles.box}>
          {inputList.slice(0, -2).map((item) => {
            return (
              <Link href={item.href} key={item.id}>
                <li onClick={() => setCatChecked(item.value)}>
                  <input
                    type="radio"
                    id={item.id}
                    name={item.name}
                    className={styles.radio}
                    value={item.value}
                    checked={catChecked === item.value}
                    onChange={() => setCatChecked(item.value)}
                  />

                  <label htmlFor={item.id}>{item.label}</label>
                  <div className={styles.check}></div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className={styles.bottomLeft}>
        <h3>Sort by Price</h3>
        <ul className={styles.box}>
          {inputList.slice(-2).map((item) => {
            return (
              <Link href={item.href} key={item.id}>
                <li onClick={() => setSortChecked(item.value)}>
                  <input
                    type="radio"
                    id={item.id}
                    name={item.name}
                    value={item.value}
                    className={styles.radio}
                    checked={sortChecked === item.value}
                    onChange={() => setSortChecked(item.value)}
                  />

                  <label htmlFor={item.id}>{item.label}</label>
                  <div className={styles.check}></div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FilterCard;
