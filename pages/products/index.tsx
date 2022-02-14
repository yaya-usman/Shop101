import { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import styles from "../../styles/Products.module.css";


const Products: NextPage = () => {
    const [checked, setChecked] = useState("all");
    const [sortChecked, setSortChecked] = useState("");

    const router = useRouter()


    const inputList = [
        {
            id: "all",
            name: "radio",
            value: "all",
            label: "All",
            href: '/products'
        },
        {
            id: "men",
            name: "radio",
            value: "men",
            label: "Men's Clothing",
            href: `/products?category=men's clothing`
        },
        {
            id: "women",
            name: "radio",
            value: "women",
            label: "Women's clothing",
            href: `/products?category=women's clothing`

        },
        {
            id: "jewelery",
            name: "radio",
            value: "jewelery",
            label: "Jewelery",
            href: `/products?category=jewelery`

        },
        {
            id: "electronics",
            name: "radio",
            value: "electronics",
            label: "Electronics",
            href: `/products?category=electronics`
        },
        {
            id: "price-asc",
            name: "radio2",
            value: "price-asc",
            label: "Low to High",
            href: `/products?category=${router.query && router.query.category}&sort=asc`

        },
        {
            id: "price-desc",
            name: "radio2",
            value: "price-desc",
            label: "High to Low",
            href: `/products?category=${router.query && router.query.category}&sort=desc`

        },
    ]


    return (
        <div className={styles.productsContainer}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <div className={styles.topLeft}>
                        <h3>Categories</h3>
                        <ul className={styles.box}>
                            {inputList.slice(0, -2).map((item) => {
                                return (
                                    <Link href={item.href} key={item.id}>
                                        <li onClick={() => setChecked(item.value)}>
                                            <input
                                                type="radio"
                                                id={item.id}
                                                name={item.name}
                                                className={styles.radio}
                                                value={item.value}
                                                checked={checked === item.value}
                                                defaultChecked
                                            />

                                            <label htmlFor={item.id} >{item.label}</label>
                                            <div className={styles.check}></div>
                                        </li>
                                    </Link>

                                )
                            })}
                        </ul>

                    </div>
                    <div className={styles.bottomLeft}>
                        <h3>Sort by Price</h3>
                        <ul className={styles.box}>
                            {inputList.slice(-2).map((item) => {
                                return (
                                    <Link href={item.href} key={item.id} >
                                        <li onClick={() => setSortChecked(item.value)}>
                                            <input
                                                type="radio"
                                                id={item.id}
                                                name={item.name}
                                                value={item.value}
                                                className={styles.radio}
                                                checked={sortChecked === item.value}
                                            />

                                            <label htmlFor={item.id} >
                                                {item.label}
                                            </label>
                                            <div className={styles.check}></div>
                                        </li>
                                    </Link>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className={styles.right}>
                    Right
                </div>
            </div>
        </div >
    )
}

export default Products