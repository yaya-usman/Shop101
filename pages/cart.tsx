import { NextPage } from "next";
import Image from "next/image";
import React,{useState} from "react";
import styles from "../styles/Cart.module.css";
import {
  faPlusCircle,
  faMinusCircle,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cart: NextPage = () => {
  const [qty,setQty] = useState<number>(1);

  const handleDec = () => {
    if(qty === 1) return;
    setQty(qty-1);
  }

  const handleInc = () => setQty(qty + 1)

  const myCart = {
    id: 5,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 4.6,
      count: 400,
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2 className={styles.cartHeading}>MY CART(1)</h2>
        <table className={styles.table} cellSpacing="0" cellPadding={15}>
          <thead className={styles.trTitle}>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.tr}>
              <td>
                <div className={styles.imgContainer}>
                  <Image
                    src={myCart.image}
                    width="350"
                    height="350"
                    objectFit="contain"
                    alt=""
                  />
                </div>
              </td>
              <td>
                <span className={styles.name}>{myCart.title}</span>
              </td>
              <td>
                <span className={styles.price}>
                  $ {myCart.price.toFixed(2)}
                </span>
              </td>
              <td>
                <div className={styles.quantity}>
                  <FontAwesomeIcon
                    icon={faMinusCircle}
                    size="2x"
                    className={styles.qtyIcon}
                    onClick= {handleDec}
                  />
                  <span className={styles.qtyNum}>{qty}</span>
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    size="2x"
                    className={styles.qtyIcon}
                    onClick= {handleInc}
                  />
                </div>
              </td>
              <td>
                <span className={styles.total}>$ {(myCart.price * qty).toFixed(2)}</span>
              </td>
              <td>
                <span className={styles.total}>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    size="1x"
                    className={styles.qtyIcon}
                    onClick= {handleDec}
                  />
                </span>
              </td>
            </tr>
            <tr className={styles.tr}>
              <td>
                <div className={styles.imgContainer}>
                  <Image
                    src={myCart.image}
                    width="350"
                    height="350"
                    objectFit="contain"
                    alt=""
                  />
                </div>
              </td>
              <td>
                <span className={styles.name}>{myCart.title}</span>
              </td>
              <td>
                <span className={styles.price}>
                  $ {myCart.price.toFixed(2)}
                </span>
              </td>
              <td>
                <div className={styles.quantity}>
                  <FontAwesomeIcon
                    icon={faMinusCircle}
                    size="2x"
                    className={styles.qtyIcon}
                    onClick= {handleDec}
                  />
                  <span className={styles.qtyNum}>{qty}</span>
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    size="2x"
                    className={styles.qtyIcon}
                    onClick= {handleInc}
                  />
                </div>
              </td>
              <td>
                <span className={styles.total}>$ {(myCart.price * qty).toFixed(2)}</span>
              </td>
              <td>
                <span className={styles.total}>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    size="1x"
                    className={styles.qtyIcon}
                    onClick= {handleDec}
                  />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>CART SUMMARY</h3>
          <div className={styles.priceText}>
            <b>Price:</b>
            <span>${myCart.price.toFixed(2)}</span>
          </div>
          <div className={styles.deliveryText}>
            <b>Delivery Charges:</b>
            <span>Free</span>
          </div>
          <hr style={{ width: `${100}%` }} />
          <div className={styles.totalText}>
            <b>Total:</b>
            <span>$ {(myCart.price * qty).toFixed(2)}</span>
          </div>
          <button className={styles.button}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
