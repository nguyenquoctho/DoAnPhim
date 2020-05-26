import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // getListMovies,
  getTrailerAction,
  onToggleModalTrailer
} from "../../actions/ManageMovie";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// import styles1 from "../../styles/Layout/_movieListSlider.module.scss";
import styles from "../../styles/Layout/_upComingMovies.module.scss";
import { Link } from "react-router-dom";
// import ModalTrailer from "../Modal/ModalTrailer";
import { getAccountInfo } from "../../actions/ManageUser";
import stylesTitle from "../../styles/Component/_title.module.scss";
const UpComingMovies = props => {
  const dispatch = useDispatch();
  const { listMovieComingUp } = useSelector(state => state.manageMovieReducer);
  // console.log(listMovieComingUp)
  const { accountInfo } = useSelector(state => state.userReducer);
  const userInfo = JSON.parse(localStorage.getItem("userInformation"));
  // useEffect(() => {
  //   dispatch(getListMovies());
  // }, []);
  useEffect(() => {
    if (userInfo) {
      dispatch(getAccountInfo(userInfo.taiKhoan));
    }
  }, []);
  const settings = {
    // dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 5000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 400,
      settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false }
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2, slidesToScroll: 1, infinite: false }
    },
    {
      breakpoint: 992,
      settings: { slidesToShow: 3, slidesToScroll: 1, infinite: false }
    },
    {
      breakpoint: 1124,
      settings: { slidesToShow: 4, slidesToScroll: 1, infinite: false }
    }]
};
  // const [x, setX] = useState(0);
  // const goLeft = () => {
  //   x === 0 ? setX(-100 * (listMovieComingUp.length - 1)) : setX(x + 100);
  // };
  // const goRight = () => {
  //   x === -100 * (listMovieComingUp.length - 1) ? setX(0) : setX(x - 100);
  // };
  //   useEffect(() => {
  //     let timeOut = setTimeout(() => {
  //       goRight();
  //     }, 7500);

  //     return () => {
  //       // Tương ứng với componentWillUnmount
  //       // Sẽ chạy khi component bị xoá khỏi DOM
  //       // Trong này ta thường sẽ xử lý clearTimeout, removeEvenlistener,...

  //       clearTimeout(timeOut);
  //     };
  //   }, [x]);
  return (
    <>
      {/* <ModalTrailer /> */}
      <div className="container">
        <div className={styles.listmovieContainer}>
          <h2 className={stylesTitle.Title}>Phim Sắp Chiếu</h2>
          <div className={styles.upComingIntro}>
            {listMovieComingUp.slice(0, 1).map((item, id) => (
              <div key={id} className="row">
                <div className="col-12 col-lg-6 col-md-6">
                  <div className={styles.upComingIntroFilm}>
                    <h5 className={styles.upComingIntro__name}>{item.tenPhim.toUpperCase()}</h5>
                    <div className={styles.upComingIntro__icon}>
                     
                      <i className="fa fa-calendar-week ml-2"></i>
                      <span>
                        {item.ngayKhoiChieu.slice(0, 10)}
                        
                      </span>
                    </div>
                    <p className={styles.upComingIntro__detail}>{item.moTa}</p>
                    <Link
                      to={`movie-detail/${item.maPhim}`}
                      className={styles.upComingIntrodescribe}
                    >
                   CHI TIẾT
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-lg-6 col-md-6">
                  <div className={styles.upComingIntroTrailer}>
                    <div className={styles.upComingIntroImg}>
                      <img
                        // className="img-fluid"
                        // src="img/slide-3-video.png"
                        src={item.hinhAnh}
                        alt=""
                      />
                    </div>
                    <i
                      className="fa fa-play"
                      onClick={() => {
                        dispatch(getTrailerAction(item.trailer));
                        dispatch(onToggleModalTrailer(true));
                      }}
                    ></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.listMovieliderContainer}>
          <div className={styles.listMovielider}>
            <Slider  {...settings}>
            {listMovieComingUp.slice(1,listMovieComingUp.length).map((item, index) => (
              <div
                key={index}
                // style={{
                //   transform: `translateX(${x}%)`,
                //   width: "30%",
                //   height: "370px",
                //   transition: ".5s"
                // }}
                // className="col-12 col-lg-3 col-md-6 d-flex justify-content-center"
              >
                <div className={styles.movie__item}>
                  <img src={item.hinhAnh} className={styles.movieImg} alt="" />
                  <div className={styles.movie__overplay}></div>
                  <div className={styles.movie__detail}>
                    <h4  className={styles.movie__name}>{item.tenPhim.toUpperCase()}</h4>
                      <p >Khởi chiếu: {item.ngayKhoiChieu.slice(8, 10)}/
                      {item.ngayKhoiChieu.slice(5, 7)}
                     
                    </p> 
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
                      >
                        CHI TIẾT
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}</Slider>
       
          </div>
          </div>

          
        </div>
      </div>
    </>
  );
};

export default UpComingMovies;
