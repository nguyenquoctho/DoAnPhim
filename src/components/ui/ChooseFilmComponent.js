import React, { useEffect, useState } from "react";
import { Formik, useFormik, useField } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovieShowtime,
  getCurrentTheaterNameAction,
  getCurrentTheaterDateAction
} from "../../actions/ManageTheater";
import { getBoxOfficeInfo } from "../../actions/ManageBookTicket";
import styles from "../../styles/Layout/_chooseFilm.module.scss";
import Swal from "sweetalert2";
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
const ChooseFilmComponent = () => {
  const { movieArr } = useSelector(state => state.manageMovieReducer);
  const {
    listCurrentTheater,
    listCurrentTheaterName,
    CurrentTheaterDayTime,
    CurrentTheaterTime
  } = useSelector(state => state.manageTheatersReducer);
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const handleSinginSuccess = () => {
    // day nguoi dung vao trang / sau khi dang nhap thanh cong ben action replace k bi quay lai trang register
    // props.history.replace("/")
    // console.log("da luu");
    // setTimeout(() => {
    //     window.location.reload()
    // }, 1000)
    // props.history.push(`/pick-seat-page`);
  };
  return (
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
            <div className="row">
              <div className="col-6">
                <Formik
                  initialValues={{
                    maPhim: ""
                  }}
                >
                  {({ handleSubmit, values, handleChange, handleBlur }) => {
                    return (
                      <form className={styles.chooseFilmForm_1}>
                        <MySelect
                          name="maPhim"
                          values={movieArr}
                          onBlur={() => {
                            console.log(values.maPhim);
                            if (values.maPhim) {
                              dispatch(getMovieShowtime(values.maPhim));
                            }
                          }}
                          onChange={handleChange}
                        />
                        {/* <button  onClick={handleSubmit}>Submit</button> */}
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
                  {({ handleSubmit, values, handleChange, handleBlur }) => {
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
                        {/* <button  onClick={handleSubmit}>Submit</button> */}
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
                  {({ handleSubmit, values, handleChange, handleBlur }) => {
                    return (
                      <form className={styles.chooseFilmForm_3}>
                        <MySelect
                          name="ngayChieuGioChieu"
                          values={CurrentTheaterDayTime}
                          onBlur={() => {
                            if (values) {
                              dispatch(getCurrentTheaterDateAction(values));
                            }
                          }}
                          onChange={handleChange}
                        />
                        {/* <button  onClick={handleSubmit}>Submit</button> */}
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
                        dispatch(
                          getBoxOfficeInfo(
                            values.maLichChieu,
                            handleSinginSuccess
                          )
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
                  {({ handleSubmit, values, handleChange, handleBlur }) => {
                    return (
                      <form className={styles.chooseFilmForm_4}>
                        <MySelect
                          name="maLichChieu"
                          values={CurrentTheaterTime}
                          //   onBlur={()=>dispatch(getCurrentTheaterDateAction(values))}
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
  );
};

export default ChooseFilmComponent;
