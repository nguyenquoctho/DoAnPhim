import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListTheaters,
  
  getTheaterShowTimeInfo,
  getCurrentTheater,
  
  resetCurrrentTheater
} from "../../actions/ManageTheater";
import styles from "../../styles/Layout/_theaterList.module.scss";
// import styles1 from "../../styles/Layout/_movieListSlider.module.scss";
import stylesTitle from "../../styles/Component/_title.module.scss";
import { changeLoadingShowtimeAction } from "../../actions/ManageUser";
const TheaterList = () => {
  const dispatch = useDispatch();
  const { listTheaters,currentTheater,showtimeInfoOfTheater } = useSelector(state => state.manageTheatersReducer);
  useEffect(() => {
    dispatch(getListTheaters());
    dispatch(resetCurrrentTheater("BHDStar"))
  }, []);

  return (
    <div className="container">
       <h2 className={stylesTitle.Title}>Cụm Rạp</h2>
      <div className={styles.Theater__Container}>
        {listTheaters.slice(0,5).map((item, index) => (
          <div
          onClick={() => {
            dispatch(getTheaterShowTimeInfo(item.maHeThongRap));
            dispatch(getCurrentTheater(item.maHeThongRap));
            dispatch(changeLoadingShowtimeAction(true))
            // dispatch(getCurrentCumRap(showtimeInfoOfTheater[0].lstCumRap[0].maCumRap))
          }}
          className={  styles.Theater__Item } key={index}>
            <div className={currentTheater!==item.maHeThongRap ? styles.Theater__OverPlay: ""}></div>
            <img
              className={styles.Theater__Logo}
              
             
              src={item.logo}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheaterList;
