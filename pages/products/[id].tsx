import Image from "next/image";
import React, { useEffect, useState, useRef, useContext } from "react";
import styles from "../../styles/ProductDetails.module.css";
import {
  faArrowLeft,
  faTruckFast,
  faArrowDown,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import { IProducts } from "../../types";
import Modal from "../../components/Modal";
import { AnimatePresence } from "framer-motion";
import { ProductsContext } from "../../context/ProductsContext";
import Cookies from "js-cookie";

const ProductDetails: React.FC<{ product: IProducts }> = ({ product }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
 

  const { addProduct,discount} = useContext(ProductsContext);

  const handleAddToCart = () => {
    addProduct(product);
    setModalOpen(true);
  };



  return (
    <>
      <AnimatePresence>
        {modalOpen && <Modal product={product} setModal={setModalOpen} />}
      </AnimatePresence>
      <div className={styles.container}>
        <div className={styles.backArr}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            size="2x"
            className={styles.icon}
            onClick={() => router.push("/products?sort=asc")}
          />
          <span>&nbsp;</span>
          <p>{product.title}</p>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <div className={styles.imgContainer}>
              <Image
                src={product.image}
                width="380"
                height="380"
                objectFit="contain"
              />
            </div>
          </div>
          <div className={styles.right}>
            <h2 className={styles.title}>{product.title}</h2>
            <div className={styles.priceContainer}>
              <h3 className={styles.discPrice}>
                ${parseFloat(product.price).toFixed(2)}
              </h3>
              <div className={styles.discArr}>
                <span>{discount * 100}</span>%
                <FontAwesomeIcon icon={faArrowDown} size="1x" />
              </div>
            </div>
            <h2 className={styles.currPrice}>
              $
              {(
                parseFloat(product.price) -
                parseFloat(product.price) * discount
              ).toFixed(2)}
            </h2>
            <hr />
            <p className={styles.desc}>{product.description.slice(0, 300)}</p>

            <div className={styles.freeDelivery}>
              <FontAwesomeIcon icon={faTruckFast} size="1x" />
              <span>free delivery</span>
            </div>
            <div className={styles.ctaBtn}>
              <button onClick={() => router.push("/products?sort=asc")}>
                Go Back
              </button>
              <button onClick={handleAddToCart}>
                <FontAwesomeIcon
                  icon={faCartShopping}
                  size="1x"
                  style={{ marginRight: "6" }}
                />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");

  const paths = data.map((product: IProducts) => {
    return {
      params: { id: product.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);

  return {
    props: {
      product: data,
    },
  };
};

export default ProductDetails;
