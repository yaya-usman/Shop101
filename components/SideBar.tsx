import FilterCard from "./FilterCard";
import styles from "../styles/SideBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const SideBar: React.FC<any> = ({ setShowFilter, showFilter }) => {
  return (
    <>
      <div className={`${styles.overlay}  ${showFilter && styles.active}`}></div>
      <div className={`${styles.sideContainer} ${showFilter && styles.active}`}>
        <div className={styles.closeContainer}>
          <span>&nbsp;</span>
          <span className={styles.close} onClick={() => setShowFilter(false)}>
            <FontAwesomeIcon icon={faXmark} size="3x" />
          </span>
        </div>
        <FilterCard />
      </div>
    </>
  );
};

export default SideBar;
