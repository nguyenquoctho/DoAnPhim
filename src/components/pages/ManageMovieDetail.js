import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onToggleModal, changeLoadingAction } from "../../actions/ManageUser";
import FormEditMovie from "../Modal/FormEditMovie";
import FormCreateShowtimesMovie from "../Modal/FornCreateShowtimesMovie";
import { onToggleModalTicket } from "../../actions/ManageBookTicket";
import { Formik, Form, useField } from "formik";
import Swal from "sweetalert2";
// import { Spinner } from "reactstrap";
import {
  Button,
  // Modal,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
  FormGroup
} from "reactstrap";
import { updateImg, getMovieInfo } from "../../actions/ManageMovie";
import Loading from "../../customHook/useLoading";
import styles from "../../styles/Layout/_listTable.module.scss";
import {
  getMovieShowtime,
  getCurrentTheaterNameAction,
  // getCurrentTheaterDateAction,
  resetCurrentTheaterDayTimeTemporaryAction
} from "../../actions/ManageTheater";
const MyInput = ({ ...props }) => {
  const [field, meta] = useField(props);
  return <input {...field} {...props} />;
};
const ManageMovieDetail = ({ ...props }) => {
  const dispatch = useDispatch();
  const { movieDetail } = useSelector(state => state.manageMovieReducer);
  const {
    listCurrentTheater,
    listCurrentTheaterName,
    CurrentTheaterName,
    CurrentTheaterDayTime,
    CurrentTheaterTime,
    CurrentTheaterDayTimeTemporary
  } = useSelector(state => state.manageTheatersReducer);
  const [file, setFile] = useState("");
  const handleChangeFile = e => {
    setFile(e.target.files[0]);
  };
  // console.log(CurrentTheaterTime);
  useEffect(() => {
    // console.log(movieDetail);
  }, [movieDetail]);
  const date = new Date()
  // console.log(parseInt(date.getMonth()))
  const { loading } = useSelector(state => state.userReducer);
  useEffect(() => {
    dispatch(changeLoadingAction(true));
    dispatch(getMovieInfo(props.match.params.maPhim));
    dispatch(getMovieShowtime(props.match.params.maPhim));
    dispatch(resetCurrentTheaterDayTimeTemporaryAction());
  }, []);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.listTable}>
          <FormEditMovie />
          <FormCreateShowtimesMovie />
          <div className="container">
            <div className={styles.listTable__header}>
              <h2>Thông tin phim</h2>
              <button
                className={styles.phim_btnWhite}
                onClick={() => dispatch(onToggleModal(true))}
              >
                Cập nhật thông tin
              </button>

              <button
                className={styles.phim_btnWhite}
                onClick={() => dispatch(onToggleModalTicket(true))}
              >
                Tạo lịch chiếu
              </button>
            </div>
            <div className={styles.listTable__User}>
              <div className={styles.listTable__UserDetail}>
                <div className="row">
                  <div className="col-12 col-lg-4">
                    <div className={styles.listTable__User__col_1}>
                      <img src={movieDetail.hinhAnh} alt="" />
                      <Formik
                        initialValues={{
                          hinhAnh: ""
                        }}
                        onSubmit={values => {
                          if (file) {
                            dispatch(updateImg({ ...values, hinhAnh: file }));
                          } else {
                            Swal.fire({
                              position: "center",
                              icon: "error",
                              title: "Bạn chưa chọn file",
                              showConfirmButton: false,
                              timer: 2500
                            });
                          }
                        }}
                      >
                        {({ handleSubmit }) => (
                          <Form>
                            <FormGroup>
                              {/* <label> Hình ảnh</label> */}
                              <MyInput
                                type="file"
                                name="hinhAnh"
                                onChange={handleChangeFile}
                              />
                            </FormGroup>

                            <Button
                              color="primary"
                              onClick={() => {
                                handleSubmit();
                              }}
                            >
                              Cập nhật hình ảnh
                            </Button>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                  <div className="col-12 col-lg-8">
                    <div className={styles.listTable__User__col_2}>
                      <p className="card-title">
                        Tên phim: <span>{movieDetail.tenPhim}</span>
                      </p>
                      <p className="card-text">
                        Mô tả: <span>{movieDetail.moTa}</span>
                      </p>
                      <p className="card-text">
                        Ngày khởi chiếu:{" "}
                        <span>{movieDetail.ngayKhoiChieu}</span>
                      </p>
                      
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
            <iframe
              width="560"
              height="315"
              src={movieDetail.trailer}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h2 style={{ color: "white" }}>Lịch chiếu phim</h2>
            <div className={styles.listTable__theater}>
              <div className="row">
                {listCurrentTheaterName &&
                  listCurrentTheaterName
                    .slice(1, listCurrentTheaterName.length)
                    .map((item, index) => (
                      <div
                        key={index}
                        className="col-12 col-lg-4 col-md-6 col-sm-6 "
                      >
                        <button
                          onClick={() => {
                            console.log(item.label);
                            dispatch(getCurrentTheaterNameAction(item.value));
                          }}
                        >
                          {item.label}
                        </button>
                      </div>
                    ))}
              </div>
            </div>
            <div className={styles.listTable__showtimeMovie}>
              <div className="row">
                  <div className="container" >
                    <table className="table">
                      <thead>
                        <tr>
                       
                          <th>Giờ chiếu</th>
                          <th>Mã lịch chiếu </th>
                          <th>Mã rạp </th>
                          <th>Gía vé</th>
                        </tr>
                      </thead>
                      <tbody>
                      {CurrentTheaterDayTimeTemporary &&
                      CurrentTheaterDayTimeTemporary.map((item, index) => (
                        <tr
                        // className ={index%2!==0 ? styles.trOdd  :"" } && parseInt(item.ngayChieuGioChieu.slice(0,4))<=date.getMonth() 
                        className={(((parseInt(item.ngayChieuGioChieu.slice(0,4)))<2020 ) ||((parseInt(item.ngayChieuGioChieu.slice(0,4)))==2020 && parseInt(item.ngayChieuGioChieu.slice(5,7))<=parseInt(date.getMonth()) )) ? styles.displayNone : ""}
                          key={index}
                          onClick={() => {
                            // dispatch(getUsersDetail(item.taiKhoan));
                            props.history.push(
                              `/admin/manage-ticket-room/${item.maLichChieu}`
                            );
                          }} 
                        >
                        
                          <td>
                          <p>{item.ngayChieuGioChieu.slice(0,10)}</p>
                                    <p>{item.ngayChieuGioChieu.slice(11, 16)}</p>
                          </td>
                          <td>
                           {item.maLichChieu}
                          </td>
                          <td>
                          
                            {item.maRap}
                          </td>
                          <td>
                          
                            {item.giaVe}
                          </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                   
                  </div>
            
              </div>
            </div>
            {/* <p className="card-text">Bi Danh: {movieDetail.biDanh}</p> */}
          </div>
        </div>
      )}
    </div>
  );
};
export default ManageMovieDetail;
