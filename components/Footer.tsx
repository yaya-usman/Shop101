import Link from "next/link";
import React from "react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>&nbsp;</div>
        <div>
          &copy; {new Date().getFullYear()} Shop101 | Made with ❤️
        </div>
        <Link href={"/"}>
          <i className="fab fa-github"></i>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
