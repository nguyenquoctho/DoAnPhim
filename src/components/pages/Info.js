import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListInfo, getInfoDetail } from "../../actions/ManageInfo";
import styles from "../../styles/Layout/_info.module.scss";
import Footer from "../ui/Footer";
import stylesTitle from "../../styles/Component/_title.module.scss";
import Header from "../ui/Header";
import { Link } from "react-router-dom";
const Info = ({ ...props }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListInfo());
  }, []);
  const { listInfo } = useSelector(state => state.infoReducer);
  // console.log(listInfo);
  return (
    <>

      <div className={styles.info}>
        <div className="container">
          <h2 className={stylesTitle.Title}>Tin Tức</h2>
          <div className="row">
            <div className="col-lg-4 col-md-6 px-1">
              {listInfo &&
                listInfo
                  .slice(0, (Math.ceil(listInfo.length / 3)-0))
                  .map((item, index) => (
                    <div key={index}
                    onClick={() => {
                      props.history.push(`info-detail/${item.maInfo}`);
                      dispatch(getInfoDetail(item.maInfo))
                     }}
                    >
                      <div className="card p-3 my-3">
                        <div className={styles.info__card}>
                          <div className={styles.info__cardImg}>
                            <img src={item.hinhanh}></img>
                            <div
                              className={styles.info__cardImg__overplay}
                            ></div>
                          </div>
                          <h4>{item.tieude}</h4>
                          <p>{item.noidung}</p>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
            <div className="col-lg-4 col-md-6 px-1">
              {listInfo &&
                listInfo
                  .slice(
                    (Math.ceil(listInfo.length / 3)-0),
                  (  2 * Math.ceil(listInfo.length / 3))
                  )
                  .map((item, index) => (
                    <div key={index}
                    onClick={() => {
                      props.history.push(`info-detail/${item.maInfo}`);  dispatch(getInfoDetail(item.maInfo))
                     }}
                    >
                      <div className="card p-3 my-3">
                        <div className={styles.info__card}>
                          <div className={styles.info__cardImg}>
                            <img src={item.hinhanh}></img>
                            <div
                              className={styles.info__cardImg__overplay}
                            ></div>
                          </div>
                          <h4>{item.tieude}</h4>
                          <p>{item.noidung}</p>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
            <div className="col-lg-4 col-md-6 px-1">
            {listInfo &&
                listInfo
                  .slice(
                  (  2 * Math.ceil(listInfo.length / 3)),
                   listInfo.length
                  )
                  .map((item, index) => (
                    <div key={index}
                    onClick={() => {
                      props.history.push(`info-detail/${item.maInfo}`);  dispatch(getInfoDetail(item.maInfo))
                     }}
                    >
                      <div className="card p-3 my-3">
                        <div className={styles.info__card}>
                          <div className={styles.info__cardImg}>
                            <img src={item.hinhanh}></img>
                            <div
                              className={styles.info__cardImg__overplay}
                            ></div>
                          </div>
                          <h4>{item.tieude}</h4>
                          <p>{item.noidung}</p>
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Info;
// {
//   listInfo !== 0 &&
//     listInfo.map((item, index) => (
//       <div
//         // key={index}
//         className="col-lg-4 col-md-6 px-1"
//         // onClick={() => {
//         //   props.history.push(`/info/${item.maInfo}`);
//         // }}
//       >
//         <div className="card p-3">
//           <div className={styles.info__card}>
//             <div className={styles.info__cardImg}>
//               <img src={item.hinhanh}></img>
//               <div className={styles.info__cardImg__overplay}></div>
//             </div>
//             <h4>{item.tieude}</h4>
//             <p>{item.noidung}</p>
//           </div>
//         </div>
//       </div>
//     ));
// }

