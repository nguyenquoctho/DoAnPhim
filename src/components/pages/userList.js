import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import {
  getListUser,
  deleteUser,
  getUsersDetail,
  findUser,
  getListUserPage,
  changePageUsersAction,
  getUserEditAction
} from "../../actions/ManageUsers";
import { MyTextField } from "./SignUp";
import Swal from "sweetalert2";
// import { Form, FormGroup, Button, Spinner } from "reactstrap";
import { FormGroup, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Formik } from "formik";
import FormAddUser from "../Modal/FormAddUser";
import { onToggleModal, onToggleModalEdit } from "../../actions/ManageUser";
import RenderUsersList from "../../RenderProps/RenderUsersList";
import PaginationComponent from "../ui/Pagination";
import styles from "../../styles/Layout/_listTable.module.scss";
import FormEditUser from "../Modal/FormEditUser";
import Loading from "../../customHook/useLoading";
const UserList = ({ onChangePage, history }) => {
  const dispatch = useDispatch();
  const { listUsersPage } = useSelector(state => state.manageUserReducer);
  // useEffect(() => {
  //   dispatch(getListUserPage(currentPage,20));
  // }, [listUsersPage]);
  const { currentPage } = useSelector(state => state.manageUserReducer);
  const handleFindUser = e => {
    if (e.tuKhoa !== "") {
      dispatch(findUser(e.tuKhoa, 1, 10));
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Bạn chưa nhập tên?",
        showConfirmButton: false,
        timer: 2500
      });
    }
  };
  
  // useEffect(() => {
  //   dispatch(getListUser());
  // }, []);
  // http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=GP10&tuKhoa=DsoTrang=1&soPhanTuTrenTrang=1
  // http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=GP10&tuKhoa=D&soTrang=1&soPhanTuTrenTrang=1
  return (
    <div className={styles.listTable}>
    
        <FormAddUser />
        <FormEditUser />
        <div className={styles.listTable__header}>
          <button
           className={styles.phim_btnWhite}
            onClick={() => dispatch(onToggleModal(true))}
          >
            Thêm người dùng
          </button>
          <h2>Danh sách người dùng</h2>
          {/* <Formik
            initialValues={{
              tuKhoa: ""
            }}
            onSubmit={values => {
              handleFindUser(values);
              console.log(values);
            }}
          >
            {({ handleChange, handleSubmit }) => (
              <FormGroup>
                <MyTextField
                  className={styles.mySearch}
                  name="tuKhoa"
                  type="text"
                  label="Nhập tên người dùng"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" onClick={handleSubmit}>
                        <SearchIcon
                          fontSize="large"
                          style={{ cursor: "pointer" }}
                        />
                      </InputAdornment>
                    )
                  }}
                  // onChange={e => {
                  //   handleChange(e);
                  //   handleFindUser(e);
                  // }}
                />
              </FormGroup>
            )}
          </Formik> */}
        </div>
        <div className={styles.listTable__Tbl}>
        <RenderUsersList
          render={props => {
            return (
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tài khoản</th>
                      <th>Họ tên</th>
                      <th>Email</th>
                      <th>Số DT</th>
                      <th>Loại người dùng</th>
                      <th></th>
                    
                    </tr>
                  </thead>
           
                  <tbody>
                    {props.listUsersPage.items &&
                      props.listUsersPage.items.map((item, index) => (
                        <tr className ={index%2!==0 ? styles.trOdd  :"" } key={index}>
                              <td>{index+1}</td>
                          <td>{item.taiKhoan}</td>
                          <td>{item.hoTen}</td>
                          <td>{item.email}</td>
                          <td>{item.soDt}</td>
                          <td>{item.maLoaiNguoiDung}</td>
                          <td>
                            <button
                               className={styles.listTable__BtnDelete}
                              onClick={() =>
                                Swal.fire({
                                  title: `Bạn muốn xóa tài khoản ${item.taiKhoan}`,
                                  text: "Đây là câu hỏi bắt buộc",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#3085d6",
                                  cancelButtonColor: "#d33",
                                  cancelButtonText: "Đóng",
                                  confirmButtonText: "Xóa"
                                }).then(result => {
                                  if (result.value) {
                                    dispatch(deleteUser(item.taiKhoan));
                                  }
                                })
                              }
                              // onClick={()=>{dispatch(deleteUser(item.taiKhoan)); }}
                            >
                              <i className="fas fa-trash "></i>
                            </button>

                            <button
                               className={styles.listTable__BtnEdit}
                               
                               onClick={() =>{
                                dispatch(getUserEditAction(item)) 
                                dispatch(onToggleModalEdit(true))} }
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                            className={styles.listTable__BtnDetail}
                              onClick={() => {
                                // dispatch(getUsersDetail(item.taiKhoan));
                                history.push(
                                  `/admin/manage-user-detail/${item.taiKhoan}`
                                );
                              }} 
                            >
                            Chi tiết
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
              
               </table>
                <div   className={styles.navigationSection}>
                <PaginationComponent
                
                currentPage={props.currentPage}
                pageSize={10}
                totalCount={props.totalCount}
                onChangePage={onChangePage}
              />
                </div>
              </div>
            );
          }}
        />
      </div>
        {/* <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tai Khoan</th>
            <th>Ho Ten</th>
            <th>Email</th>
            <th>So DT</th>
            <th>Loai Nguoi Dung</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.taiKhoan}</td>
              <td>{item.hoTen}</td>
              <td>{item.email}</td>
              <td>{item.soDt}</td>
              <td>{item.maLoaiNguoiDung}</td>
              <td>
                <button onClick={()=>{dispatch(deleteUser(item.taiKhoan)); }} className="btn btn-danger">Xoa</button>
              </td>
              <td><button onClick={()=>{
                        dispatch(getUsersDetail(item.taiKhoan))
                        props.history.push(`/admin/manage-user-detail/${item.taiKhoan}`)
                    }} className="btn btn-success">Chi Tiet</button></td>
            </tr>
          ))}
        </tbody>
      </table> */}
     
    </div>
  );
};

const mapStateToProps = state => ({
  listUsersPage: state.manageUserReducer.listUsersPage,
  currentPage: state.manageUserReducer.currentPage,
  totalCount: state.manageUserReducer.totalCount
});

const mapDispatchToProps = dispatch => ({
  getListUsersPage: (currentPage, pageSize) =>
    dispatch(getListUserPage(currentPage, pageSize)),
  onChangePage: page => dispatch(changePageUsersAction(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
