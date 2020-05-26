import {
  GET_MOVIE_LIST,
  GET_MOVIE_INFO,
  ADD_MOVIE,
  CHANGE_PAGE,
  GET_MOVIE_LIST_PAGE,
  EDIT_MOVIE,
  CHOOSE_THEATER,
  FIND_MOVIE,
  GET_TRAILER,
  TOGGLE_MODAL_TRAILER,
  DELETE_MOVIE,
  // GET_CURRENT_THEATER_DETAIL,
  // GET_LIST_MOVIE_WATCHED,
  GET_USER_MOVIE,
  FETCH_FILM_COMMENT,
  ADD_FILM_COMMENT,
  FETCH_FILM_EVALUTE,
  EVALUTE_FILM
} from "../constants/ManageMovie";

const initialState = {
  movieList: [],
  movieListPage: [],
  movieDetail: {},
  currentPage: 1,
  totalCount: 0,
  theaterList: [],
  theaterOfMovie:{},
  trailer:"",
  isOpenTrailer:false,
  movieArr:[],
  theaterListMaRap:[],
  listMovieNewIn:[],
  listMovieComingUp:[],
  filmComment:[],
  userMovies:[],
  listEvalute:[],
  evalutePoint:0,
  findedMovies:[]
};

const manageMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_LIST: {
      let listMovieNewIn=[];
      let listMovieComingUp=[];
      var date = new Date()
      // console.log(date.getMonth()+"-"+date.getFullYear())
      action.data.forEach(e=> {
        let month= e.ngayKhoiChieu.slice(5,7);
        // console.log(month)
        let year = e.ngayKhoiChieu.slice(0,4);
        // console.log(year)
        if( month > date.getMonth()+1  &&  year>= date.getFullYear()){
          listMovieComingUp.push(e)
            //  console.log(e)
        }else{
          listMovieNewIn.push(e)
          // console.log(e)
        }
      })
      // console.log(listMovieNewIn);
      // console.log(listMovieComingUp);
      const movieArr = [ { label: "CHỌN PHIM", value: "" }];
      action.data.forEach(e=>movieArr.push({label:e.tenPhim,value:e.maPhim}))
      return {
        ...state,
        listMovieNewIn,
        listMovieComingUp,
        movieArr,
        movieList: action.data
      };
    }
    case GET_MOVIE_LIST_PAGE: {
      return {
        ...state,
        movieListPage: action.data,
        totalCount: action.data.totalCount
      };
    }
    case FIND_MOVIE:{
      // console.log(action.data)
      return{
          ...state,findedMovies:action.data
      }
  }
    case GET_MOVIE_INFO: {
      const theaterListOfMovie = [];
      const movie = action.data;
      movie.lichChieu.forEach(e => {
        theaterListOfMovie.push(e);
      });
      

      const ngaykhoichieu = action.data.ngayKhoiChieu
      const movieDetail = action.data
      const day = ngaykhoichieu.slice(8,10);
      
      const year = ngaykhoichieu.slice(0,4);
      
      const month = ngaykhoichieu.slice(5,7);
    
      const ngayKhoiChieu=`${year}-${month}-${day}`
     
      movieDetail.maPhim = action.data.maPhim;
      movieDetail.tenPhim = action.data.tenPhim;
      movieDetail.biDanh = action.data.biDanh;
      movieDetail.trailer = action.data.trailer;
      movieDetail.hinhAnh = action.data.hinhAnh;
      movieDetail.moTa = action.data.moTa;
      movieDetail.maNhom = action.data.maNhom;
      movieDetail.ngayKhoiChieu = ngayKhoiChieu;
      movieDetail.danhGia = action.data.danhGia;
      const theaterListMaRap = [];
      const theaterList = [];
      theaterListOfMovie.forEach(element => {
        if (!theaterListMaRap.includes(element.maRap)) {
          theaterListMaRap.push(element.maRap);
          theaterList.push(element)
        }
      });

      // if(theaterList.length>0){
      //   let currentTheaterDetail = theaterList[0].thongTinRap.maHeThongRap
      // }
     
      // console.log(currentTheaterDetail)
      // console.log("OUTPUT: ", theaterList);
      return {
        ...state,
        movieDetail,
        theaterList,
        theaterListMaRap,
        
      };
    }
    case ADD_MOVIE: {
      const movieList = [...state.movieList];
      movieList.push(action.data);
      return { ...state, movieList };
    }
    case CHANGE_PAGE: {
      return { ...state, currentPage: action.data };
    }
    case EDIT_MOVIE: {
      const movieDetail = state.movieDetail;
      movieDetail.maPhim = action.data.maPhim;
      movieDetail.tenPhim = action.data.tenPhim;
      movieDetail.biDanh = action.data.biDanh;
      movieDetail.trailer = action.data.trailer;
      movieDetail.hinhAnh = action.data.hinhAnh;
      movieDetail.moTa = action.data.moTa;
      movieDetail.maNhom = action.data.maNhom;
      movieDetail.ngayKhoiChieu = action.data.ngayKhoiChieu;
      movieDetail.danhGia = action.data.danhGia;
      return { ...state };
    }
    case CHOOSE_THEATER:{
        // console.log(action.data)
        const theaterOfMovie={...state.movieDetail};
        const lichChieu =[];
        theaterOfMovie.lichChieu.forEach(e => {
            lichChieu.push(e);
          });
        //  console.log(lichChieu)
      const lichChieuMoi =   lichChieu.filter(function(item) {
            return item.maRap === action.data;
        }
            // console.log(item.thongTinRap.tenCumRap)
            // console.log(action.data)
          
        )
        // console.log(lichChieuMoi);
        theaterOfMovie.lichChieu = lichChieuMoi;
        // console.log(theaterOfMovie)
        return{...state,theaterOfMovie}
    }
    case GET_TRAILER:{
      // console.log(action.data)
      return{...state,trailer:action.data}
    }
    case TOGGLE_MODAL_TRAILER:{
      return {...state,isOpenTrailer:action.data}
    }
    case DELETE_MOVIE:{
      const movieListPage = [...state.movieListPage]
      const movieDelete=movieListPage.findIndex(item=>item.maPhim=action.data)
      movieListPage.splice(movieDelete,1);
      return{...state,movieListPage}
    }
   
    case GET_USER_MOVIE:{

      // console.log(action.data)
      let mangPhim = []
     
        let thongTinDatVe = action.data;
        thongTinDatVe.forEach(item=>mangPhim.push(item.tenPhim))
        // console.log(mangPhim)
        // console.log(thongTinDatVe)
        var mangTenPhim = mangPhim.filter((val, id,array) => {
          return  array.indexOf(val) === id;  // this just returns true
      });
        // console.log(mangTenPhim);
        let userMovies = [...state.movieList];
        // console.log(userMovies)
        mangTenPhim.forEach(item=>{
          userMovies = userMovies.filter(i => i.tenPhim !== item)
          })
          // console.log(userMovies);
      return{...state,userMovies}
    }
    case FETCH_FILM_COMMENT:{
      return {...state,filmComment:action.data}
    }
    case ADD_FILM_COMMENT:{
      let filmComment= [...state.filmComment];
      filmComment.push(action.data)
      return {...state,filmComment}
    }
    case FETCH_FILM_EVALUTE:{
      let listEvalute= action.data;
      
      let evaluteSum = 0;
      listEvalute.forEach(e=>{evaluteSum+=e.danhgia})
      let evalutePoint = evaluteSum/(listEvalute.length)
      return{...state,evalutePoint,listEvalute:action.data}
    }
    case EVALUTE_FILM:{
      let listEvalute= [...state.listEvalute];
      const index = listEvalute.findIndex(item=>item.taiKhoan===action.data.taiKhoan)
      if(index!==-1){
        listEvalute[index].danhgia=action.data.danhgia
      }
      else{
        listEvalute.push(action.data);
      }
      let evaluteSum = 0;
      listEvalute.forEach(e=>{evaluteSum+=e.danhgia})
      let evalutePoint = evaluteSum/(listEvalute.length)
     
      return {...state,listEvalute,evalutePoint}
    }
    default:
      return state;
  }
};

export default manageMovieReducer;
