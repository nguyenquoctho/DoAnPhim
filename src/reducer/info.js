import { FETCH_INFO, GET_INFO_DETAIL, DELETE_INFO, SHOW_FORM } from "../constants/ManageInfo";

const initialState = {
    listInfo:[],
    infoDetail:"",
    showForm:false
  };

  const infoReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_INFO:{
            return{...state,listInfo:action.data};
        }
        case GET_INFO_DETAIL:{
          let listInfo =[...state.listInfo];
          let index = listInfo.findIndex(item=>item.maInfo===action.data)
          let infoDetail=listInfo[index].chitiet;
          // console.log(infoDetail)
          return{...state,infoDetail}
        }
        case DELETE_INFO: {
          const listInfo = [...state.listInfo]
          const index = listInfo.findIndex(item => item.maInfo === action.data)
          if(index !== -1) {
            listInfo.splice(index, 1)
              // console.log(listInfo)
          }
          return {...state, listInfo}
      }
      case SHOW_FORM:{
        return{...state,showForm:action.data}
      }
    default :return state}
  }

  export default infoReducer