import React from "react";
import styles from "../../styles/Layout/_carousel.module.scss";
import ModalTrailer from "../Modal/ModalTrailer";
import { useDispatch } from "react-redux";
import { getTrailerAction, onToggleModalTrailer } from "../../actions/ManageMovie";
const ImgComp = ({ src, title, content, video }) => {
    const dispatch = useDispatch();
  let imgStyles = {
    width: 100 + "%",
    height: 100 + "vh",
    
  };
  return (
    <>
      {/* <ModalTrailer /> */}
      <div  className={styles.slideContainer}>
        <img
          src={src}
          alt="slide-img"
          className={styles.slideImg}
          style={imgStyles}
        ></img>
        <div className={styles.slideOverplay} ></div>
        <div className={styles.slideContent}>
          <h2 className={styles.slideTitle}>{title}</h2>
          <p className={styles.slideSub}>
         {content}
          </p>
          <button className={styles.slideTrailer} onClick={()=>{dispatch(getTrailerAction(video)) ;dispatch(onToggleModalTrailer(true))}}>
            <i className="fa fa-play"></i>TRAILER
          </button>
        </div>
      </div>
    </>
  );
};

export default ImgComp;
