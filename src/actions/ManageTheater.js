import { GET_LIST_THEATERS, GET_THEATER_INFO, GET_ONE_GROUP_THEATER, GET_MOVIE_SHOWTIME, GET_CURRENT_THEATER, GET_CURRENT_CUM_RAP, GET_CURRENT_DANH_SACH_PHIM, GET_CURRENT_THEATER_NAME, GET_CURRENT_THEATER_DATE, GET_CURRENT_THEATER_ADMIN, RESET_CURRENT_THEATER, RESET_CURRENT_THEATER_DAYTIME_TEMPORATY } from "../constants/ManageTheaters"
import axios from "../utils/axios";
import { changeLoadingShowtimeAction } from "./ManageUser";
export const getListTheatersAction = listTheaters=>{
    return{
        type:GET_LIST_THEATERS,
        data:listTheaters
    }
}

export const getListTheaters=()=>{
    return dispatch=>{
        axios
        .request({
            method:"GET",
            url:"QuanLyRap/LayThongTinHeThongRap"
        })
        .then(res=>{
            dispatch(getListTheatersAction(res.data))
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export const getTheaterInfoAction = theaterInfo=>{
    return{
        type:GET_THEATER_INFO,
        data:theaterInfo
    }

}

export const getTheaterShowTimeInfo = (maHeThongRap)=>{
    // console.log(maHeThongRap)
    return dispatch=>{
        axios.request({
            method:"GET",
            url:`QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP10`
        })

        .then(res=>{
            dispatch(getTheaterInfoAction(res.data))
            setTimeout(()=> {
                dispatch(changeLoadingShowtimeAction(false))
            }, 700)
            
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export const getOneGroupTheaterAction = data=>{
    return{
        type:GET_ONE_GROUP_THEATER,
        data
    }
}

export const getOneGroupTheater=maHeThongRap=>{
    return dispatch=>{
        axios.request({
            method:"GET",
            url:`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
        })
        .then(res=>{
            console.log(res.data)
            dispatch(getOneGroupTheaterAction(res.data))
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export const getMovieShowtimeAction = data=>{
    return {
        type:GET_MOVIE_SHOWTIME,
        data
    }
}

export const getMovieShowtime=maPhim=>{
    // console.log(maPhim)
    return dispatch=>{
        axios.request({
            method:"GET",
            url:`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
        })
        .then(res=>{
            // console.log(res.data)
            dispatch(getMovieShowtimeAction(res.data))
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export const getCurrentTheater = data=>{
    return {
        type:GET_CURRENT_THEATER,
        data
    }
}
export const getCurrentCumRap = data=>{
    return {
        type:GET_CURRENT_CUM_RAP,
        data
    }
}

export const getCurrentDanhSachPhim = data=>{
    return {
        type:GET_CURRENT_DANH_SACH_PHIM,
        data
    }
}

export const getCurrentTheaterNameAction = data=>{
    // console.log(data)
    return {
        type:GET_CURRENT_THEATER_NAME,
        data
    }
}

export const getCurrentTheaterDateAction = data=>{
    // console.log(data)
    return {
        type:GET_CURRENT_THEATER_DATE,
        data
    }
}

export const changeTheater = data=>{
    // console.log(data)
    return {
        type:GET_CURRENT_THEATER_ADMIN,
        data
    }
}
export const resetCurrrentTheater = (data)=>{
    // console.log(data)
    return {
        type:RESET_CURRENT_THEATER,
        data
    }
}

export const resetCurrentTheaterDayTimeTemporaryAction = ()=>{
    // console.log(data)
    return {
        type:RESET_CURRENT_THEATER_DAYTIME_TEMPORATY,
        
    }
}