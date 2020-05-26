import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListBookedTicketRoom } from "../../actions/ManageBookTicket";
import styles from "../../styles/Layout/_listTable.module.scss";
const ManageTicketRoom=({...props})=> {
    const dispatch = useDispatch(); 
    useEffect(() => {
        dispatch(getListBookedTicketRoom(props.match.params.maLichChieu));
      }, []);
 
    const {
        listBookedTicketRoom,
       
      } = useSelector(state => state.manageBookTicketReducer);
    return (
        <div className={styles.listTable}>
                <h3>Danh sách ghế đã đặt</h3>
              <div className={styles.listTable__Tbl}>
                <table className="table">
                  <thead>
                    <tr>
                     <th>STT</th>
                      <th>Mã ghế</th>
                      <th>Tài Khoản đặt ghế</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {listBookedTicketRoom &&
                      listBookedTicketRoom.map((item, index) => (
                        <tr
                        // className={(((parseInt(item.ngayDat.slice(0,4)))<2020 ) ||((parseInt(item.ngayDat.slice(0,4)))==2020 && parseInt(item.ngayDat.slice(5,7))<=4 )) ? styles.displayNone : ""}
                          className={index % 2 !== 0 ? styles.trOdd : ""}
                          key={index}
                        >
                         <td>{index+1}</td>
                          <td>{item.maGhe}</td>
                          <td>
                            <p
                                onClick={() => {
                                    // dispatch(getUsersDetail(item.taiKhoan));
                                    props.history.push(
                                    `/admin/manage-user-detail/${item.taiKhoan}`
                                    );
                                }} 
                            >{item.taiKhoan}</p>
                            
                          </td>
                      <td>{item.xacNhan ? (<p>Đã thanh toán</p>):(<p>Chưa thanh toán</p>)}</td>
                         
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
        </div>
    )
}

export default ManageTicketRoom
