import styles from "../styles/Category.module.css";

const Category = () => {

    const categories = [
        {
            id: 1,
            title: "Men's Clothing",
            img: "img/Men.jpg"
        },

        {
            id: 2,
            title: "Women's Clothing",
            img: "img/women3.jpg"
        },

        {
            id: 3,
            title: "Electronics",
            img: "img/electronics2.jpg"
        },

        {
            id: 4,
            title: "Jewelery",
            img: "/img/jewelry.jpg"
        },

    ]
    return (
        <div className={styles.categories}>
            <div className={styles.wrapper}>
                {categories.map((item, idx) => {
                    return (
                        <>
                            <div className={styles.catCard} key={idx}>
                                <img src={item.img} alt="categoryImg" />
                                {/* <h2 className={styles.title}>
                                    {item.title}
                                </h2> */}
                            </div>
                        </>
                    )
                })}
            </div>
            <button className={styles.browseBtn}>BROWSE STORE</button>

        </div>
    )
}

export default Category