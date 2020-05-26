import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Layout/_footer.module.scss";
import {  useSelector } from "react-redux";
const Footer = () => {
  const { listTheaters } = useSelector(state => state.manageTheatersReducer);
  return (
    <div className={styles.footer}>
      <div className={styles.footer__overplay}></div>
     
        <div className={styles.footer__container}>
        <div className="container">
          {/* <img src="./img/logo.svg" alt="" className={styles.footer__logo} /> */}
          <p className={styles.footer__container__Nav}>VLTH'Movie</p>
          <div className="row">
          <div className="col-lg-3">
              <div className={styles.footer__intro}>
                <h3>Giới thiệu</h3>
                <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
               
              </div>
            </div>
            <div className="col-lg-3">
              <div className={styles.footer__info}>
                <h3>Thông tin</h3>
                <p>
                  <Link to="/info">TIN TỨC</Link>
                </p>
                <p>
                  <Link to="/promtion">    KHUYẾN MÃI</Link>
                </p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className={styles.footer__theaters}>
                <h3>Hệ thống rạp</h3>
                {listTheaters.map((item, index) => (
                  <p key={index}>
                    <span>{item.tenHeThongRap}</span>
                  </p>
                ))}
              </div>
            </div>
            <div className="col-lg-3">
              <div className={styles.footer__contact}>
                <h3>Chăm sóc khách hàng</h3>
                <p>
                  <i className="fa fa-map-marker-alt"></i>
                  <span>122 Nguyễn Văn Cừ, Quận 5, Tp.HCM</span>
                </p>
                <p>
                  <i className="fa fa-envelope"></i>
                  <span>info@example.com</span>
                </p>
                <p>
                  <i className="fa fa-phone"></i>
                  <span>+09187 8088 9436</span>
                </p>
                <p>
                  <i className="fa fa-clock"></i>
                  <span>
                    8:00 - 22:00 
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Footer;
