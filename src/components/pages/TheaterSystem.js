import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/Layout/_listTable.module.scss";
import { changeTheater } from '../../actions/ManageTheater';
const TheaterSystem=()=> {
  const dispatch = useDispatch();
  const {
    listTheaterAdmin
  } = useSelector(state => state.manageTheatersReducer);
 
  return (
    <div className={styles.listTable}>
     
      <div className={styles.listTable__header}>
          <h2>Danh sách rạp</h2>
        </div>
        <div className={styles.listTable__theater}>
         <div className="row">
           <div className="col-12 col-lg-4 col-md-6 col-sm-6 ">
             <button onClick={()=>{dispatch( changeTheater("BHD"))}}>BHD</button>
           </div>
           <div className="col-12 col-lg-4 col-md-6 col-sm-6 ">
           <button  onClick={()=>{dispatch(changeTheater("CGV")) }}>CGV</button>
           </div>
           <div className="col-12 col-lg-4 col-md-6 col-sm-6 ">
           <button   onClick={()=>{dispatch(changeTheater("CNS")) }}>CNS</button>
           </div>
           <div className="col-12 col-lg-4 col-md-6 col-sm-6 ">
           <button   onClick={()=>{dispatch(changeTheater("GALAXY")) }}>GALAXY</button>
           </div>
           <div className="col-12 col-lg-4 col-md-6 col-sm-6 ">
           <button   onClick={()=>{dispatch(changeTheater("LOTTE")) }}>LOTTE</button>
           </div>
         </div>
        </div>
        <div className={styles.listTable__Tbl}>
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên rạp</th>
                <th>Mã rạp</th>
              </tr>
            </thead>
            <tbody>
             {listTheaterAdmin.map((item,index)=>(
               <tr className ={index%2!==0 ? styles.trOdd  :"" } key={index}>
                 <td>{index+1}</td>
                 <td>{item.ten}</td>
                 <td>{item.ma}</td>
               </tr>
             ))}
            </tbody>
          </table>
        </div>
   
    </div>
  )
}

export default TheaterSystem