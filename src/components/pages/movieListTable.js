import React from "react";
import { useDispatch, connect } from "react-redux";
import {
  deleteMovie,
  
  changePageAction,
  getListMoviesPage,
  findMovie
} from "../../actions/ManageMovie";
import { MyTextField } from "./SignUp";
import SearchIcon from "@material-ui/icons/Search";
import { FormGroup, InputAdornment } from "@material-ui/core";
import { Formik } from "formik";
import Swal from "sweetalert2";
import FormAddMovie from "../Modal/FormAddMovie";
import { onToggleModal } from "../../actions/ManageUser";
import RenderMovieList from "../../RenderProps/RenderMovieList";
import PaginationComponent from "../ui/Pagination";
import styles from "../../styles/Layout/_listTable.module.scss";
const MovieListTable = ({ onChangePage, history }) => {
  const dispatch = useDispatch();
  // const { movieList } = useSelector(state => state.manageMovieReducer);
  // useEffect(() => {
  //   dispatch(getListMovies());
  // }, []);
  const handleFindMovie = e => {
    if (e.target.value !== "") {
      dispatch(findMovie(e.target.value));
    } else {
      dispatch(getListMoviesPage());
    }
  };
  return (
    <div className={styles.listTable}>
    
        <FormAddMovie />
        
        <div className={styles.listTable__header}>
          <button
            className={styles.phim_btnWhite}
            onClick={() => dispatch(onToggleModal(true))}
          >
            Thêm phim
          </button>
          <h2>Danh sách phim</h2>
          {/* <Formik
            initialValues={{
              tenPhim: ""
            }}
            onSubmit={values => {
              // findMovie(values.tenPhim);
              console.log(values);
            }}
          >
            {({ handleChange,handleSubmit }) => (
              <FormGroup>
                <MyTextField
                  className={styles.mySearch}
                  name="tenPhim"
                  type="text"
                  label="Nhập tên phim"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" onClick={handleSubmit}>
                        <SearchIcon
                          fontSize="large"
                          style={{ cursor: "pointer" }}
                        />
                      </InputAdornment>
                    )
                  }}
                  // onChange={e => {
                  //   handleChange(e);
                  //   handleFindMovie(e);
                  // }}
                />
              </FormGroup>
            )}
          </Formik> */}
        </div>

        {/* <thead>
          <tr>
            <th>STT</th>
            <th>Ten Phim</th>
            <th>Bi Danh</th>
            <th>Ngay Khoi Chieu</th>
            <th>Danh Gia</th>
            <th></th>
            
          </tr>
        </thead> */}
           <div className={styles.listTable__Tbl}>
        <RenderMovieList
          render={props => {
            // console.log(props)
            return (
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên phim</th>
                      <th>Hình ảnh</th>
                      <th>Ngày khởi chiếu</th>
                 
                      <th></th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {props.movieListPage.items &&
                      props.movieListPage.items.map((item, index) => (
                        <tr  className ={index%2!==0 ? styles.trOdd  :"" }  key={index}>
                          <td>{index+1}</td>
                          <td>{item.tenPhim}</td>
                          <td><img src={item.hinhAnh}></img></td>
                          <td>{item.ngayKhoiChieu.slice(0, 10)}</td>
                      
                          <td>
                            <button
                            className={styles.listTable__BtnDelete}
                              onClick={() =>
                                Swal.fire({
                                  title: `Bạn muốn xóa phim ${item.tenPhim}`,
                                  text: "Đây là câu hỏi bắt buộc",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#3085d6",
                                  cancelButtonColor: "#d33",
                                  cancelButtonText: "Đóng",
                                  confirmButtonText: "Xóa"
                                }).then(result => {
                                  if (result.value) {
                                    dispatch(deleteMovie(item.maPhim));
                                  }
                                })
                              }
                              // onClick={() => dispatch(deleteMovie(item.maPhim))}
                            >
                              <i className="fas fa-trash "></i>
                            </button>

                            <button
                              className={styles.listTable__BtnDetail}
                             
                              onClick={() => {
                                // dispatch(getMovieInfo(item.maPhim));
                                history.push(
                                  `/admin/manage-movie-detail/${item.maPhim}`
                                );
                              }}
                            >
                              Chi tiết
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div   className={styles.navigationSection}>
                <PaginationComponent
                
                currentPage={props.currentPage}
                pageSize={10}
                totalCount={props.totalCount}
                onChangePage={onChangePage}
              />
                </div>
              
              </div>
            );
          }}
        /></div>

        {/* <table class="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Ten Phim</th>
            <th>Bi Danh</th>
            <th>Ngay Khoi Chieu</th>
            <th>Danh Gia</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movieList.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.tenPhim}</td>
              <td>{item.biDanh}</td>
              <td>{item.ngayKhoiChieu}</td>
              <td>{item.danhGia}</td>
              <button className="btn btn-danger"
              onClick={()=>dispatch(deleteMovie(item.maPhim))} >
                Xoa
              </button>
              
            </tr>
          ))}
        </tbody>
      </table> */}
     
    </div>
  );
};

const mapStateToProps = state => ({
  movieListPage: state.manageMovieReducer.movieListPage,
  currentPage: state.manageMovieReducer.currentPage,
  totalCount: state.manageMovieReducer.totalCount
});

const mapDispatchToProps = dispatch => ({
  getListMoviePage: (currentPage, pageSize) =>
    dispatch(getListMoviesPage(currentPage, pageSize)),
  onChangePage: page => dispatch(changePageAction(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieListTable);
