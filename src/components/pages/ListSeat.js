import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  
  buyTicket,
  getBoxOfficeInfo,
  resetMoneyAction,
  onToggleModalCompo,
  getListPromotion,
  getListBookedTicket,
  resetListBookedTicketAction,
} from "../../actions/ManageBookTicket";
// import Swal from "sweetalert2";
import OneSeat from "./OneSeat";
import Swal from "sweetalert2";
// import { Form, FormGroup, Button, Spinner } from "reactstrap";
import styles from "../../styles/Layout/_listSeat.module.scss";
import Example from "../ui/Countdown";
import FormCompo from "../Modal/FormCompo";
import { changeLoadingAction } from "../../actions/ManageUser";
import Loading from "../../customHook/useLoading";
// import Footer from "../ui/Footer";
const ListSeat = ({ ...props }) => {
  // const { boxOfficeInformation } = useSelector(state=>state.manageBookTicketReducer);
  // const showtime = JSON.parse(localStorage.getItem("showtime"));
  const {
    boxOfficeInformation,
    tongTien,
    listBookedTicket,
  
    listCompo,
    // listSeat,
    listPromotion,
  } = useSelector((state) => state.manageBookTicketReducer);
  const showtime = JSON.parse(localStorage.getItem("showtime"));
  const userInfo = JSON.parse(localStorage.getItem("userInformation"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListPromotion());
    dispatch(resetListBookedTicketAction())
    // dispatch(getListBookedTicket(props.match.params.maLichChieu))
  }, []);

  // console.log(listBookedTicket)
  // console.log(tongTien)
  const handleBookTicketSuccess = () => {
    // day nguoi dung vao trang / sau khi dang nhap thanh cong ben action replace k bi quay lai trang register
    // props.history.replace("/")

    props.history.replace("/home");
  };
  let x = 0;
  useEffect(() => {
    // setTimeout(() => {
    //   if(props.location.pathname===`/pick-seat-page/${props.match.params.maLichChieu}`){
    //     props.history.goBack();
    //   }
    // }, 300000);
    // setTimeout(() => {
    //   Swal.fire({
    //     position:'center',
    //     icon:'warning',
    //     title:'Bạn còn 30 giây để đặt vé!',
    //     showConfirmButton:false,
    //     timer:2500
    // })
    // }, 270000);
    for(let i=2000;i<=300000;i+=5000){
      setTimeout(() => {
        // if(props.location.pathname===`/pick-seat-page/${props.match.params.maLichChieu}`){
     
         
        // }else{

        //  if(props.location.pathname===`/home`){
        //    console.log("asd")
        //  }
        // }
        const showtime = JSON.parse(localStorage.getItem("showtime"));
        if(showtime){
          console.log(showtime)
          dispatch(getListBookedTicket(showtime,userInfo.taiKhoan));
        }
       
      }, i);
    }
  }, []);

  // useEffect(() => {
  //   console.log(boxOfficeInformation);
  // }, []);
  useEffect(() => {
    dispatch(changeLoadingAction(true));
    dispatch(getBoxOfficeInfo(props.match.params.maLichChieu));
    dispatch(resetMoneyAction());
    // dispatch(
    //   getBoxOfficeInfo(
    //     showtime,
    //     handleSinginSuccess
    //   )
    // );
  }, []);
  const [hidden, sethidden] = useState(false);
  const { loading } = useSelector((state) => state.userReducer);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.listSeat}>
            <div
              className={
                hidden
                  ? styles.listSeat__Sidebar
                  : styles.listSeat__Sidebar__hidden
              }
            >
              <button
                className={styles.listSeat__closeSidebar}
                onClick={() => {
                  sethidden(false);
                }}
              >
                x
              </button>
              <h2>Thông Tin Đặt Vé</h2>
              <p>
                <span>Tên phim: </span>{" "}
                <span>
                  {" "}
                  {boxOfficeInformation.thongTinPhim &&
                    boxOfficeInformation.thongTinPhim.tenPhim}
                </span>
              </p>
              <p>
                {" "}
                <span>Ngày chiếu:</span>{" "}
                <span>
                  {boxOfficeInformation.thongTinPhim &&
                    boxOfficeInformation.thongTinPhim.ngayChieu}
                </span>{" "}
              </p>
              {/* <p>
                <span>Giờ chiếu:</span>{" "}
                <span>
                  {" "}
                  {boxOfficeInformation.thongTinPhim &&
                    boxOfficeInformation.thongTinPhim.gioChieu}
                </span>
              </p> */}
              <p>
                <span> Ghế:</span>
                <span>
                  {listBookedTicket &&
                    listBookedTicket.map((item, index) => (
                      <span key={index}> {item.stt}</span>
                    ))}
                </span>
              </p>
              {/* <h3
                className={styles.listSeat__openMenu}
                onClick={() => dispatch(onToggleModalCompo(true))}
              >
                Chọn Đồ Ăn
              </h3> */}
              <hr className={styles.listSeat__sidebar__hr}></hr>
              <hr className={styles.listSeat__sidebar__hr}></hr>
              <h4>Tổng tiền: {tongTien} (VND)</h4>

              <h3
                className={styles.listSeat__openMenu}
                onClick={() => {
                  if (listBookedTicket.length > 0) {
                    console.log(listPromotion[0].isOn);
                    let date = new Date();
                    let day = date.getDay();
                    let month = date.getMonth();
                    console.log(day + 1);
                    // console.log(month)
                    // console.log(date);
                    let tiensauKM = tongTien;
                    if (listPromotion[0].isOn === true) {
                      if (day + 1 === 3) {
                        tiensauKM =parseInt(tiensauKM * 0.7);
                      }

                      // alert(listPromotion[0].isOn)
                    }
                    if (listPromotion[1].isOn === true) {
                      if (day + 1 === 6) {
                        tiensauKM = parseInt(tiensauKM * 0.6);
                      }

                      // alert(listPromotion[0].isOn)
                    }

                    Swal.fire({
                      title: `Hóa đơn của bạn ${tiensauKM} (VND)`,
                      text: "Đây là câu hỏi bắt buộc",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      cancelButtonText: "Đóng",
                      confirmButtonText: "OK",
                    }).then((result) => {
                      if (result.value) {
                        dispatch(
                          buyTicket(
                            boxOfficeInformation.thongTinPhim.maLichChieu,
                            boxOfficeInformation.thongTinPhim.tenPhim,
                            tiensauKM,
                            handleBookTicketSuccess
                          )
                        );
                      }
                    });
                  } else {
                    Swal.fire({
                      position: "center",
                      icon: "warning",
                      title: "Xin hãy chọn ghế",
                      showConfirmButton: true,
                    });
                  }
                }}
              >
               Xác Nhận Thanh toán
              </h3>
            </div>
            <div className={styles.listSeat__Container}>
              <div className="container">
                <div className={styles.listSeatAddress}>
                  <div className="row">
                    <div className="col-6">
                      <div className="d-flex justify-content-start">
                        <img
                          className={styles.listSeatAddress__imgTheatre}
                          src="./img/iconstheatre.png"
                        ></img>
                        <div className={styles.listSeatAddress__content}>
                          <p className={styles.listSeatAddress__name}>
                            {boxOfficeInformation.thongTinPhim &&
                              boxOfficeInformation.thongTinPhim.tenCumRap}
                          </p>
                          <p className={styles.listSeatAddress__address}>
                            {boxOfficeInformation.thongTinPhim &&
                              boxOfficeInformation.thongTinPhim.diaChi}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className={styles.listSeat__countdown}>
                        <Example />
                      </div>
                    </div>
                  </div>
                </div>
                <hr className={styles.listSeat__Sreen}></hr>
                <div className={styles.listSeat__Seat}>
                  {boxOfficeInformation.danhSachGhe &&
                    boxOfficeInformation.danhSachGhe
                      .slice(0, 52)
                      .map((item, index) => (
                        <OneSeat key={index} seatInfo={item} />
                      ))}
                </div>
                <div className={styles.listSeat__Note}>
                  <div className={styles.listSeat__flex}>
                    Ghế còn trống:
                    <div className={styles.listSeat__Note__SeatNoChoosed}>
                      <img
                        className={styles.listSeat__Noted__SeatNoChoosed}
                        src="https://cinestar.com.vn/catalog/view/theme/default/images/single-chair.png"
                      ></img>
                    </div>
                  </div>
                  <div className={styles.listSeat__flex}>
                    Ghế đã được chọn:
                    <div className={styles.listSeat__Note__SeatBooked}>
                      <img
                        className={styles.listSeat__Noted__SeatBooked}
                        src="https://cinestar.com.vn/catalog/view/theme/default/images/single-chair.png"
                      ></img>
                    </div>
                  </div>
                  <div className={styles.listSeat__flex}>
                    Ghế bạn đang chọn:
                    <div className={styles.listSeat__Note__SeatChoosed}>
                      <img
                        className={styles.listSeat__Noted__SeatChoosed}
                        src="https://cinestar.com.vn/catalog/view/theme/default/images/single-chair.png"
                      ></img>
                    </div>
                  </div>
                  <button
                    className={styles.listSeat__Opensidebar}
                    onClick={() => {
                      sethidden(!hidden);
                    }}
                  >
                    Đặt ghế
                  </button>
                </div>

                <FormCompo />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListSeat;
