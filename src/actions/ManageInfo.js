import axios from "../utils/axios";
import * as firebase from "firebase";
import Swal from 'sweetalert2'
import { FETCH_INFO, GET_INFO_DETAIL, DELETE_INFO, SHOW_FORM } from "../constants/ManageInfo";

export const getListInfoAction = data=>{
    return{
        type:FETCH_INFO,
        data
    }
}

export const getListInfo =()=>{
    return dispatch=>{
       var data = firebase.database().ref("mangThongTin/");
       data.once("value").then(snapshot=>{
        let listInfo=[]
        // console.log(snapshot)
        snapshot.forEach(e=>{
            const tieude=e.val().tieude
            const maInfo = e.key
            const noidung = e.val().noidung
            const hinhanh = e.val().hinhanh
            const chitiet = e.val().chitiet
            listInfo.push({
                tieude:tieude,
                maInfo:maInfo,
                noidung:noidung,
                hinhanh:hinhanh,
                chitiet:chitiet
            })
        })
        // console.log(listInfo)
        dispatch(getListInfoAction(listInfo))
    })
    }
}

export const getInfoDetail = data=>{
    return{
        type:GET_INFO_DETAIL,
        data
    }
}

export const deleteInfo = (maCombo) => {
    return (dispatch, getState) => {
      var data = firebase.database().ref('mangThongTin/');
      data.child(maCombo).remove().then(function(snapshot) {
        // console.log('Xoa thanh cong')
        dispatch(deleteInfoAction(maCombo))
      });
    }
  }
  export const deleteInfoAction = data => {
    return {
      type: DELETE_INFO,
      data
    }
  }

  export const addInfo = (info) => {
    // console.log(info)
    return (dispatch, getState) => {
        
      var data = firebase.database().ref(`mangThongTin/${info.maThongTin}`);
      data.set({
        tieude: info.tieude,
        noidung: info.noidung,
        hinhanh: info.hinhanh,
        chitiet: info.chitiet,
      }).then(function(snapshot) {
        // console.log('Them thanh cong')
        // dispatch(addComboAction(comBo))
        dispatch(getListInfoAction())
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Thêm thong tin thành công!",
            showConfirmButton: false,
            timer: 2500
          });
      });
    }
  }

  export const showFormAction = data => {
    return {
      type: SHOW_FORM,
      data
    }
  }