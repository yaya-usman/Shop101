import Link from "next/link";
import React, { useContext } from "react";
import styles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faHome } from "@fortawesome/free-solid-svg-icons";
import {ProductsContext} from "../context/ProductsContext";
import {ProductContextState } from "../types";

const Navbar : React.FC = () => {
  const router = useRouter();
  const {totalItem} = useContext<ProductContextState>(ProductsContext);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <h3 onClick={() => router.push("/")}>SHOP101</h3>
          <span></span>
        </div>
        <div className={styles.right}>
          <div className={styles.iconsContainer}>
            <FontAwesomeIcon
              icon={faHome}
              size="2x"
              onClick={() => router.push("/")}
            />
            <div className={styles.cart} onClick ={() => router.push('/cart')}>
              <FontAwesomeIcon icon={faBasketShopping} size="2x" />
              <span>{totalItem}</span>
            </div>
            <Link href={"/auth/login"} passHref>
              <a className={styles.loginBtn}>Login</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
