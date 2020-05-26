import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListUserPage } from '../actions/ManageUsers';
import { changeLoadingAction } from '../actions/ManageUser';


const RenderUsersList=(props)=> {
    const dispatch = useDispatch();
    const {currentPage,totalCount,listUsersPage}  = useSelector(state=>state.manageUserReducer)
    
    useEffect(()=>{
        dispatch(getListUserPage(currentPage,10));
        
    },[currentPage])
    return (
        <div>
            {props.render({listUsersPage,currentPage,totalCount})}
        </div>
    )
}


export default RenderUsersList
