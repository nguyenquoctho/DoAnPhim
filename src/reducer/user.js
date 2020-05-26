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

const initialState = {
  userInformation: {},
  isOpen: false,
  isOpenEdit: false,
  isOpenChangePass: false,
  accountInfo: {},
  loading:false,
  loadingShowtime:false,
  listMovieswatched:[],
  isSmall:false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO: {
        
      return { ...state, userInformation: action.data };
    }
    case TOGGLE_MODAL: {
      return { ...state, isOpen: action.data };
    }
    case TOGGLE_MODAL_EDIT: {
      return { ...state, isOpenEdit: action.data };
    }
    case TOGGLE_MODAL_CHANGE_PASS: {
      return { ...state, isOpenChangePass: action.data };
    }
    case GET_ACCOUNT_INFO: {
      const mangPhim = []
      if(action.data.thongTinDatVe){
        const thongTinDatVe = action.data.thongTinDatVe;
        thongTinDatVe.forEach(item=>mangPhim.push(item.tenPhim))
        // console.log(mangPhim)
        // console.log(thongTinDatVe)
        var listMovieswatched = mangPhim.filter((val, id,array) => {
          return  array.indexOf(val) === id;  // this just returns true
      });
      }
     
      return { ...state,listMovieswatched, accountInfo: action.data };
    }
    case EDIT_ACCOUNT_INFO: {
      const accountInfo = { ...state.accountInfo };
      accountInfo.matKhau = action.data.matKhau;
      accountInfo.hoTen = action.data.hoTen;
      accountInfo.soDT = action.data.soDT;
      accountInfo.email = action.data.email;
      
      return { ...state, accountInfo };
    }
    case CHANGE_LOADING:{
      return{...state,loading:action.data}
    }
    case CHANGE_ADMINDLAYOUT_SCREEN:{
      return{...state,isSmall:action.data}
    }
    case CHANGE_LOADING_SHOWTIME:{
      return{...state,loadingShowtime:action.data}
    }
    case CHANGE_PASS:{
      const accountInfo = { ...state.accountInfo };
      accountInfo.matKhau = action.data;
      return { ...state, accountInfo };
    }
    
    default:
      return state;
  }
};
export default userReducer;
