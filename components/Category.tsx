import Link from "next/link";
import styles from "../styles/Category.module.css";

const Category = () => {
  const categories = [
    {
      id: 1,
      title: "Men's Clothing",
      img: "img/Men.jpg",
      href: `/products?category=men's clothing&sort=asc`
    },

    {
      id: 2,
      title: "Women's Clothing",
      img: "img/women3.jpg",
      href: `/products?category=women's clothing&sort=asc`
    },

    {
      id: 3,
      title: "Electronics",
      img: "img/electronics2.jpg",
      href: `/products?category=electronics&sort=asc`
    },

    {
      id: 4,
      title: "Jewelery",
      img: "/img/jewelry.jpg",
      href: `/products?category=jewelery&sort=asc`
    },
  ];
  return (
    <div className={styles.categories}>
      <div className={styles.wrapper}>
        {categories.map((item, idx) => {
          return (
            <Link href={item.href} passHref key={idx}>
              <div className={styles.catCard}>
                <img src={item.img} alt="categoryImg" />
                <h2 className={styles.title}>{item.title}</h2>
              </div>
            </Link>
          );
        })}
      </div>
      <Link href={`/products?sort=asc`} passHref>
        <button className={styles.browseBtn}>BROWSE STORE</button>
      </Link>
    </div>
  );
};

export default Category;
