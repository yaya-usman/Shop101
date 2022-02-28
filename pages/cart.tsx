import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import React, { useContext, useState } from "react";
import styles from "../styles/Cart.module.css";
import {
  faPlusCircle,
  faMinusCircle,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductsContext } from "../context/ProductsContext";
import { useRouter } from "next/router";
import axios from "axios";
import getStripe from "../utils/getStripe";

const Cart: NextPage<any> = ({inCart}) => {
  const [_, setQuantity] = useState<number | undefined>(1);
  const {
    products,
    delProduct,
    increaseQty,
    decreaseQty,
    totalDiscountedPrice,
    totalPrice,
  } = useContext(ProductsContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleIncrease = (id: number) => {
    let res = increaseQty(id);
    setQuantity(res);
  };
  const handleDecrease = (id: number) => {
    let res = decreaseQty(id);
    setQuantity(res);
  };

  const createCheckOutSession = async () => {
    setLoading(true);
    const stripe = await getStripe();
    const checkoutSession = await axios.post("/api/checkout_sessions/", {
      items: products,
    });

    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result?.error) {
      alert(result.error.message);
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2 className={styles.cartHeading}>
          MY CART({products ? products.length : 0})
        </h2>
        <table className={styles.table} cellSpacing="0" cellPadding={15}>
          <thead className={styles.trTitle}>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Discount(%)</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.length < 1 ? (
              <tr className={styles.noItem}>
                <td>No item in your cart</td>
              </tr>
            ) : (
              <>
                {products.map((product: any) => {
                  return (
                    <tr className={styles.tr} key={product.id}>
                      <td className={styles.imgContainer}>
                        <Image
                          src={product.image}
                          width="400"
                          height="400"
                          objectFit="contain"
                          alt=""
                        />
                      </td>
                      <td className={styles.name}>{product.title}</td>
                      <td className={styles.price}>
                        ${parseFloat(product.price).toFixed(2)}
                      </td>
                      <td className={styles.discount}>
                        {(
                          100 -
                          (product.discountedPrice /
                            parseFloat(product.price)) *
                            100
                        ).toFixed(0)}
                      </td>
                      <td className={styles.quantity}>
                        <FontAwesomeIcon
                          icon={faMinusCircle}
                          size="2x"
                          className={styles.qtyIcon}
                          onClick={() => handleDecrease(product.id)}
                        />
                        <span className={styles.qtyNum}>{product.qty}</span>
                        <FontAwesomeIcon
                          icon={faPlusCircle}
                          size="2x"
                          className={styles.qtyIcon}
                          onClick={() => handleIncrease(product.id)}
                        />
                      </td>
                      <td className={styles.total}>
                        ${(product.discountedPrice * product.qty).toFixed(2)}
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          size="2x"
                          className={styles.trashIcon}
                          onClick={() => delProduct(product.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.right}>
        <div
          className={`${styles.wrapper} ${
            products.length < 1 && styles.noSummary
          }`}
        >
          <h3 className={styles.title}>CART SUMMARY</h3>
          <div className={styles.priceText}>
            <b>Price:</b>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className={styles.deliveryText}>
            <b>Delivery Charges:</b>
            <span>Free</span>
          </div>
          <hr style={{ width: `${100}%` }} />
          <div className={styles.totalText}>
            <b>Total(with discount):</b>
            <span>${totalDiscountedPrice.toFixed(2)}</span>
          </div>

          <button
            disabled={products.length < 1 || loading}
            className={styles.button}
            onClick={createCheckOutSession}
          >
            {loading ? "Processing,please wait...." : "PROCEED TO CHECKOUT"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;


