import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/Helper/_customize.scss"

import {
  getListMovies,
  getMovieInfo,
  getTrailerAction,
  onToggleModalTrailer
} from "../../actions/ManageMovie";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { getMovieShowtime } from "../../actions/ManageTheater";
import styles from "../../styles/Layout/_movieListSlider.module.scss";
import stylesTitle from "../../styles/Component/_title.module.scss";
import { Link } from "react-router-dom";
import ModalTrailer from "../Modal/ModalTrailer";
import { getAccountInfo } from "../../actions/ManageUser";

const MovieList = props => {
  const dispatch = useDispatch();
  const { listMovieNewIn } = useSelector(state => state.manageMovieReducer);
  const { accountInfo,loading } = useSelector(state => state.userReducer);
  const userInfo = JSON.parse(localStorage.getItem("userInformation"));
  useEffect(() => {
    dispatch(getListMovies());
    
  }, []);
  const settings = {
    // dots: true,
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 5000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 320,
      settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false }
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false }
    },
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2, slidesToScroll: 1, infinite: false }
    }]
};

  // const [x, setX] = useState(0);
  // const goLeft = () => {
  //   x === 0 ? setX(-100 * (listMovieNewIn.length - 1)) : setX(x + 100);
  // };
  // const goRight = () => {
  //   x === -100 * (listMovieNewIn.length - 1) ? setX(0) : setX(x - 100);
  // };
  // useEffect(() => {
  //   let timeOut = setTimeout(() => {
  //     goRight();
  //   }, 7500);

  //   return () => {
     

  //     clearTimeout(timeOut);
  //   };
  // }, [x]);
  return (
    <div className={styles.listmovieSection}>
      <ModalTrailer />
      <div className="container">
        <div className={styles.listmovieContainer}>
          <h2 className={stylesTitle.Title}>Phim Đang Chiếu</h2>
          <div className={styles.listMovielider}>
            <Slider {...settings} >
            {listMovieNewIn.map((item, index) => (
              <div
                key={index}
                // style={{
                //   transform: `translateX(${x}%)`,
                //   width: "30%",
                //   height: "550px",
                //   transition: ".5s"
                // }}
                // className="col-12 col-lg-6 col-md-6"
              >
                <div className={ index%2===0 ? ( styles.movie__item_orange) : ( styles.movie__item_purple)}>
                  <img src={item.hinhAnh} className={styles.movieImg} alt="" />

                  <div className={styles.movie__detail}>
                    <h3 className={styles.movie__name}>{item.tenPhim.toUpperCase()}</h3>
                    <p className={styles.movie__Sub}>{item.moTa}</p>
                    <div>
                    <img src="./img/2_d.png"></img>
                    </div>
                    <div className={styles.movie__Click}>
                      <i
                        onClick={() => {
                          dispatch(getTrailerAction(item.trailer));
                          dispatch(onToggleModalTrailer(true));
                        }}
                      >
                        TRAILER
                      </i>
                      <Link
                        to={`movie-detail/${item.maPhim}`}
                        className={styles.movie__bookTicket}
                        onClick = {()=>{
                          localStorage.setItem("movieDetail", JSON.stringify(item.maPhim));
                        }}
                      >
                        CHI TIẾT
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}</Slider>
          </div>
          {/* <button
            className={styles.goLeft}
            onClick={() => {
              goLeft();
            }}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            className={styles.goRight}
            onClick={() => {
              goRight();
            }}
          >
            <i className="fas fa-chevron-right"></i>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
