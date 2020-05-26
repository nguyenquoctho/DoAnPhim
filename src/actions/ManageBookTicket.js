import axios from "../utils/axios";
import * as firebase from "firebase";
import { GET_BOX_OFFICE_INFO, BOOK_TICKET, BUY_TICKET,RESET_LIST_BOOKED_TICKET, TOGGLE_MODAL_TICKET, RESET_MONEY, TOGGLE_MODAL_COMPO, CHOOSE_COMPO, GET_LIST_COMPO, ADD_COMPO, DELETE_COMPO, GET_LIST_PROMOTION, ADD_PROMOTION, GET_LIST_BOOKED_TICKET, GET_HISTORY, CONFIRM_HISTORY, DELETE_HISTORY, GET_LIST_BOOKED_TICKET_ROOM } from "../constants/ManageBookTicket";
import Swal from 'sweetalert2'
import { changeLoadingAction } from "./ManageUser";
export const getBoxOfficeInfoAction = boxOfficeInfo=>{
    return{
        type:GET_BOX_OFFICE_INFO,
        data:boxOfficeInfo
    }
}

export const getBoxOfficeInfo=(maLichChieu)=>{
    // console.log(maLichChieu)
    return dispatch=>{
        axios
        .request({
            method:"GET",
            url:`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
        })
        .then(res=>{
            dispatch(getBoxOfficeInfoAction(res.data))
            dispatch(getListBookedTicket(maLichChieu))
            console.log(res.data)
            dispatch(changeLoadingAction(false))
        })
        .catch(err=>{
            console.log(err)
        })
    }
   
}

export const bookTicketAction = values=>{
    return {
        type:BOOK_TICKET,
        data:values
    }
}

export const buyTicketAction = ()=>{
    return {
        type:BUY_TICKET
    }
}

export const buyTicket = (maLichChieu,tenPhim,tongTien,handleBookTicketSuccess)=>{
    const userInfo = JSON.parse(localStorage.getItem("userInformation"));
    return (dispatch,getState)=>{
        const {listBookedTicket} = getState().manageBookTicketReducer
        // const {tongTien} = getState().manageBookTicketReducer
        console.log(listBookedTicket)
        let lisBT = []
        listBookedTicket.forEach(item=>{
            lisBT.push(item.maGhe)
        })
        let currentdate = new Date();
        let datetime =  (currentdate.toDateString()).slice(8,10)+ "/" + currentdate.getMonth() 
        + "/" + currentdate.getFullYear() +"-"
        + currentdate.getHours() + ":" 
        + currentdate.getMinutes();
        // let idRandom = Math.floor(Math.random() * 101);
        let idRandom = `${currentdate.getMonth()}${currentdate.getDay()}${currentdate.getHours() }${currentdate.getMinutes()}${currentdate.getMilliseconds()}`
        let ve = "";
        if(lisBT.length==1){
            ve=`${listBookedTicket[0].maGhe}`
        }else{
            ve=`${listBookedTicket[0].maGhe}-${listBookedTicket[1].maGhe}`
        }


            let lsdv = firebase.database().ref(`mangDatVe/${userInfo.taiKhoan}/${idRandom}`);
            lsdv.set({
                maLichChieu:maLichChieu,
                thoiGian:datetime,
                tongTien:tongTien,
                ve:ve,
                phim:tenPhim,
                xacNhan:false
              }).then(function(snapshot) {
                // console.log('Them thanh cong')
              //   dispatch(addComboAction(comBo))
              //   dispatch(getListCombo())
               
              });
    

     
        for(let i=0;i<listBookedTicket.length;i++){
            let data = firebase.database().ref(`mangPhongVe/${maLichChieu}/${listBookedTicket[i].maGhe}`);
            data.set({
                // maGhe: listBookedTicket[i].maGhe,
                daDat: true,
                xacNhan:false,
                taiKhoan:userInfo.taiKhoan
              }).then(function(snapshot) {
                // console.log('Them thanh cong')
              //   dispatch(addComboAction(comBo))
              //   dispatch(getListCombo())
               
              });
        }
       
            Swal.fire({
                position:'center',
                icon:'success',
                title:'Đặt vé thành công',
                showConfirmButton:false,
                timer:2500
            })
            handleBookTicketSuccess()
      
        // axios
        // .request({
        //     method:"POST",
        //     url:"QuanLyDatVe/DatVe",
        //     data:{maLichChieu, danhSachVe:listBookedTicket,taiKhoanNguoiDung:userInfo.taiKhoan} 
        // })
        // .then(res=>{
        //     dispatch(buyTicketAction())
            
        //     Swal.fire({
        //         position:'center',
        //         icon:'success',
        //         title:'Đặt vé thành công',
        //         showConfirmButton:false,
        //         timer:2500
        //     })
        //     handleBookTicketSuccess()
        // })
        // .catch(err=>{
        //     console.log(err)
        //     Swal.fire({
        //         position:'center',
        //         icon:'error',
        //         title:'Đặt vé thất bại',
        //         showConfirmButton:false,
        //         timer:2500
        //     })
        // })
    }
}

export const onToggleModalTicket = (status)=>{
    return{
        type:TOGGLE_MODAL_TICKET,
        data:status
    }
}

export const onToggleModalCompo = (status)=>{
    return{
        type:TOGGLE_MODAL_COMPO,
        data:status
    }
}

export const resetMoneyAction = ()=>{
    return {
        type:RESET_MONEY
    }
}

export const chooseCompoAction = (data)=>{
    return {
        type:CHOOSE_COMPO,
        data
    }
}

export const getListComboAction = data=>{
    return{
        type:GET_LIST_COMPO,
        data
    }
}

export const getListCombo =()=>{
    return dispatch=>{
       var data = firebase.database().ref("mangCombo/");
       data.once("value").then(snapshot=>{
        let listCombo=[]
        // console.log(snapshot)
        snapshot.forEach(e=>{
            const tenCombo=e.val().tenCombo
            const maCombo = e.key
            const gia = e.val().gia
            listCombo.push({
                tenCombo:tenCombo,
                maCombo:maCombo,
                gia:gia
            })
        })
        // console.log(listCombo)
        dispatch(getListComboAction(listCombo))
    })
    }
}


export const addCombo = (comBo) => {
    return (dispatch, getState) => {
        
      var data = firebase.database().ref(`mangCombo/${comBo.maCombo}`);
      data.set({
        tenCombo: comBo.tenCombo,
        gia: comBo.gia
      }).then(function(snapshot) {
        // console.log('Them thanh cong')
        dispatch(addComboAction(comBo))
        dispatch(getListCombo())
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Thêm sản phẩm thành công!",
            showConfirmButton: false,
            timer: 2500
          });
      });
    }
  }
  export const addComboAction = (data) => {
    return {
      type: ADD_COMPO,
      data
    }
  }

  export const deleteCombo = (maCombo) => {
    return (dispatch, getState) => {
      var data = firebase.database().ref('mangCombo/');
      data.child(maCombo).remove().then(function(snapshot) {
        // console.log('Xoa thanh cong')
        dispatch(deleteComboAction(maCombo))
      });
    }
  }
  export const deleteComboAction = data => {
    return {
      type: DELETE_COMPO,
      data
    }
  }

  export const getListPromotion =()=>{
    return dispatch=>{
       var data = firebase.database().ref("mangKhuyenMai/");
       data.once("value").then(snapshot=>{
        let listPromtion=[]
        // console.log(snapshot)
        snapshot.forEach(e=>{
            const tenKM=e.val().tenKM
            const isOn=e.val().isOn
            const maKM = e.key
            const hinhAnhKM = e.val().hinhAnhKM
            const mucKM = e.val().mucKM
            const noiDungKM = e.val().noiDungKM
            listPromtion.push({
                tenKM:tenKM,
                isOn:isOn,
                maKM:maKM,
                hinhAnhKM:hinhAnhKM,
                mucKM:mucKM,
                noiDungKM:noiDungKM
            })
        })
        // console.log(listPromtion)
        dispatch(getListPromtionAction(listPromtion))
    })
    }
}
export const getListPromtionAction = data=>{
    return{
        type:GET_LIST_PROMOTION,
        data
    }
}
export const addPromotion = (promotion,valid) => {
    // console.log(promotion)
    return (dispatch, getState) => {
        
      var data = firebase.database().ref(`mangKhuyenMai/${promotion.maKM}`);
      data.set({
        tenKM: promotion.tenKM,
        hinhAnhKM:promotion.hinhAnhKM,
        isOn:valid,
        mucKM:promotion.mucKM,
        noiDungKM:promotion.noiDungKM
      }).then(function(snapshot) {
        // console.log('Them thanh cong')
        let senddata = {ma:promotion.maKM,truefalse:valid}
        dispatch(addPromotionAction(senddata))
        // dispatch(getListCombo())
        // Swal.fire({
        //     position: "center",
        //     icon: "success",
        //     title: "!",
        //     showConfirmButton: false,
        //     timer: 2500
        //   });
      });
    }
  }
  export const addPromotionAction = (data) => {
    return {
      type: ADD_PROMOTION,
      data
    }
  }

  export const getListBookedTicket =(phongVe,taiKhoan)=>{
    // console.log(phongVe)
    return dispatch=>{
       var data = firebase.database().ref(`mangPhongVe/${phongVe}`);
       data.once("value").then(snapshot=>{
        let listBookedTicketfirebase=[]
        // console.log(snapshot)
        snapshot.forEach(e=>{
            // const maGhe=e.val().tenCombo
            const maGhe = e.key
            const taiKhoan = e.val().taiKhoan
            listBookedTicketfirebase.push({
                maGhe:maGhe,
                taiKhoan:taiKhoan
                // maCombo:maCombo,
                // gia:gia
            })
        })
        // console.log(listBookedTicketfirebase)
        dispatch(getListBookedTicketAction({listBookedTicketfirebase,taiKhoan}))
    })
    }
}

export const getListBookedTicketAction = data=>{
    return{
        type:GET_LIST_BOOKED_TICKET,
        data
    }
}

export const resetListBookedTicketAction = ()=>{
  return{
      type:RESET_LIST_BOOKED_TICKET,
      
  }
}

export const fetchHistory =(taiKhoan)=>{
    return dispatch=>{
       var data = firebase.database().ref(`mangDatVe/${taiKhoan}`);
       data.once("value").then(snapshot=>{
        let history=[]
        // console.log(snapshot)
        snapshot.forEach(e=>{
            const maLichChieu=e.val().maLichChieu
            const id = e.key
            const phim = e.val().phim
            const thoiGian=e.val().thoiGian
            const tongTien = e.val().tongTien
            const ve = e.val().ve
            const xacNhan = e.val().xacNhan
            history.push({
                maLichChieu:maLichChieu,
                id:id,
                phim:phim,
                thoiGian:thoiGian,
                tongTien:tongTien,
                ve:ve,
                xacNhan:xacNhan
            })
        })
        console.log(history)
        dispatch(fetchHistoryAction(history))
    })
    }
}

export const fetchHistoryAction = data=>{
    return{
        type:GET_HISTORY,
        data
    }
}

export const confirmHistory =(historyItem,taiKhoan)=>{
    console.log(historyItem)
    console.log(taiKhoan)
    return dispatch=>{
        let data = firebase.database().ref(`mangDatVe/${taiKhoan}/${historyItem.id}`);
        data.set({
            xacNhan: true,
            maLichChieu:historyItem.maLichChieu,
            thoiGian:historyItem.thoiGian,
            tongTien:historyItem.tongTien,
            ve:historyItem.ve,
            phim:historyItem.phim,
               
          }).then(function(snapshot) {
            // console.log('Them thanh cong')
         
          
            dispatch(confirmHistoryAction(historyItem.id))
            // Swal.fire({
            //     position: "center",
            //     icon: "success",
            //     title: "!",
            //     showConfirmButton: false,
            //     timer: 2500
            //   });
          });
          if(historyItem.ve.length==5){
            let confirmseat = firebase.database().ref(`mangPhongVe/${historyItem.maLichChieu}/${historyItem.ve.slice(0,5)}`);
            confirmseat.set({
              xacNhan: true,
              daDat:true,
              taiKhoan:taiKhoan
                 
            }).then(function(snapshot) {
              // console.log('Them thanh cong')
            //   dispatch(confirmHistoryAction(historyItem.id))
              Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "!",
                  showConfirmButton: false,
                  timer: 2500
                });
            });
          }else{
            let confirmseat = firebase.database().ref(`mangPhongVe/${historyItem.maLichChieu}/${historyItem.ve.slice(0,5)}`);
            confirmseat.set({
                xacNhan: true,
                daDat:true,
                taiKhoan:taiKhoan
                 
            }).then(function(snapshot) {
              // console.log('Them thanh cong')
            //   dispatch(confirmHistoryAction(historyItem.id))
            //   Swal.fire({
            //       position: "center",
            //       icon: "success",
            //       title: "!",
            //       showConfirmButton: false,
            //       timer: 2500
            //     });
            });
            let confirmseat1 = firebase.database().ref(`mangPhongVe/${historyItem.maLichChieu}/${historyItem.ve.slice(6,11)}`);
            confirmseat1.set({
                xacNhan: true,
                daDat:true,
                taiKhoan:taiKhoan
                 
            }).then(function(snapshot) {
              // console.log('Them thanh cong')
            //   dispatch(confirmHistoryAction(historyItem.id))
              Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "!",
                  showConfirmButton: false,
                  timer: 2500
                });
            });
          }
         
     }
}
export const confirmHistoryAction = (data)=>{
    return{
        type:CONFIRM_HISTORY,
        data
    }
}

export const deleteHistory = (historyItem,taiKhoan) => {
    return (dispatch, getState) => {
      let data = firebase.database().ref(`mangDatVe/${taiKhoan}/`);
      let stt=historyItem.id;
      data.child(stt).remove().then(function(snapshot) {
        // console.log('Xoa thanh cong')
        dispatch(deleteHistoryAction(historyItem.id))
      });
      if(historyItem.ve.length==5){
        let daleteSeat = firebase.database().ref(`mangPhongVe/${historyItem.maLichChieu}/`);
        let ve1=historyItem.ve
        daleteSeat.child(ve1).remove().then(function(snapshot) {
          // console.log('Xoa thanh cong')
          // dispatch(deleteComboAction(maCombo))
        });
      }else{
        let daleteSeat1 = firebase.database().ref(`mangPhongVe/${historyItem.maLichChieu}/`);
        let ve2=historyItem.ve.slice(0,5)
        daleteSeat1.child(ve2).remove().then(function(snapshot) {
          // console.log('Xoa thanh cong')
          // dispatch(deleteComboAction(maCombo))
        });
        let daleteSeat2 = firebase.database().ref(`mangPhongVe/${historyItem.maLichChieu}/`);
        let ve3=historyItem.ve.slice(6,11)
        daleteSeat2.child(ve3).remove().then(function(snapshot) {
          // console.log('Xoa thanh cong')
          // dispatch(deleteComboAction(maCombo))
        });
      }
      Swal.fire({
        position: "center",
        icon: "success",
        title: "!",
        showConfirmButton: false,
        timer: 2500
      });
    }
  }
  export const deleteHistoryAction = data => {
    return {
      type: DELETE_HISTORY,
      data
    }
  }

  export const getListBookedTicketRoom =(maLichChieu)=>{
    return dispatch=>{
       var data = firebase.database().ref(`mangPhongVe/${maLichChieu}`);
       data.once("value").then(snapshot=>{
        let listBookedTicketRoom=[]
        // console.log(snapshot)
        snapshot.forEach(e=>{
            const daDat=e.val().daDat
            const taiKhoan=e.val().taiKhoan
            const maGhe = e.key
            const xacNhan = e.val().xacNhan
           
            listBookedTicketRoom.push({
                maGhe:maGhe,
                daDat:daDat,
                taiKhoan:taiKhoan,
                xacNhan:xacNhan,
            })
        })
        console.log(listBookedTicketRoom)
        dispatch(getListBookedTicketRoomAction(listBookedTicketRoom))
    })
    }
}
export const getListBookedTicketRoomAction = data=>{
    return{
        type:GET_LIST_BOOKED_TICKET_ROOM,
        data
    }
}