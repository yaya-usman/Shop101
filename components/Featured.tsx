import styles from "../styles/Featured.module.css";
import { useRouter } from "next/router";
import { useEffect, useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { IProducts } from "../types";
import Image from "next/image";

const Featured: React.FC<{ products: IProducts[] }> = ({ products }) => {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const slideAuto = setInterval(() => handleArrow("r"), 6000);

    return () => {
      clearInterval(slideAuto);
    };
  }, [index]);

  const handleArrow = (direction: string) => {
    if (direction === "l") {
      setIndex(index !== 0 ? index - 1 : 2);
    }
    if (direction === "r") {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.arrowContainer}
        style={{ left: 0 }}
        onClick={() => handleArrow("l")}
      >
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      </div>

      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {products.length &&
          products.slice(0, 3).map((item) => (
            <div key={item.id} className={styles.innerWrapper}>
              <div className={styles.left}>
                <div className={styles.content}>
                  <h4 className={styles.title}>{item.title}</h4>
                  <p className={styles.desc}>
                    {item.description && item.description.slice(0, 200)}...
                  </p>
                  <h6 className={styles.price}>${item.price} /ONLY-</h6>
                  <button
                    onClick={() => router.push(`/products/${item.id}`)}
                    className={styles.buyBtn}
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.imgContainer}>
                  <Image
                    src={item.image}
                    width={650}
                    height={650}
                    alt="First slide"
                    objectFit= "contain"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>

      <div
        className={styles.arrowContainer}
        style={{ right: 0 }}
        onClick={() => handleArrow("r")}
      >
        <FontAwesomeIcon icon={faArrowRight} size="2x" />
      </div>
    </div>
  );
};

export default Featured;
