import { faCircleCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/ProductDetails.module.css";
import { IProducts } from "../types";
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';



const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
}

const modal = {
    visible: { y: "-200px", x: "-50%", opacity: 1, transition: { delay: 0.3 } },
    hidden: { y: "-100vh", opacity: 0 }
}





const Modal: React.FC<{ product: IProducts, setModal: any }> = ({ product, setModal }) => {

    const router = useRouter()

    return (
        <>
            <motion.div className={styles.overlay} variants={backdrop} initial="hidden" animate="visible" exit="hidden" onClick={() => setModal(false)}>
                <motion.div variants={modal} className={styles.modal}  >
                    <span className={styles.close} onClick={() => setModal(false)}>
                        <FontAwesomeIcon icon={faXmark} size='3x' />
                    </span>
                    <div className={styles.modalImg}>
                        <Image src={product.image} height='150' width='150' />
                        <div className={styles.modalTitle}>
                            <span>
                                <FontAwesomeIcon icon={faCircleCheck} size='2x' /> &nbsp; Item added Successfully
                            </span>
                            <h3>{product.title}</h3>
                        </div>
                    </div>
                    <div className={styles.btn}>
                        <button onClick={() => router.push('/products?sort=asc')}>Continue Shopping</button>
                        <button onClick={() => router.push('/cart')}>Go to Cart</button>
                    </div>
                </motion.div>
            </motion.div>
        </>
    )
}

export default Modal