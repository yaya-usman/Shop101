import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import React, { useContext, useRef, useState } from "react";
import styles from "../styles/Cart.module.css";
import {
  faPlusCircle,
  faMinusCircle,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductsContext } from "../context/ProductsContext";
import { parseCookies } from "../utils/parseCookies";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { IProducts } from "../types";
import getStripe from "../utils/getStripe";

const Cart: NextPage<any> = () => {
  const [_, setQuantity] = useState<number | undefined>(1)
  const { products, delProduct, increaseQty, decreaseQty, totalDiscountedPrice, totalPrice } = useContext(ProductsContext);
  const router = useRouter()
  const [redirecting, setRedirecting] = useState(false);



  const handleIncrease = (id: number) => {
    let res = increaseQty(id);
    setQuantity(res)
  }
  const handleDecrease = (id: number) => {
    let res = decreaseQty(id);
    setQuantity(res)
  }

  
    const redirectToCheckout = async () => {
      // Create Stripe checkout
      const {
        data: { id },
      } = await axios.post('/api/checkout_sessions', {
        items: Object.entries(products).map(([_, { id, qty }]) => ({
          price: id,
          qty,
        })),
      });
  
      // Redirect to checkout
      const stripe = await getStripe();
      await stripe?.redirectToCheckout({ sessionId: id });
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
              <h3 className={styles.noItem}>No item in your cart</h3>
            ) : (
              <>
                {products.map((product) => {
                  return (
                    <tr className={styles.tr} key={product.id} >
                      <td>
                        <div className={styles.imgContainer}>
                          <Image
                            src={product.image}
                            width="400"
                            height="400"
                            objectFit="contain"
                            alt=""
                          />
                        </div>
                      </td>
                      <td>
                        <span className={styles.name}>{product.title}</span>
                      </td>
                      <td>
                        <span className={styles.price}>
                          $ {(
                            parseFloat(product.price)
                          ).toFixed(2)}
                        </span>
                      </td>
                      <td>
                        <span className={styles.price}>
                          {(100 - (product.discountedPrice / parseFloat(product.price)
                          ) * 100).toFixed(0)}
                        </span>
                      </td>
                      <td>
                        <div className={styles.quantity}>
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
                        </div>
                      </td>
                      <td>
                        <span className={styles.total} >
                          $ {(product.discountedPrice * product.qty).toFixed(2)}
                        </span>
                      </td>
                      <td>
                        <span>
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            size="2x"
                            className={styles.qtyIcon}
                            onClick={() => delProduct(product.id)}
                          />
                        </span>
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
          className={`${styles.wrapper} ${products.length < 1 && styles.noSummary
            }`}
        >
          <h3 className={styles.title}>CART SUMMARY</h3>
          <div className={styles.priceText}>
            <b>Price:</b>
            <span>{totalPrice.toFixed(2)}</span>
          </div>
          <div className={styles.deliveryText}>
            <b>Delivery Charges:</b>
            <span>Free</span>
          </div>
          <hr style={{ width: `${100}%` }} />
          <div className={styles.totalText}>
            <b>Total(with discount):</b>
            <span>$ {totalDiscountedPrice.toFixed(2)}</span>
          </div>

          <button disabled={products.length < 1} className={styles.button} onClick={redirectToCheckout}>
            PROCEED TO CHECKOUT
          </button>

        </div>
      </div>
    </div>
  );
};


// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const cookies = parseCookies(req);

//   return {
//     props: {
//       initialProducts: cookies.inCart,
//     },
//   };
// };




export default Cart;