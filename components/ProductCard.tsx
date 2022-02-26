import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/ProductCard.module.css";
import { IProducts } from "../types";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ProductsContext } from "../context/ProductsContext";
import { toast } from "react-hot-toast";

const ProductCard: React.FC<{
  product: IProducts;
}> = ({ product }) => {
  const { addProduct, totalItem } = useContext(ProductsContext);
  const [adding, setAdding] = useState(false);
  const [timesClicked,setTimesClicked] = useState<number>(0)

  const toastId = useRef<any>();
  const firstRun = useRef<boolean>(true);

  const handleAddToCart = (product: IProducts) => {
    setAdding(true);
    toastId.current = toast.loading("Adding 1 item...");
    addProduct(product);
    setTimesClicked(prev => prev + 1);
  };
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    if (adding) {
      setAdding(false);
      toast.success(`${product.title.slice(0, 100)} added`, {
        id: toastId.current,
      });
    }
  }, [totalItem,timesClicked]);

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
            <span onClick={() => handleAddToCart(product)}>
              <FontAwesomeIcon icon={faCartPlus} size="1x" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
