import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Layout/_userDetail.module.scss";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import stylesSlider from "../../styles/Layout/_upComingMovies.module.scss";
import {
  getAccountInfo,
  onToggleModal,
  changeLoadingAction,
  onToggleModalChangePass
} from "../../actions/ManageUser";
import stylesTitle from "../../styles/Component/_title.module.scss";
import FormEditAccount from "../Modal/FormEditAccount";
// import { Form, FormGroup, Button, Spinner } from "reactstrap";
import Loading from "../../customHook/useLoading";
import {
  getListMovies,
  getTrailerAction,
  onToggleModalTrailer
} from "../../actions/ManageMovie";
import FormChangePass from "../Modal/FormChangePass";
// import Footer from "../ui/Footer";
import "../../styles/Helper/_customize.scss";
import { fetchHistory, deleteHistory } from "../../actions/ManageBookTicket";
const UserDetail = () => {
  const dispatch = useDispatch();
  const { accountInfo, listMovieswatched } = useSelector(
    state => state.userReducer
  );
  const { userMovies } = useSelector(state => state.manageMovieReducer);
  const { historyUser } = useSelector(state => state.manageBookTicketReducer);
  // console.log(userMovies)
  const userInfo = JSON.parse(localStorage.getItem("userInformation"));
  useEffect(() => {
    dispatch(changeLoadingAction(true));
    // setTimeout(() => {
      
    // }, 500);
    dispatch(getAccountInfo(userInfo.taiKhoan));
    dispatch(fetchHistory(userInfo.taiKhoan))
    dispatch(getListMovies());
  }, []);
  // console.log(accountInfo);
  const { loading } = useSelector(state => state.userReducer);
  // console.log(accountInfo);
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
        settings: { slidesToShow: 3, slidesToScroll: 1, infinite: false }
      }
    ]
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.userDetail}>
            <div className="container">
              <FormEditAccount />
              
              <div className={styles.userDetailContainer}>
                <div className="row">
                  <div className="col-12 col-lg-4">
                    <div className={styles.userDetailInfo}>
                      <div className={styles.userDetailInfo__avatar}>
                        <img src="././img/avatar-icon.png"></img>
                      </div>
                      <p className={styles.userDetailInfo__Name}>
                        {accountInfo.hoTen}
                      </p>
                     
                        <button className={styles.userDetailInfo__Btn} onClick={() => dispatch(onToggleModal(true))}>
                          Chỉnh sửa
                        </button>
                     
                    
                        <button className={styles.userDetailInfo__Btn} onClick={() => dispatch(onToggleModalChangePass(true))}>
                          Đổi mật khẩu
                        </button>
                     
                      <p className={styles.userDetailInfo__Account}>
                        <i className="fa fa-user"></i>Tài khoản: <span>{accountInfo.taiKhoan}</span>
                      
                      </p>
                      {/* <p className={styles.userDetailInfo__Account}>Mat Khau: {accountInfo.matKhau}</p> */}

                      <p className={styles.userDetailInfo__Phone}>
                        <i className="fa fa-phone"></i>Số điện thoại: <span>{accountInfo.soDT}</span>
                   
                      </p>
                      <p className={styles.userDetailInfo__Email}>
                        <i className="fa fa-envelope"></i>Email: <span>{accountInfo.email}</span>
                        
                      </p>
                    
                    </div>
                  </div>
                  <div className="col-12 col-lg-8">
                    <div className={styles.userDetail__Tbl}>
                      {accountInfo.thongTinDatVe && accountInfo.thongTinDatVe.length===0 ? <h3>Chào mừng bạn đến với MovieStar</h3>: <div>
                      <h2>Lịch sử đặt vé</h2>
                      <div className={styles.userDetail__TblBookedTicket}>
                        <table className="table table-striped table-inverse table-responsive">
                          <thead className="thead-inverse">
                            <tr>
                              <th>STT</th>
                              <th>Phim</th>
                              <th>Ngày đặt</th>
                              <th>Giá vé</th>
                              {/* <th>Rạp</th> */}
                              <th>Mã lịch chiếu</th>
                              <th>Ghế</th>
                              <th></th>
                            </tr>
                          </thead>

                          <tbody>
                            {historyUser &&
                              historyUser.map((item, index) => (
                                <tr
                                  key={index}
                                  className={
                                    index % 2 == 0
                                      ? styles.userDetail__TblTBody1
                                      : styles.userDetail__TblTBody2
                                  }
                                >
                                  <td>{index + 1}</td>
                                  <td>{item.phim}</td>
                                  <td>
                                    <p>{item.thoiGian}</p>
                                    {/* <p>{item.ngayDat.slice(11, 16)}</p> */}
                                  </td>
                             
                                  <td>
                                    {item.tongTien 
                                      }
                                  </td>
                                  <td>
                                    {item.maLichChieu }
                                  </td>
                                  <td>
                                    {item.ve }
                                  </td>
                                  
                            <td>{item.xacNhan ? (""):(<p> <button onClick={()=>{dispatch(deleteHistory(item,userInfo.taiKhoan))}}>Hủy</button></p>)}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                      </div> }
                     
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <h2 className={stylesTitle.Title}>Đề xuất cho bạn</h2>
              <Slider {...settings}>
                {userMovies.map((item, index) => (
                  <div
                    className="my-5"
                    key={index}
                    // style={{
                    //   transform: `translateX(${x}%)`,
                    //   width: "30%",
                    //   height: "370px",
                    //   transition: ".5s"
                    // }}
                    // className="col-12 col-lg-3 col-md-6 d-flex justify-content-center"
                  >
                    <div className={stylesSlider.movie__item}>
                      <img
                        src={item.hinhAnh}
                        className={stylesSlider.movieImg}
                        alt=""
                      />
                      <div className={stylesSlider.movie__overplay}></div>
                      <div className={stylesSlider.movie__detail}>
                        <h4 className={stylesSlider.movie__name}>
                          {item.tenPhim.toUpperCase()}
                        </h4>
                        <p>
                          Khởi chiếu: {item.ngayKhoiChieu.slice(8, 10)}/
                          {item.ngayKhoiChieu.slice(5, 7)}
                        </p>
                        <div className={stylesSlider.movie__Click}>
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
                            className={stylesSlider.movie__bookTicket}
                          >
                            CHI TIẾT
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <FormChangePass />
          {/* <Footer /> */}
        </>
      )}
    </div>
  );
};

export default UserDetail;

