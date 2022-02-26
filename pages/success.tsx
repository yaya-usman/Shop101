import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
// import { useShoppingCart } from '@/hooks/use-shopping-cart';
import { fetcher, shootFireworks } from "../utils/helperFuncs";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/Success.module.css";
import Image from "next/image";
import errorImg from "/public/img/404.gif";
import errorStyles from "../styles/Error.module.css";
import { CircularProgress } from "@mui/material";

const Success = () => {
  const {
    query: { session_id },
  } = useRouter();

  // const { clearCart } = useShoppingCart();

  const { data, error } = useSWR(
    () => `/api/checkout_sessions/${session_id}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      shootFireworks();
      // clearCart();
    }
  }, [data]);

  return (
    <div className={styles.container}>
      {error ? (
        <div className={errorStyles.imageContainer}>
          <Image src={errorImg} width={500} height={500} objectFit="contain" />
        </div>
      ) : !data ? (
        <div>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div className={styles.successWrapper}>
          <div className={styles.content}>
            <h2>
              <FontAwesomeIcon
                icon={faCircleCheck}
                size="2x"
                className={styles.markIcon}
              />
              <span>Thanks for your order!</span>
            </h2>
            <p>Continue shopping with us!🤗</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Success;
