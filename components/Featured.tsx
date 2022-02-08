import styles from "../styles/Featured.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

const Featured = () => {
  // const Products = useSelector(({ ProductReducer: { products } }) => products);

  const [index, setIndex] = useState(0);
  const router = useRouter();
  const Products = [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      price: "22.3",
      description:
        "Slim-Fitting Style, Contrast Raglan Long Sleeve, Three-Button Henley Placket, Light Weight & Soft Fabric For Breathable And Comfortable Wearing. And Solid Stitched Shirts With Round Neck Made For Dura....",
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      price: "22.3",
      description:
        "Slim-Fitting Style, Contrast Raglan Long Sleeve, Three-Button Henley Placket, Light Weight & Soft Fabric For Breathable And Comfortable Wearing. And Solid Stitched Shirts With Round Neck Made For Dura....",
    },
    {
      id: 3,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      price: "22.3",
      description:
        "Slim-Fitting Style, Contrast Raglan Long Sleeve, Three-Button Henley Placket, Light Weight & Soft Fabric For Breathable And Comfortable Wearing. And Solid Stitched Shirts With Round Neck Made For Dura....",
    },
    {
      id: 4,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      price: "22.3",
      description:
        "Slim-Fitting Style, Contrast Raglan Long Sleeve, Three-Button Henley Placket, Light Weight & Soft Fabric For Breathable And Comfortable Wearing. And Solid Stitched Shirts With Round Neck Made For Dura....",
    },
  ];

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
        <i className="fa-solid fa-arrow-left fa-2x"></i>
      </div>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {Products.length &&
          Products.slice(0, 3).map((item, i) => (
            <>
              <div className={styles.left}>
                <div className={styles.content}>
                  <h4 className={styles.title}>{item.title}</h4>
                  <p className={styles.desc}>
                    {item.description && item.description.slice(0, 200)}....
                  </p>
                  <h6 className={styles.price}>${item.price} /ONLY-</h6>
                  <button
                    onClick={() => router.push(`/`)}
                    className={styles.buyBtn}
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
              <div className={styles.imgContainer} key={i}>
                <img src={item.image} alt="First slide" />
              </div>
            </>
          ))}
      </div>

      <div
        className={styles.arrowContainer}
        style={{ right: 0 }}
        onClick={() => handleArrow("r")}
      >
        <i className="fa-solid fa-arrow-right fa-2x"></i>
      </div>
    </div>
  );
};

export default Featured;
