import FilterCard from "./FilterCard";
import styles from "../styles/SideBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const sideBar = {
  visible: { opacity: 1, left: 0 },
  hidden: { opacity: 0, left: `-100%`},
};

const SideBar: React.FC<any> = ({ setShowFilter, showFilter }) => {
  return (
    <>
      <motion.div
        variants={sideBar}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className={`${styles.overlay}  ${showFilter && styles.active}`}
      ></motion.div>
      <motion.div
        variants={sideBar}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className={`${styles.sideContainer} ${showFilter && styles.active}`}
      >
        <div className={styles.closeContainer}>
          <span>&nbsp;</span>
          <span className={styles.close} onClick={() => setShowFilter(false)}>
            <FontAwesomeIcon icon={faXmark} size="3x" />
          </span>
        </div>
        <FilterCard />
      </motion.div>
    </>
  );
};

export default SideBar;
