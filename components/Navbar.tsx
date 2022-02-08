import Link from "next/link";
import React from "react";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <h3>SHOP101</h3>
          <span></span>
        </div>
        <div className={styles.right}>
          <div className={styles.iconsContainer}>
            <i className="fas fa-home fa-2x"></i>
            <div className={styles.cart}>
              <i className="fas fa-shopping-basket fa-2x"></i>
              <span>0</span>
            </div>
            <Link href={"/"} passHref>
              <a className={styles.loginBtn}>Login</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
