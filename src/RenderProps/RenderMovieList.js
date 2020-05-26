import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListMoviesPage } from '../actions/ManageMovie';

const RenderMovieList=(props)=> {
    const dispatch = useDispatch();
    const {currentPage,totalCount,movieListPage}  = useSelector(state=>state.manageMovieReducer)
    
    useEffect(()=>{
        dispatch(getListMoviesPage(currentPage,10))
    },[currentPage])
    return (
        <div>
            {props.render({movieListPage,currentPage,totalCount})}
        </div>
    )
}


export default RenderMovieList
