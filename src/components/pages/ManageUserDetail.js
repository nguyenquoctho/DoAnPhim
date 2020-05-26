import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLoadingAction } from "../../actions/ManageUser";
import { getUsersDetail } from "../../actions/ManageUsers";
import Loading from "../../customHook/useLoading";
import styles from "../../styles/Layout/_listTable.module.scss";
import { fetchHistory, confirmHistory, deleteHistory } from "../../actions/ManageBookTicket";
const ManageUserDetail = ({ ...props }) => {
  const dispatch = useDispatch(); 
  const { userDetail } = useSelector(state => state.manageUserReducer);
  const { historyUser } = useSelector(state => state.manageBookTicketReducer);
  const { loading } = useSelector(state => state.userReducer);
  useEffect(() => {
    dispatch(changeLoadingAction(true));
    dispatch(getUsersDetail(props.match.params.taiKhoan));
    dispatch(fetchHistory(props.match.params.taiKhoan))
  }, []);
  // useEffect(() => {
    const date = new Date()
  // }, [userDetail]);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.listTable}>
          <div className="container">
          <div className={styles.listTable__header}>  <h2>Thông tin tài khoản</h2></div>
            <div className={styles.listTable__User}>
            
              <div className={styles.listTable__UserDetail}>
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div className={styles.listTable__User__col_1}>
                      <i className="fa fa-user"></i>
                      <p>{userDetail.hoTen}</p>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className={styles.listTable__User__col_2}>
                      <p>
                        <i className="fa fa-user"></i>Tài khoản:{" "}
                        <span>{userDetail.taiKhoan}</span>
                      </p>
                      <p>
                        {" "}
                        <i className="fa fa-lock"></i>Mật khẩu:{" "}
                        <span>{userDetail.matKhau}</span>
                      </p>
                      <p>
                        {" "}
                        <i className="fa fa-phone"></i>Số DT:{" "}
                        <span>{userDetail.soDT}</span>
                      </p>
                      <p>
                        <i className="fa fa-envelope"></i>Email:{" "}
                        <span>{userDetail.email}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <h3>Lịch sử đặt vé</h3>
              <div className={styles.listTable__Tbl}>
                <table className="table">
                  <thead>
                    <tr>
                     <th>STT</th>
                      <th>Phim</th>
                      <th>Ngày đặt</th>
                      <th>Giá vé</th>
                      <th>Mã lịch chiếu</th>
                      <th>Ghế</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyUser &&
                      historyUser.map((item, index) => (
                        <tr
                        // className={(((parseInt(item.ngayDat.slice(0,4)))<2020 ) ||((parseInt(item.ngayDat.slice(0,4)))==2020 && parseInt(item.ngayDat.slice(5,7))<=4 )) ? styles.displayNone : ""}
                          className={index % 2 !== 0 ? styles.trOdd : ""}
                          key={index}
                        >
                         <td>{index+1}</td>
                          <td>{item.phim}</td>
                          <td>
                            <p>{item.thoiGian}</p>
                          
                          </td>
                          <td>{item.tongTien}</td>
                          <td>
                            {item.maLichChieu 
                        }
                          </td>
                          <td>
                            {item.ve.length==5? (<p>
                              {item.ve} 
                            </p>):(<div>
                            <p>  {item.ve.slice(0,5)} </p> 
                            <p>  {item.ve.slice(6,11)} </p> 
                            </div>)
                             }
                          </td>
                            <td>{item.xacNhan ? (""):(<p><button onClick={()=>{dispatch(confirmHistory(item,props.match.params.taiKhoan))}}>Xác nhận</button> <button onClick={()=>{dispatch(deleteHistory(item,props.match.params.taiKhoan))}}>Hủy</button></p>)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ManageUserDetail;
