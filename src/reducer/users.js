import { GET_LIST_USER, FIND_USER, ADD_USER, GET_LIST_USERS_PAGE, CHANGE_PAGE_USERS, EDIT_USER, GET_USER_EDIT } from "../constants/ManageUsers"
import {GET_USER_DETAIL} from '../constants/ManageUsers'
const initialState = {
    listUsers:[],
    listUsersPage:[],
    userDetail:{},
    currentPage:1,
    totalCount:0,
    userEdit:{}
}

const manageUserReducer = (state=initialState,action)=>{
    switch(action.type){
        case GET_LIST_USER:{
            return{
                ...state,listUsers:action.data}
        }
        case GET_LIST_USERS_PAGE:{
            return {
                ...state,listUsersPage:action.data,
                totalCount:action.data.totalCount
            }
        }
        case GET_USER_DETAIL:{
            const abc = state.listUsers.findIndex(item=>item.taiKhoan==="autolog")
            // console.log(state.listUsers[abc])
            return {
                ...state,userDetail:action.data
                
            }
        }
        case FIND_USER:{
            return{
                ...state,listUsers:action.data
            }
        }
        case ADD_USER:{
            const listUsers = [...state.listUsers]
            listUsers.push(action.data)
            return {...state, listUsers}
        }
        case CHANGE_PAGE_USERS:{
            return { ...state, currentPage: action.data };
        }
        case EDIT_USER:{
            let listUsersPage = [...state.listUsersPage.items]
            // console.log(listUsersPage)
            const index = listUsersPage.findIndex(item=>item.taiKhoan===action.data.taiKhoan);
            if(index!==-1){
                listUsersPage[index].taiKhoan=action.data.taiKhoan;
                listUsersPage[index].hoTen=action.data.hoTen;
                listUsersPage[index].email=action.data.email;
                listUsersPage[index].soDt=action.data.soDt;
                listUsersPage[index].matKhau=action.data.matKhau;
                listUsersPage[index].maLoaiNguoiDung=action.data.maLoaiNguoiDung;
            }
            
            return {...state}
        }
        case GET_USER_EDIT:{
            return{...state,userEdit:action.data}
        }
        default : return state
    }
}
export default manageUserReducer