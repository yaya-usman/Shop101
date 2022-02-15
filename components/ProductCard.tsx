import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../styles/ProductCard.module.css";
import { IProducts } from "../types";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";


const ProductCard: React.FC<{ product: IProducts }> = ({ product }) => {
 

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.imgContainer}>
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.image}
                width="500"
                height="500"
                objectFit="contain"
              />
            </Link>
          </div>

          <div className={styles.body}>
            <h3>{product.title}</h3>
            <div className={styles.price}>
              <span>${product.price}</span>
              <span>
                <FontAwesomeIcon icon={faCartPlus} size="1x" />
              </span>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ProductCard;
