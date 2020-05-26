import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../styles/Layout/_findMoviePage.module.scss";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
const FindedMovieList = () => {
  const { findedMovies } = useSelector(state => state.manageMovieReducer);

  return (
    <>
  <Header/>
    <div className={styles.findMoviePage}>
      <div className="container">
        <h2>Kết quả tìm kiếm</h2>
        <div className={styles.findMoviePage__content}>
          {findedMovies.length > 0 ? (
            findedMovies.map((item, index) => (
              <p key={index}>
                {index + 1}). {item.tenPhim}{" "}
                <Link
                  to={`movie-detail/${item.maPhim}`}
                  // className={styles.movie__bookTicket}
                  onClick={() => {
                    localStorage.setItem(
                      "movieDetail",
                      JSON.stringify(item.maPhim)
                    );
                  }}
                >
                  CHI TIẾT
                </Link>{" "}
              </p>
            ))
          ) : (
            <p>Không tìm thấy kết quả nào phù hợp!</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
    </>);
};

export default FindedMovieList;
