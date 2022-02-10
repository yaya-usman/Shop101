import Link from "next/link";
import React from "react";
import styles from "../styles/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>&nbsp;</div>
        <div>&copy; {new Date().getFullYear()} Shop101 | Made with ❤️</div>
        <Link href={"https://github.com/yaya-usman/Shop101"}>
          <a>
            <FontAwesomeIcon className={styles.icon} icon={faGithub} size="2x" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
