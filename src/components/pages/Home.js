import Carousel from "../ui/Carousel";
import Footer from "../ui/Footer";
import MovieList from "./movieList";
import TheaterList from "./theaterList";
import BrandTypeFilm from "../ui/BrandTypeFilm";
import UpComingMovies from "./UpComingMovies";
import React, { useEffect } from "react";
import { Formik, useField } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getMovieShowtime,
  getCurrentTheaterNameAction,
  getCurrentTheaterDateAction
} from "../../actions/ManageTheater";
import LoadingShowtime from "../../customHook/LoadingShowtime";
import { getBoxOfficeInfo } from "../../actions/ManageBookTicket";
import styles from "../../styles/Layout/_chooseFilm.module.scss";
import stylesImgContainer from "../../styles/Component/_imgContent.module.scss";
import Swal from "sweetalert2";
import Loading from "../../customHook/useLoading";
import {
  getTheaterShowTimeInfo,
  getCurrentCumRap,
  getCurrentDanhSachPhim
} from "../../actions/ManageTheater";
import styles1 from "../../styles/Layout/_showtimeTheater.module.scss";
import useLoading from "../../customHook/useLoading";
import {
  changeLoadingAction,
  changeLoadingShowtimeAction
} from "../../actions/ManageUser";
//   import { getBoxOfficeInfo } from "../../actions/ManageBookTicket";
const MySelect = ({ values, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <select {...field} {...props}>
      {values.map(item => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};
const Home = ({ ...props }) => {
  const { movieArr } = useSelector(state => state.manageMovieReducer);
  const {
    listCurrentTheater,
    listCurrentTheaterName,
    CurrentTheaterDayTime,
    CurrentTheaterTime
  } = useSelector(state => state.manageTheatersReducer);
  const dispatch = useDispatch();
  useEffect(() => {
        //  window.location.reload();
        // *******
        localStorage.removeItem("showtime");
  }, []);
  const handleSinginSuccess = () => {
    // day nguoi dung vao trang / sau khi dang nhap thanh cong ben action replace k bi quay lai trang register
    // props.history.replace("/")
    //   console.log("da luu");
    // setTimeout(() => {
    //     window.location.reload()
    // }, 1000)
    props.history.push(`/pick-seat-page`);
  };
    const date = new Date()
  const {
    showtimeInfoOfTheater,
    currentCumRap,
    currentDanhSachPhim
  } = useSelector(state => state.manageTheatersReducer);
  useEffect(() => {
    
      // window.location.reload();
  
    dispatch(changeLoadingShowtimeAction(true));
    dispatch(getTheaterShowTimeInfo("BHDStar"));
    // var tong = 9;
    // var arr = [2, 7, 11, 15];

    // for (let i = 0; i < arr.length; i++) {
    //   for (let j = i + 1; i < arr.length; j++) {
    //     if (arr[i] + arr[j] === tong) {
    //       console.log([arr[i], arr[j]]);
    //     }
    //   }
    // }
    
  }, []);
  const { loadingShowtime } = useSelector(state => state.userReducer);
  const { loading } = useSelector(state => state.userReducer);
  return (
    <>
      <div>
        <Carousel />
        <div className={stylesImgContainer.imgContainer}>
          <div className={stylesImgContainer.img__Overplay}></div>
          <div className={stylesImgContainer.img__Content}>
            <div className={styles.chooseFilmContainer}>
              <div className="container">
                <div className="row">
                  <div className=" d-flex col-12 col-lg-4 col-md-4 align-items-center  justify-content-center">
                    <div className={styles.chooseFilmTitleContain}>
                      <h3 className={styles.chooseFilmTitle}>CHỌN SUẤT </h3>
                      <h3 className={styles.chooseFilmTitle}>CHIẾU </h3>
                    </div>
                  </div>
                  <div className="col-12 col-lg-8 col-md-8">
                    <div className={styles.chooseFilmForm}>
                      <div className="row">
                        <div className="col-6">
                          <Formik
                            initialValues={{
                              maPhim: ""
                            }}
                          >
                            {({
                              handleSubmit,
                              values,
                              handleChange,
                              handleBlur
                            }) => {
                              return (
                                <form className={styles.chooseFilmForm_1}>
                                  <MySelect
                                    name="maPhim"
                                    values={movieArr}
                                    onBlur={() => {
                                      console.log(values.maPhim);
                                      if (values.maPhim) {
                                        dispatch(
                                          getMovieShowtime(values.maPhim)
                                        );
                                      }
                                    }}
                                    onChange={handleChange}
                                  />
                                </form>
                              );
                            }}
                          </Formik>
                        </div>
                        <div className="col-6">
                          <Formik
                            initialValues={{
                              tenHeThongRap: ""
                            }}
                          >
                            {({
                              handleSubmit,
                              values,
                              handleChange,
                              handleBlur
                            }) => {
                              return (
                                <form className={styles.chooseFilmForm_2}>
                                  <MySelect
                                    name="tenHeThongRap"
                                    values={listCurrentTheaterName}
                                    onBlur={() => {
                                      if (values.tenHeThongRap) {
                                        dispatch(
                                          getCurrentTheaterNameAction(
                                            values.tenHeThongRap
                                          )
                                        );
                                      }
                                    }}
                                    onChange={handleChange}
                                  />
                                </form>
                              );
                            }}
                          </Formik>
                        </div>
                        <div className="col-6">
                          <Formik
                            initialValues={{
                              ngayChieuGioChieu: ""
                            }}
                          >
                            {({
                              handleSubmit,
                              values,
                              handleChange,
                              handleBlur
                            }) => {
                              return (
                                <form className={styles.chooseFilmForm_3}>
                                  <MySelect
                                    name="ngayChieuGioChieu"
                                    values={CurrentTheaterDayTime}
                                    onBlur={() => {
                                      if (values) {
                                        dispatch(
                                          getCurrentTheaterDateAction(values)
                                        );
                                      }
                                    }}
                                    onChange={handleChange}
                                  />
                                </form>
                              );
                            }}
                          </Formik>
                        </div>
                        <div className="col-6">
                          <Formik
                            initialValues={{
                              maLichChieu: ""
                            }}
                            onSubmit={values => {
                              const userInfo = JSON.parse(
                                localStorage.getItem("userInformation")
                              );
                              if (userInfo) {
                                if (values.maLichChieu) {
                                  props.history.push(
                                    `/pick-seat-page/${values.maLichChieu}`
                                  );
                                } else {
                                  Swal.fire({
                                    position: "center",
                                    icon: "warning",
                                    title: "Bạn chưa chọn lịch chiếu",
                                    showConfirmButton: true
                                  });
                                }
                              } else {
                                Swal.fire({
                                  position: "center",
                                  icon: "warning",
                                  title: "Xin hãy đăng nhập",
                                  showConfirmButton: true
                                });
                              }
                            }}
                          >
                            {({
                              handleSubmit,
                              values,
                              handleChange,
                              handleBlur
                            }) => {
                              return (
                                <form className={styles.chooseFilmForm_4}>
                                  <MySelect
                                    name="maLichChieu"
                                    values={CurrentTheaterTime}
                                    onChange={handleChange}
                                  />
                                  <button
                                    className={styles.chooseFilmButton}
                                    type="submit"
                                    onClick={handleSubmit}
                                  >
                                    ĐẶT VÉ
                                  </button>
                                </form>
                              );
                            }}
                          </Formik>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <MovieList handleSinginSuccess={handleSinginSuccess} />
            <TheaterList />

            <div className="container">
              <div className={styles1.showtime__container}>
                {loadingShowtime ? (
                  <LoadingShowtime />
                ) : (
                  <div>
                    {showtimeInfoOfTheater &&
                      showtimeInfoOfTheater.map((item, index) => (
                        <div key={index}>
                          <div className="row">
                            <div className="col-5">
                              <div className={styles1.showtime__cumRap__Scroll}>
                                {item.lstCumRap.length>5?(<div>
                                  {item.lstCumRap &&
                                  item.lstCumRap.slice(0,5).map((cumrap, i) => (
                                    <div
                                      key={i}
                                      className={styles1.showtime__CumRap}
                                    >
                                      <div>
                                        <div>
                                          <p
                                            onClick={() => {
                                              dispatch(
                                                getCurrentCumRap(
                                                  cumrap.maCumRap
                                                )
                                              );
                                              dispatch(
                                                getCurrentDanhSachPhim(
                                                  cumrap.danhSachPhim
                                                )
                                              );
                                            }}
                                            className={
                                              currentCumRap === cumrap.maCumRap
                                                ? styles1.showtime__tenCumRap
                                                : styles1.showtime__tenCumRap__hidden
                                            }
                                          >
                                            {cumrap.tenCumRap}
                                          </p>
                                          <p
                                            className={
                                              currentCumRap === cumrap.maCumRap
                                                ? styles1.showtime__diaChi
                                                : styles1.showtime__diaChi__hidden
                                            }
                                          >
                                            Địa chỉ: {cumrap.diaChi}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>):(<div>
                                  {item.lstCumRap &&
                                  item.lstCumRap.map((cumrap, i) => (
                                    <div
                                      key={i}
                                      className={styles1.showtime__CumRap}
                                    >
                                      <div>
                                        <div>
                                          <p
                                            onClick={() => {
                                              dispatch(
                                                getCurrentCumRap(
                                                  cumrap.maCumRap
                                                )
                                              );
                                              dispatch(
                                                getCurrentDanhSachPhim(
                                                  cumrap.danhSachPhim
                                                )
                                              );
                                            }}
                                            className={
                                              currentCumRap === cumrap.maCumRap
                                                ? styles1.showtime__tenCumRap
                                                : styles1.showtime__tenCumRap__hidden
                                            }
                                          >
                                            {cumrap.tenCumRap}
                                          </p>
                                          <p
                                            className={
                                              currentCumRap === cumrap.maCumRap
                                                ? styles1.showtime__diaChi
                                                : styles1.showtime__diaChi__hidden
                                            }
                                          >
                                            Địa chỉ: {cumrap.diaChi}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>)}
                               
                              </div>
                            </div>
                            <div className="col-7">
                              <div
                                className={styles1.showtime__tenPhim__Scroll}
                              >
                                {currentDanhSachPhim &&
                                  currentDanhSachPhim.map((phim, ii) => (
                                    <div key={ii}>
                                      <h4 className={styles1.showtime__tenPhim}>
                                        {phim.tenPhim}
                                      </h4>
                                      <div className="row">
                                        {phim.lstLichChieuTheoPhim &&
                                          phim.lstLichChieuTheoPhim
                                            .slice(
                                              phim.lstLichChieuTheoPhim.length -
                                                5,
                                              phim.lstLichChieuTheoPhim.length
                                            )
                                            .map((lichChieu, iii) => (
                                              <div
                                              className={(((parseInt(lichChieu.ngayChieuGioChieu.slice(0,4)))<2020 ) ||((parseInt(lichChieu.ngayChieuGioChieu.slice(0,4)))==2020 && parseInt(lichChieu.ngayChieuGioChieu.slice(5,7))<=parseInt(date.getMonth())  ) || ((parseInt(lichChieu.ngayChieuGioChieu.slice(0,4)))==2020 && parseInt(lichChieu.ngayChieuGioChieu.slice(5,7))===(parseInt(date.getMonth())+1) && parseInt(lichChieu.ngayChieuGioChieu.slice(8,10))<(parseInt(date.getDate())) )) ? styles1.displayNone :  styles1.showtime__lichChieu}

                                                // className={
                                                 
                                                // }
                                                key={iii}
                                              >
                                                <button
                                                  onClick={() => {
                                                    // console.log(
                                                    //   lichChieu.maRap
                                                    // );
                                                    const userInfo = JSON.parse(
                                                      localStorage.getItem(
                                                        "userInformation"
                                                      )
                                                    );
                                                    if (userInfo) {
                                                      if (
                                                        lichChieu.maLichChieu
                                                      ) {
                                                        localStorage.setItem(
                                                          "showtime",
                                                          JSON.stringify(
                                                            lichChieu.maLichChieu
                                                          )
                                                        );

                                                        props.history.push(
                                                          `/pick-seat-page/${lichChieu.maLichChieu}`
                                                        );
                                                      } else {
                                                        Swal.fire({
                                                          position: "center",
                                                          icon: "warning",
                                                          title:
                                                            "Bạn chưa chọn lịch chiếu",
                                                          showConfirmButton: true
                                                        });
                                                      }
                                                    } else {
                                                      Swal.fire({
                                                        position: "center",
                                                        icon: "warning",
                                                        title:
                                                          "Xin hãy đăng nhập",
                                                        showConfirmButton: true
                                                      });
                                                    }
                                                  }}
                                                  className={
                                                    styles1.showtime__lichChieu__gio
                                                  }
                                                >
                                                  {lichChieu.ngayChieuGioChieu.slice(
                                                    11,
                                                    16
                                                  )}
                                                </button>

                                                <span

                                                  className={
                                                    styles1.showtime__lichChieu__ngay
                                                  }
                                                >
                                                  Ngày:
                                                  {lichChieu.ngayChieuGioChieu.slice(
                                                    8,
                                                    10
                                                  )}
                                                  -
                                                  {lichChieu.ngayChieuGioChieu.slice(
                                                    5,
                                                    7
                                                  )}
                                                </span>
                                              </div>
                                            ))}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <UpComingMovies />
            <div className={stylesImgContainer.imgBehind}>
              <div className={stylesImgContainer.imgBehind__Img}></div>
              <div className={stylesImgContainer.imgBehind__OverPlay}></div>
            </div>
            <BrandTypeFilm />
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Home;
