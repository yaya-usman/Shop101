import Image from 'next/image';
import React from 'react'
import styles from "../../styles/ProductDetails.module.css";
import { faArrowLeft, faTruckFast, faArrowDown, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import axios from 'axios';
import { IProducts } from '../../types';



const ProductDetails: React.FC<{ product: IProducts }> = ({ product }) => {

  const router = useRouter()

  const randomDiscounts = [0.03, 0.1, 0.02, 0.05, 0.23, 0.5]

  const randomVal = randomDiscounts[Math.floor(Math.random() * randomDiscounts.length)];

  return (
    <div className={styles.container}>
      <div className={styles.backArr}>
        <FontAwesomeIcon icon={faArrowLeft} size='2x' className={styles.icon} onClick={() => router.push('/products?sort=asc')} />
        <span>&nbsp;</span>
        <p>{product.title}</p>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.imgContainer}>
            <Image src={product.image} width="500" height="500" objectFit='contain' />
          </div>
        </div>
        <div className={styles.right}>
          <h2 className={styles.title}>
            {product.title}
          </h2>
          <div className={styles.priceContainer}>
            <h3 className={styles.discPrice}>
              ${parseFloat(product.price).toFixed(2)}

            </h3>
            <div className={styles.discArr}>
              <span>{randomVal * 100}</span>%
              <FontAwesomeIcon icon={faArrowDown} size='1x' />
            </div>
          </div>
          <h2 className={styles.currPrice}>$ {(parseFloat(product.price) - parseFloat(product.price) * randomVal).toFixed(2)}</h2>
          <hr />
          <p className={styles.desc}>{(product.description).slice(0,350)}</p>

          <div className={styles.freeDelivery}>
            <FontAwesomeIcon icon={faTruckFast} size='1x' />
            <span>free delivery</span>
          </div>
          <div className={styles.ctaBtn}>
            <button onClick={() => router.push('/products?sort=asc')}>Go Back</button>
            <button><FontAwesomeIcon icon={faCartShopping} size='1x' style={{ marginRight: '6' }} />Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}



export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get('https://fakestoreapi.com/products');

  const paths = data.map((product: IProducts) => {
    return {
      params: { id: product.id.toString() }
    }
  })

  return {
    paths,
    fallback: false
  }

}


export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id
  const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`)

  console.log(data);


  return {
    props: {
      product: data
    }
  }

}



export default ProductDetails



