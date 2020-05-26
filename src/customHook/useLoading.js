import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React from 'react';
import Loader from "react-loader-spinner";
import styles from "../styles/Component/_loadingPlane.module.scss";
const Loading=()=> {
   
    return (
        <div className={styles.loadingContainer}>
        <div className={styles.loadingContain}>

          
          <Loader
            type="Oval"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={30000} //3 secs
          />
        </div>
      </div>
    )
}

export default Loading
