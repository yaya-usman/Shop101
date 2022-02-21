import Image from "next/image";
import React,{useContext} from "react";
import styles from "../styles/ProductCard.module.css";
import { IProducts } from "../types";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { ProductsContext } from "../context/ProductsContext";


const ProductCard: React.FC<{ product: IProducts }> = ({ product }) => {
  
  const { addProduct } = useContext(ProductsContext);

  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href={`/products/${product.id}`}>
          <div className={styles.imgContainer}>
            <Image
              src={product.image}
              width="500"
              height="500"
              objectFit="contain"
            />
          </div>
        </Link>

        <div className={styles.body}>
          <h3>{product.title}</h3>
          <div className={styles.price}>
            <span>${parseFloat(product.price).toFixed(2)}</span>
            <span onClick={() => addProduct(product)}>
              <FontAwesomeIcon icon={faCartPlus} size="1x" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};



export default ProductCard;
