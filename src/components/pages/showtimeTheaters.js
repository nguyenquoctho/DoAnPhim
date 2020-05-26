// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getTheaterShowTimeInfo,
//   getCurrentCumRap,
//   getCurrentDanhSachPhim
// } from "../../actions/ManageTheater";
// import styles from "../../styles/Layout/_showtimeTheater.module.scss";
// import { getBoxOfficeInfo } from "../../actions/ManageBookTicket";
// const ShowtimeTheaters = ({...props}) => {
//   const dispatch = useDispatch();
//   const {
//     showtimeInfoOfTheater,
//     currentCumRap,
//     currentDanhSachPhim
//   } = useSelector(state => state.manageTheatersReducer);
//   useEffect(() => {
//     dispatch(getTheaterShowTimeInfo("BHDStar"));
//   }, []);
//   const handleSinginSuccess = () => {
//     // day nguoi dung vao trang / sau khi dang nhap thanh cong ben action replace k bi quay lai trang register
//     // props.history.replace("/")
//     console.log("da luu");
//     // setTimeout(() => {
//     //     window.location.reload()
//     // }, 1000)
//     props.history.push(`/pick-seat-page`);
//   };
//   return (
//     <div className="container">
//       <div className={styles.showtime__container}>
//         {showtimeInfoOfTheater &&
//           showtimeInfoOfTheater.map((item, index) => (
//             <div key={index}>
//               <div className="row">
//                 <div className="col-4">
//                   <div className={styles.showtime__cumRap__Scroll}>
//                   {item.lstCumRap &&
//                     item.lstCumRap.map((cumrap, i) => (
//                       <div key={i} className={styles.showtime__CumRap}>
//                         <div>
//                           <div>
//                             <p
//                               onClick={() => {
//                                 dispatch(getCurrentCumRap(cumrap.maCumRap));
//                                 dispatch(
//                                   getCurrentDanhSachPhim(cumrap.danhSachPhim)
//                                 );
//                               }}
//                               className={
//                                 currentCumRap === cumrap.maCumRap
//                                   ? styles.showtime__tenCumRap
//                                   : styles.showtime__tenCumRap__hidden
//                               }
//                             >
//                               {cumrap.tenCumRap}
//                             </p>
//                             <p className={ currentCumRap === cumrap.maCumRap
//                                   ? styles.showtime__diaChi : styles.showtime__diaChi__hidden}>
//                               Địa chỉ: {cumrap.diaChi}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="col-8">
//                   <div className={styles.showtime__tenPhim__Scroll}>
//                   {currentDanhSachPhim &&
//                     currentDanhSachPhim.map((phim, ii) => (
//                       <div key={ii}>
//                         <h4 className={styles.showtime__tenPhim}>
//                           {phim.tenPhim}
//                         </h4>
//                         <div className="row">
//                           {phim.lstLichChieuTheoPhim &&
//                             phim.lstLichChieuTheoPhim
//                               .slice(
//                                 phim.lstLichChieuTheoPhim.length - 5,
//                                 phim.lstLichChieuTheoPhim.length
//                               )
//                               .map((lichChieu, iii) => (
//                                 <div
//                                   className={styles.showtime__lichChieu}
//                                   key={iii}
//                                 >
//                                   {/* <span>{lichChieu.tenRap}</span> */}
//                                   <button onClick={
//                                     ()=>{dispatch(
//                                       getBoxOfficeInfo(
//                                         lichChieu.maLichChieu,
//                                         handleSinginSuccess
//                                       )
//                                     );}
//                                   }
                                   
//                                     className={styles.showtime__lichChieu__gio}
//                                   >
//                                     {lichChieu.ngayChieuGioChieu.slice(11, 16)}{" "}
                                  
//                                   </button>

//                                   <span
//                                     className={styles.showtime__lichChieu__ngay}
//                                   >
//                                      Ngày: {lichChieu.ngayChieuGioChieu.slice(8, 10)}-
//                                     {lichChieu.ngayChieuGioChieu.slice(5, 7)}
//                                   </span>
//                                 </div>
//                               ))}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
                  
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default ShowtimeTheaters;
