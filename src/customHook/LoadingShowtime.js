import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React from 'react';
import Loader from "react-loader-spinner";
import styles from "../styles/Component/_loading.module.scss";
const LoadingShowtime=()=> {
   
    return (
        <div className={styles.loadingContainer}>
        <div className={styles.loadingContain}>
          <Loader
            type="Grid"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={30000} //3 secs
          />
        </div>
      </div>
    )
}

export default LoadingShowtime