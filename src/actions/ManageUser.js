import {
  GET_USER_INFO,
  TOGGLE_MODAL,
  GET_ACCOUNT_INFO,
  EDIT_ACCOUNT_INFO,
  CHANGE_LOADING,
  CHANGE_LOADING_SHOWTIME,
  TOGGLE_MODAL_EDIT,
  TOGGLE_MODAL_CHANGE_PASS,
  CHANGE_PASS,
  CHANGE_ADMINDLAYOUT_SCREEN
} from "../constants/ManageUser";
import axios, { setAuthorization } from "../utils/axios";
import Swal from "sweetalert2";
import { GET_USER_MOVIE } from "../constants/ManageMovie";
export const getUserInfo = user => {
  return {
    type: GET_USER_INFO,
    data: user
  };
};

export const logInAction = (values, handleSuccess) => {
  return (dispatch, getState) => {
    axios
      .request({
        method: "POST",
        url: "QuanLyNguoiDung/DangNhap",
        data: { ...values, maNhom: "GP10" }
      })
      .then(res => {
        setAuthorization(res.data.accessToken);
        localStorage.setItem("userInformation", JSON.stringify(res.data));
        dispatch(getUserInfo(res.data));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Đang nhập thành công!",
          showConfirmButton: false,
          timer: 2500
        });
        handleSuccess();
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Tài khoản hoặc mật khẩu không đúng?",
          showConfirmButton: false,
          timer: 2500
        });
      });
  };
};

export const signUp = (values, handleSuccess) => {
  return dispatch => {
    axios
      .request({
        method: "POST",
        url: "QuanLyNguoiDung/DangKy",
        data: { ...values, maNhom: "GP10", maLoaiNguoiDung: "KhachHang" }
      })
      .then(res => {
        handleSuccess();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Đăng kí thành công",
          showConfirmButton: false,
          timer: 2500
        });
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Tài khoản hoặc email đã tồn tại",
          showConfirmButton: false,
          timer: 2500
        });
      });
  };
};

export const onToggleModal = status => {
  return {
    type: TOGGLE_MODAL,
    data: status
  };
};

export const onToggleModalEdit = status => {
  return {
    type: TOGGLE_MODAL_EDIT,
    data: status
  };
};

export const onToggleModalChangePass = status => {
  return {
    type: TOGGLE_MODAL_CHANGE_PASS,
    data: status
  };
};

export const getAccountInfoAction = data => {
  return {
    type: GET_ACCOUNT_INFO,
    data
  };
};

export const getUserMoviesAction = data => {
  return {
    type: GET_USER_MOVIE,
    data
  };
};

export const getAccountInfo = taiKhoan => {
  // console.log(taiKhoan);
  const data = { taiKhoan };
  return dispatch => {
    axios
      .request({
        method: "POST",
        url: "/QuanLyNguoiDung/ThongTinTaiKhoan",
        data
      })
      .then(result => {
        // console.log("asdasdasdasdasdasd");
        dispatch(getAccountInfoAction(result.data));
        dispatch(changeLoadingAction(false))
        dispatch(getUserMoviesAction(result.data.thongTinDatVe))
      })
      .catch(error => {
        console.log(error);
      });
  };
};
export const editAccountInfoAction = data=>{
  return{
      type:EDIT_ACCOUNT_INFO,
      data
  }
}

export const editAccountInfo = values=>{
  // console.log(values)
  return (dispatch,getState)=>{
    const {userInformation} = getState().userReducer
    const userInfo = JSON.parse(localStorage.getItem("userInformation"));
    // console.log(userInformation)
    // console.log(userInformation.maLoaiNguoiDung)
      axios
      .request({
          method:"PUT",
          url:"QuanLyNguoiDung/CapNhatThongTinNguoiDung",
          data:{...values,maLoaiNguoiDung:userInformation.maLoaiNguoiDung,maNhom:"GP10"}
      })
      .then(res=>{
          dispatch(editAccountInfoAction(values));
        //   Swal.fire({
        //     position:'center',
        //     icon:'success',
        //     title:'Cập nhật thông tin thành công!',
        //     showConfirmButton:false,
        //     timer:2500
        // })
        alert("Cập nhật thông tin thành công!")
      })
      .catch(err=>{
          console.log(err);
          Swal.fire({
            position:'center',
            icon:'error',
            title:'Vui lòng nhập lại!',
            showConfirmButton:false,
            timer:2500
        })
      })
  }
}

export const changePassAction = data=>{
  return{
      type:CHANGE_PASS,
      data
  }
}


export const changePassAccount = values=>{
  return (dispatch,getState)=>{
    const {userInformation} = getState().userReducer
    const userInfo = JSON.parse(localStorage.getItem("userInformation"));
    // console.log(userInformation)
    // console.log(userInformation.maLoaiNguoiDung)
      axios
      .request({
          method:"PUT",
          url:"QuanLyNguoiDung/CapNhatThongTinNguoiDung",
          data:{...values,maLoaiNguoiDung:userInformation.maLoaiNguoiDung,maNhom:"GP10"}
      })
      .then(res=>{
        dispatch(changePassAction(values.matKhau));
        //   Swal.fire({
        //     position:'center',
        //     icon:'success',
        //     title:'Đã thay đổi mật khẩu',
        //     showConfirmButton:false,
        //     timer:2500
        // })
        alert("Đã cập nhật mật khẩu!")
      })
      .catch(err=>{
          console.log(err);
          Swal.fire({
            position:'center',
            icon:'error',
            title:'mật khẩu không đúng!',
            showConfirmButton:false,
            timer:2500
        })
      })
  }
}

export const changeLoadingAction = data=>{
  return{
      type:CHANGE_LOADING,
      data
  }
}

export const changeLoadingShowtimeAction = data=>{
  return{
      type:CHANGE_LOADING_SHOWTIME,
      data
  }
}

export const changeAdmindLayoutScreenAction = data=>{

  return{
      type:CHANGE_ADMINDLAYOUT_SCREEN,
      data
  }
}