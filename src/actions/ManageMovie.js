import { GET_MOVIE_LIST, GET_MOVIE_INFO, ADD_MOVIE, CHANGE_PAGE, GET_MOVIE_LIST_PAGE, EDIT_MOVIE, CHOOSE_THEATER, FIND_MOVIE, GET_TRAILER, TOGGLE_MODAL_TRAILER, DELETE_MOVIE, GET_CURRENT_THEATER_DETAIL, GET_LIST_MOVIE_WATCHED, FETCH_FILM_COMMENT, ADD_FILM_COMMENT, FETCH_FILM_EVALUTE, EVALUTE_FILM } from "../constants/ManageMovie"
import axios from "../utils/axios";
import Swal from 'sweetalert2';
import { changeLoadingAction } from "./ManageUser";
import * as firebase from "firebase";

export const getListMoviesAction = movieList=>{
    return {
        type:GET_MOVIE_LIST,
        data:movieList
    }
}
export const getListMoviesPageAction = movieListPage=>{
    return {
        type:GET_MOVIE_LIST_PAGE,
        data:movieListPage
    }
}

export const getListMovies = ()=>{
    return dispatch=>{
        axios
        .request({
            method:"GET",
            url:"QuanLyPhim/LayDanhSachPhim?maNhom=GP10"
        })
        .then(res=>{
            
            dispatch(getListMoviesAction(res.data))
          
          
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export const getListMoviesPage = (currentPage,pageSize)=>{
    return dispatch=>{
        axios
        .request({
            method:"GET",
            url:`QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP10&soTrang=${currentPage}&soPhanTuTrenTrang=${pageSize}`
        })
        .then(res=>{
            dispatch(getListMoviesPageAction(res.data))
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

export const deleteMovieAction = data=>{
    return{
        type:DELETE_MOVIE,
        data
    }
}


export const deleteMovie = (maPhim)=>{
    // console.log(maPhim)
    //chua xong
    return (dispatch,getState)=>{
        const {currentPage} = getState().manageMovieReducer
        axios
        .request({
            method:'DELETE',
            url: `QuanLyPhim/XoaPhim?MaPhim=${maPhim}`
        })
        .then(res=>{
            // console.log(res)
            dispatch(getListMoviesPage(currentPage,10))
            // console.log('da xoa');
            Swal.fire({
                position:'center',
                icon:'success',
                title:'Xóa thành công!',
                showConfirmButton:false,
                timer:2500
            })
        })
        .catch(err=>{
            console.log(err)
            Swal.fire({
                position:'center',
                icon:'error',
                title:'Phim đã có lịch chiếu!',
                showConfirmButton:false,
                timer:2500
            })
        })
    }
}

export const getMovieInfoAction = data=>{
    return{
        type:GET_MOVIE_INFO,
        data
    }
}
export const getMovieInfo=(maPhim)=>{
    return dispatch=>{
        axios.request({
            method:"GET",
            url:`QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`
        })
        .then(res=>{
            dispatch(getMovieInfoAction(res.data));
            dispatch(changeLoadingAction(false))
        })
        .catch(err=>{
            console.log(err)
        })
    }
}
export const addMovieAction=movie=>{
    return{
        type:ADD_MOVIE,
        data:movie
    }
}
export const addMovie = values=>{
    // console.log(values.ngayKhoiChieu)
    const day = values.ngayKhoiChieu.slice(8,10);
    // console.log(day)
    const year = values.ngayKhoiChieu.slice(0,4);
    // console.log(year)
    const month = values.ngayKhoiChieu.slice(5,7);
    // console.log(month)
    // console.log(values)
    
    const dataSubmit = {
        ...values,
        maPhim:1001,
        hinhAnh:values.hinhAnh.name,
        danhGia:5,
        biDanh:values.tenPhim,
        maNhom:"GP10",
        ngayKhoiChieu:`${day}-${month}-${year}`
    }
    // console.log(dataSubmit)
    
    return (dispatch,getState)=>{
        const {currentPage} = getState().manageMovieReducer
        axios
        .request({
            method:"POST",
            url:"QuanLyPhim/ThemPhim",
            data:dataSubmit
        })
        .then(res=>{
            // console.log(res)
            // console.log(res.data.maPhim)
            let formData=new FormData();
            formData.append("File",values.hinhAnh,values.hinhAnh.name)
            formData.append("tenphim",values.tenPhim)
            formData.append("manhom","GP10")
            axios.request({
                method:"POST",
                url:"QuanLyPhim/UploadHinhAnhPhim",
                data:formData
            })
            .then(res=>{
                // console.log(res)
            })
            .catch(err=>{
                console.log(err.data)
            })
            dispatch(getListMoviesPage(currentPage,10))
            Swal.fire({
                position:'center',
                icon:'success',
                title:'Đã thêm',
                showConfirmButton:false,
                timer:2500
            })
        })
        .catch(err=>{
            console.log(err);
            Swal.fire({
                position:'center',
                icon:'error',
                title:'Vui lòng nhập lại',
                showConfirmButton:false,
                timer:2500
            })
        })
    }
}

export const changePageAction = page => {
    return {
      type: CHANGE_PAGE,
      data: page
    };
  };

  
  export const editMovieAction = movieDetail=>{
    return{
        type:EDIT_MOVIE,
        data:movieDetail
    }
}

export const editMovie = values=>{
    // console.log(values.ngayKhoiChieu)
    const day = values.ngayKhoiChieu.slice(8,10);
    // console.log(day)
    const year = values.ngayKhoiChieu.slice(0,4);
    // console.log(year)
    const month = values.ngayKhoiChieu.slice(5,7);
    // console.log(month)
    // console.log(values)
    const dataSubmit = {
        ...values,
        hinhAnh:values.hinhAnh,
        ngayKhoiChieu:`${day}-${month}-${year}`,
        maNhom:"GP10"
    }
    // console.log(dataSubmit)
    return (dispatch)=>{
        axios
        .request({
            method:"POST",
            url:"QuanLyPhim/CapNhatPhim",
            data:dataSubmit
        })
        .then(res=>{
            // let formData=new FormData();
            // formData.append("File",values.hinhAnh,values.hinhAnh.name)
            // formData.append("tenphim",values.tenPhim)
            // formData.append("manhom","GP10")
            // axios.request({
            //     method:"POST",
            //     url:"QuanLyPhim/UploadHinhAnhPhim",
            //     data:formData
            // })
            // .then(res=>{
            //     console.log(res)
            // })
            // .catch(err=>{
            //     console.log(err.data)
            // })
            // dispatch(getMovieInfo(values.maPhim));
            dispatch(editMovieAction(values))
            Swal.fire({
                position:'center',
                icon:'success',
                title:'Đã sửa',
                showConfirmButton:false,
                timer:2500
            })
        })
        .catch(err=>{
            console.log(err)
            Swal.fire({
                position:'center',
                icon:'error',
                title:'Vui lòng nhập lại',
                showConfirmButton:false,
                timer:2500
            })
        })
    }
}

export const updateImg = values=>{
    return (dispatch,getState)=>{
        const {movieDetail} = getState().manageMovieReducer
            let formData=new FormData();
            formData.append("File",values.hinhAnh,values.hinhAnh.name)
            formData.append("tenphim",movieDetail.tenPhim)
            formData.append("manhom","GP10")
            axios.request({
                method:"POST",
                url:"QuanLyPhim/UploadHinhAnhPhim",
                data:formData
            })
            .then(res=>{
                // console.log(res)
                dispatch(getMovieInfo(movieDetail.maPhim));
                Swal.fire({
                position:'center',
                icon:'success',
                title:'Đã sửa',
                showConfirmButton:false,
                timer:2500
            })
            })
            .catch(err=>{
                console.log(err)
            })
    }
}

export const chooseTheaterOfMovieAction=theater=>{
    return{
        type:CHOOSE_THEATER,
        data:theater
    }
}
// 2019-01-01T10:10:00
export const createShowtime = values=>{
    const date = new Date()
    // console.log(values)
//     const dataSubmit = {...values,
        
//     ngayChieuGioChieu:"",
//     // `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
// }
   
    // console.log(values.ngayChieuGioChieu)
    const day = values.ngayChieuGioChieu.slice(8,10);
   
    const year = values.ngayChieuGioChieu.slice(0,4);
    
    const month = values.ngayChieuGioChieu.slice(5,7);
    const time = values.ngayChieuGioChieu.slice(11,16);
    // console.log(time)
    const ngayChieuGioChieu = `${day}/${month}/${year} ${time}:00`
    // console.log(ngayChieuGioChieu);
    // console.log(values)
    values.ngayChieuGioChieu = ngayChieuGioChieu;
    // console.log(values)
    // console.log(dataSubmit)
    return (dispatch,getState)=>{
        const {movieDetail} = getState().manageMovieReducer
        // console.log(movieDetail.maPhim)
        axios
        .request({
            method:"POST",
            url:"QuanLyDatVe/TaoLichChieu",
            data:{maPhim:movieDetail.maPhim,...values}
        })
        .then(res=>{
            Swal.fire({
                position:'center',
                icon:'success',
                title:'Tạo lịch chiếu thành công',
                showConfirmButton:false,
                timer:2500
            })
        })
        .catch(err=>{
            console.log(err)
            Swal.fire({
                position:'center',
                icon:'error',
                title:'Vui lòng nhập lại',
                showConfirmButton:false,
                timer:2500
            })
        })
    }
}

export const findMovieAction=data=>{
    return {
        type:FIND_MOVIE,
        data
    }
}

export const findMovie = tenPhim =>{
    // console.log(tenPhim)
  
    return dispatch=>{
        axios.request({
            method:"GET",
            url:`QuanLyPhim/LayDanhSachPhim?maNhom=GP10&tenPhim=${tenPhim}`
        })
        .then(res=>{
            // console.log(res)
            dispatch(findMovieAction(res.data))
            // dispatch(getListUsersPageAction(res.data))
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export const getTrailerAction = data=>{
    return{
        type:GET_TRAILER,
        data
    }
}

export const onToggleModalTrailer = (status)=>{
    return{
        type:TOGGLE_MODAL_TRAILER,
        data:status
    }
}


export const fetchFilmComment =(maPhim)=>{
    return dispatch=>{
       var data = firebase.database().ref(`mangComment/${maPhim}`);
       data.once("value").then(snapshot=>{
        let danhSachComment=[]
        // console.log(snapshot)
        snapshot.forEach(e=>{
            const ten=e.val().ten
            const taiKhoan = e.key
            const comment = e.val().comment
            const email=e.val().email
            const danhgia = e.val().danhgia
            danhSachComment.push({
                ten:ten,
                taiKhoan:taiKhoan,
                comment:comment,
                email:email,
                danhgia:danhgia
            })
        })
        // console.log(danhSachComment)
        dispatch(fetchFilmCommentAction(danhSachComment))
    })
    }
}

export const fetchFilmCommentAction = data=>{
    return{
        type:FETCH_FILM_COMMENT,
        data
    }
}


export const addFilmComment =(values,maPhim)=>{
    // console.log(values.comment,values.ten)
    return dispatch=>{
       var data = firebase.database().ref(`mangComment/${maPhim}/${values.taiKhoan}`);
       data.set({comment:values.comment,ten:values.ten,email:values.email,danhgia:values.danhgia}).then(snapshot => {
        dispatch(addFilmCommentAction(values))
       })
}
}

export const addFilmCommentAction = data=>{
    return{
        type:ADD_FILM_COMMENT,
        data
    }
}

export const fetchFilmEvalute =(maPhim)=>{
    return dispatch=>{
       var data = firebase.database().ref(`mangdanhgia/${maPhim}`);
       data.once("value").then(snapshot=>{
        let danhSachDanhGia=[]
        // console.log(snapshot)
        snapshot.forEach(e=>{
            const danhgia=e.val().danhgia
            const taiKhoan = e.key
            danhSachDanhGia.push({
                danhgia:danhgia,
                taiKhoan:taiKhoan
            })
        })
        // console.log(danhSachComment)
        dispatch(fetchFilmEvaluteAction(danhSachDanhGia))
    })
    }
}

export const fetchFilmEvaluteAction = data=>{
    return{
        type:FETCH_FILM_EVALUTE,
        data
    }
}

export const addFilmEvalute =(values,maPhim)=>{
    // console.log()
    return dispatch=>{
       var data = firebase.database().ref(`mangdanhgia/${maPhim}/${values.taiKhoan}`);
       data.set({danhgia:values.danhgia}).then(snapshot => {
        dispatch(addFilmEvaluteAction(values))
       })
}
}

export const addFilmEvaluteAction = data=>{
    return{
        type:EVALUTE_FILM,
        data
    }
}