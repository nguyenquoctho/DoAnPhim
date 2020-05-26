import axios from "../utils/axios";
import { GET_LIST_USER, GET_USER_DETAIL, FIND_USER, ADD_USER, GET_LIST_USERS_PAGE, CHANGE_PAGE_USERS, EDIT_USER, GET_USER_EDIT } from "../constants/ManageUsers";
import Swal from 'sweetalert2';
import { changeLoadingAction } from "./ManageUser";
export const getListUserAction = listUser=>{
    return{
        type:GET_LIST_USER,
       data:listUser
    }
}

export const getListUser = ()=>{
    return dispatch=>{
        axios
        .request({

            method:"GET",
            url:"QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP10"
        })
        .then(res=>{
            dispatch(getListUserAction(res.data))
        })
        .catch(err=>{
            console.log(err)
        })
    }
} 

export const getListUsersPageAction = listUsersPage=>{
    return {
        type:GET_LIST_USERS_PAGE,
        data:listUsersPage
    }
}


export const getListUserPage = (currentPage,pageSize)=>{
    return dispatch=>{
        axios
        .request({
            method:"GET",
            url:`QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP10&soTrang=${currentPage}&soPhanTuTrenTrang=${pageSize}`
        })
        .then(res=>{
            dispatch(getListUsersPageAction(res.data));
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export const deleteUser = (taiKhoan)=>{
    return (dispatch,getState)=>{
        const {currentPage} = getState().manageUserReducer
        axios
        .request({
            method:"DELETE",
            url: `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
        })
        .then(res=>{
            dispatch(getListUserPage(currentPage,10))
            // console.log('da xoa')
            Swal.fire({
                position:'center',
                icon:'success',
                title:'Đã xóa',
                showConfirmButton:false,
                timer:2500
            })
        })
        .catch(err=>{
            console.log(err)
            Swal.fire({
                position:'center',
                icon:'error',
                title:'Xác minh lịch sử đặt vé',
                showConfirmButton:false,
                timer:2500
            })
        })
    }
}
export const getUsersDetailAction = userDetail=>{
    return{
        type:GET_USER_DETAIL,
        data:userDetail
    }
}

export const getUsersDetail = taiKhoan=>{
    //chua lam giao dien
    const data = {taiKhoan}
    return dispatch=>{
        axios.request({
            method:"POST",
            url:"QuanLyNguoiDung/ThongTinTaiKhoan",
            data
        })
        .then(res=>{
            dispatch(getUsersDetailAction(res.data))
            dispatch(changeLoadingAction(false))
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export const findUserAction=data=>{
    return {
        type:FIND_USER,
        data
    }
}

export const findUser = (tuKhoa,currentPage,pageSize) =>{
    // console.log(tuKhoa)
    return dispatch=>{
        axios.request({
            method:"GET",
            url:`QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=GP10&tuKhoa=${tuKhoa}&soTrang=${currentPage}&soPhanTuTrenTrang=${pageSize}`
        })
        .then(res=>{
            console.log(res)
            // dispatch(findUserAction(res.data))
            dispatch(getListUsersPageAction(res.data))
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export const addUserAction = user=>{
    return {
        type:ADD_USER,
        data:user
    }
}

export const addUser=values =>{
    return (dispatch,getState) => {
        const {currentPage} = getState().manageUserReducer
        axios
          .request({
            method: "POST",
            url: "QuanLyNguoiDung/ThemNguoiDung",
            data: { ...values, maNhom: "GP10" }
          })
          .then(result => {
            dispatch(addUserAction(result.data));
            dispatch(getListUserPage(currentPage,10))
            Swal.fire({
                position:'center',
                icon:'success',
                title:'da them',
                showConfirmButton:false,
                timer:2500
            })
          })
          .catch(error => {
            console.log(error);
            Swal.fire({
                position:'center',
                icon:'error',
                title:'tai khoan da ton tai!',
                showConfirmButton:false,
                timer:2500
            })
          });
      };
}

export const changePageUsersAction = page => {
    return {
      type: CHANGE_PAGE_USERS,
      data: page
    };
  };

  export const editUserAction = data=>{
      console.log(data)
      return{
          type:EDIT_USER,
          data
      }
  }

  export const getUserEditAction = userDetail=>{
    //   console.log(userDetail)
    return{
        type:GET_USER_EDIT,
        data:userDetail
    }
}

  export const editUser = values=>{
      return (dispatch,getState)=>{
        // const {listUsers} = getState().manageUserReducer
        // console.log()
          axios
          .request({
              method:"PUT",
              url:"QuanLyNguoiDung/CapNhatThongTinNguoiDung",
              data:{...values,maNhom:"GP10"}
          })
          .then(res=>{
              dispatch(editUserAction(values));

              Swal.fire({
                position:'center',
                icon:'success',
                title:'da sua',
                showConfirmButton:false,
                timer:2500
            })
          })
          .catch(err=>{
              console.log(err);
              Swal.fire({
                position:'center',
                icon:'error',
                title:'vui long nhap lai!',
                showConfirmButton:false,
                timer:2500
            })
          })
      }
  }