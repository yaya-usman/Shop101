import React from "react";
import Image from "next/image";
import errorImg from "/public/img/404.gif" 
import styles from "../styles/Error.module.css"

const ErrorPage = () => {
  return (
    <div className={styles.imageContainer}>
      <Image src={errorImg} width = {500} height={500} objectFit="contain" />
    </div>
  );
};

export default ErrorPage;
