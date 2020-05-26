import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListPromotion } from "../../actions/ManageBookTicket";
import styles from "../../styles/Layout/_promotion.module.scss";
const  PromotionMain=()=> {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getListPromotion());
    }, []);
    const { listPromotion } = useSelector(
      (state) => state.manageBookTicketReducer
    );
    const date = new Date()
    console.log(date.getMonth())
    return (
        <div className={styles.promotion}>
            <div className="container">
            <h2>   KHUYẾN MÃI</h2>
            {listPromotion.map((item,index)=>(
                <div key={index} className={item.isOn===true ? styles.promotion__Item : styles.displaynone}>
                    <div className="row" >
                    <div className="col-6">
                  <img src={item.hinhAnhKM}></img>
                    </div>
                    <div className="col-6">
                        <h4>{item.tenKM}</h4>
                        <p>{item.noiDungKM}</p>
                    </div>
                    </div>
                </div>
               
            ))}
        </div></div>
    )
}

export default PromotionMain
