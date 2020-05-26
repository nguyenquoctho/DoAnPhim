//chua render

import { useDispatch, useSelector } from "react-redux";

import {
  chooseTheaterOfMovieAction,
  getMovieInfo,
  getTrailerAction,
  onToggleModalTrailer,
  fetchFilmComment,
  addFilmComment,
  addFilmEvalute,
  fetchFilmEvalute
} from "../../actions/ManageMovie";
import ModalTrailer from "../Modal/ModalTrailer";
import styles1 from "../../styles/Layout/_movieDetail.module.scss";
// import styles from "../../styles/Layout/_chooseFilm.module.scss";
import React, { useEffect, useState } from "react";
import { Formik, useFormik, useField } from "formik";
import { Form, FormGroup, Button, Spinner } from "reactstrap";
import {
  getMovieShowtime,
  getCurrentTheaterNameAction,
  getCurrentTheaterDateAction
} from "../../actions/ManageTheater";
import { getBoxOfficeInfo } from "../../actions/ManageBookTicket";
// import {Formik, Form, useField} from 'formik'
import Swal from "sweetalert2";
import Footer from "../ui/Footer";
import { changeLoadingAction } from "../../actions/ManageUser";
import Loading from "../../customHook/useLoading";
import Header from "../ui/Header";
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
const MovieDetail = ({ ...props }) => {
  const dispatch = useDispatch();
  const { maPhim } = props.match.params;
  const { movieDetail, theaterListMaRap } = useSelector(
    state => state.manageMovieReducer
  );
  const { listTheaters } = useSelector(state => state.manageTheatersReducer);
  useEffect(() => {
    dispatch(changeLoadingAction(true));
    dispatch(getMovieInfo(props.match.params.maPhim));

    const movieDetailID = JSON.parse(localStorage.getItem("movieDetail"));
    // console.log(movieDetailID);
    if (movieDetailID) {
      dispatch(getMovieShowtime(movieDetailID));
    }
  }, []);
  const { filmComment,listEvalute,evalutePoint } = useSelector(state => state.manageMovieReducer);
  const {
    listCurrentTheater,
    listCurrentTheaterName,
    CurrentTheaterDayTime,
    CurrentTheaterTime
  } = useSelector(state => state.manageTheatersReducer);

  useEffect(() => {}, []);
  const handleSinginSuccess = () => {
    // day nguoi dung vao trang / sau khi dang nhap thanh cong ben action replace k bi quay lai trang register
    // props.history.replace("/")
    // console.log("da luu");
    // setTimeout(() => {
    //     window.location.reload()
    // }, 1000)
    props.history.push(`/pick-seat-page`);
  };
  const userInfo = JSON.parse(localStorage.getItem("userInformation"));
  useEffect(() => {
    dispatch(fetchFilmComment(props.match.params.maPhim));
    dispatch(fetchFilmEvalute(props.match.params.maPhim));
  }, []);
  // console.log(theaterListMaRap)
  const MyInput = ({...props}) => {
    const [field, meta] = useField(props)
    return <textarea {...field} {...props}/>
  }
  //   console.log(listTheaters);
  const { loading } = useSelector(state => state.userReducer);
  // console.log(CurrentTheaterTime)
  const [isactive1, setIsactive1] = useState(false);
  const [isactive2, setIsactive2] = useState(false);
  const [isactive3, setIsactive3] = useState(false);
  const [isactive4, setIsactive4] = useState(false);
  const [isactive5, setIsactive5] = useState(false);
  const [danhgia, setdanhgia] = useState(0);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        < >
       
        <div className={styles1.movieDetail}>
          <div className="container">
            <ModalTrailer />
            <div className={styles1.movieDetailContainer}>
              <div className={styles1.movieDetail__Content}>
                <div className="row">
                  <div className="col-12 col-lg-4 col-md-4 ">
                    <div className={styles1.movieDetail__Content__img}>
                      <img src={movieDetail.hinhAnh} alt="" />
                    </div>
                  </div>
                  <div className="col-12 col-lg-8 col-md-8 ">
                    <div className="container">
                      <div className={styles1.movieDetail__Content__text}>
                        <h4>{movieDetail.tenPhim}</h4>
                        <p>{movieDetail.moTa}</p>
                        <p>Khởi chiếu: {movieDetail.ngayKhoiChieu}</p>
                        {evalutePoint?(<p>Đánh giá: {Math.ceil(evalutePoint) }</p>):""}
                        {listEvalute.length>0 ? (<p>Lượt đánh giá: {listEvalute.length}</p>): ""}
                        
                        <button
                          onClick={() => {
                            dispatch(getTrailerAction(movieDetail.trailer));
                            dispatch(onToggleModalTrailer(true));
                          }}
                        >
                          TRAILER
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles1.chooseFilmContainer}>
            <div className="container">
              <div className="row">
                <div className=" d-flex col-12 col-lg-4 col-md-4 align-items-center justify-content-center">
                  <div className={styles1.chooseFilmTitleContain}>
                    <h3 className={styles1.chooseFilmTitle}>CHỌN SUẤT </h3>
                    <h3 className={styles1.chooseFilmTitle}>CHIẾU </h3>
                  </div>
                </div>
                <div className="col-12 col-lg-8 col-md-8">
                  <div className={styles1.chooseFilmForm}>
                    <div className="row">
                      <div className="col-6 p-0">
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
                              <form className={styles1.chooseFilmForm_1}>
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
                      <div className="col-6 p-0">
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
                              <form className={styles1.chooseFilmForm_2}>
                                <MySelect
                                  name="ngayChieuGioChieu"
                                  values={CurrentTheaterDayTime}
                                  onBlur={() => {
                                    if (values) {
                                      console.log(values)
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
                    </div>
                    <div className={styles1.chooseFilmForm_movieDetail}>
                      <Formik
                        initialValues={{
                          maLichChieu: ""
                        }}
                        onSubmit={values => {
                          let userInfo = JSON.parse(
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
                            <form className={styles1.chooseFilmForm_4}>
                              <div className="row">
                                <div className="col-6 p-0">
                                  <MySelect
                                    name="maLichChieu"
                                    values={CurrentTheaterTime}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col-6 p-0">
                                  <button
                                    className={styles1.chooseFilmButton}
                                    type="submit"
                                    onClick={handleSubmit}
                                  >
                                    ĐẶT VÉ
                                  </button>
                                </div>
                              </div>
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
          <div className={styles1.movieComment}>
            <div className="container">
              <h2>Nhận xét</h2> 
              <p className={styles1.movieComment__evalute}>Đánh giá: 
                <button className={isactive1 ? styles1.movieComment__evalute1 : ""} onClick={()=>{setIsactive1(true);setIsactive2(false);setIsactive3(false);setIsactive4(false);setIsactive5(false);setdanhgia(1)}}><i className="fa fa-star"></i></button> 
                <button className={ isactive2 ? styles1.movieComment__evalute2: ""} onClick={()=>{setIsactive1(true);setIsactive2(true);setIsactive3(false);setIsactive4(false);setIsactive5(false);setdanhgia(2)}}><i className="fa fa-star"></i></button>
                <button className={isactive3 ?styles1.movieComment__evalute3 :""} onClick={()=>{setIsactive1(true);setIsactive2(true);setIsactive3(true);setIsactive4(false);setIsactive5(false);setdanhgia(3)}}><i className="fa fa-star"></i></button>
                <button className={isactive4 ?styles1.movieComment__evalute4:""} onClick={()=>{setIsactive1(true);setIsactive2(true);setIsactive3(true);setIsactive4(true);setIsactive5(false);setdanhgia(4)}}><i className="fa fa-star"></i></button>
                <button className={ isactive5 ?styles1.movieComment__evalute5:""} onClick={()=>{setIsactive1(true);setIsactive2(true);setIsactive3(true);setIsactive4(true);setIsactive5(true);setdanhgia(5)}}><i className="fa fa-star"></i></button>
                
                </p>
                <button  className={styles1.movieComment__MyBtn}  onClick={()=>{
                  if(userInfo){
                    if(danhgia!==0){
                      dispatch(addFilmEvalute({danhgia:danhgia,taiKhoan:userInfo.taiKhoan},movieDetail.maPhim))
                    }else{
                      Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: "Bạn chưa chọn sao?",
                        showConfirmButton: true
                      });
                    }
                  }else{
                    Swal.fire({
                      position: "center",
                      icon: "warning",
                      title: "Xin hãy đăng nhập",
                      showConfirmButton: true
                    });
                  }
                  }
                  }>Đánh giá</button>
              <div className="row">
                <div className="col-12 col-lg-6">
                  <div className={styles1.movieComment__User}>
                    <Formik
                      initialValues={{
                        // ten: userInfo.hoTen || "",
                        comment: ""
                        // taiKhoan: userInfo.taiKhoan|| ""
                      }}
                      onSubmit={(values,formikBag) => {
                        
                        if (userInfo) {
                          if (values.comment) {
                            let id = Math.floor(Math.random() * 101);
                        let data = {
                          taiKhoan: `${userInfo.taiKhoan}-${id}`,
                          ten: userInfo.hoTen,
                          comment: values.comment,
                          email: userInfo.email,
                          danhgia:5
                        };
                        console.log(data);
                        dispatch(addFilmComment(data, movieDetail.maPhim));
                        formikBag.resetForm()
                          } else {
                            Swal.fire({
                              position: "center",
                              icon: "warning",
                              title: "Bạn chưa nhập nội dung",
                              showConfirmButton: true
                            });
                          }
                        }else {
                          Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: "Xin hãy đăng nhập",
                            showConfirmButton: true
                          });
                        }
                      
                      }}
                    >
                      {({ handleSubmit,resetForm }) => (
                        <Form>
                        {/* <p>  <label>{userInfo && userInfo.hoTen}</label></p>  */}
                          
                          <MyInput className={styles1.movieComment__MyInput} type="text" name="comment" cols="40" rows="5" placeholder="hãy đánh giá về bộ phim này!"   />
                          {/* <textarea className={styles1.movieComment__MyInput} name="comment"  type="text" cols="40" rows="5" label="hãy đánh giá về bộ phim này!"></textarea> */}
                          <div><button
                            className={styles1.movieComment__MyBtn}
                            onClick={handleSubmit}
                          >
                            Đăng
                          </button></div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className={styles1.movieComment__listCmt}>
                    {filmComment &&
                      filmComment.map((item, index) => (
                        <div key={index}>
                          <p className={styles1.movieComment__listCmt__name}>
                            {item.ten}
                          </p>
                          <span><i className="fa fa-envelope mr-2"></i>{item.email}</span>
                          <p className={styles1.movieComment__listCmt__Cmt}>
                            {item.comment}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
        </>)}
    </>
  );
};

export default MovieDetail;
