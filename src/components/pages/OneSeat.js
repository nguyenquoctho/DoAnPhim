import React, {useState } from 'react'
import { bookTicketAction } from '../../actions/ManageBookTicket'
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2'
import styles from "../../styles/Layout/_listSeat.module.scss";
const OneSeat=({seatInfo})=> {
    const dispatch = useDispatch();
    const {
       
        listBookedTicket,
        maxSeat,
      } = useSelector((state) => state.manageBookTicketReducer);
    const [isactive, setIsactive] = useState(false);
    // useEffect(()=>{
    //     // console.log(isactive)
    // },[isactive])
    return (
        
        <button disabled={seatInfo.daDat}  className={  seatInfo.daDat ? styles.listSeat__SeatBooked :  isactive ? styles.listSeat__SeatChoosed : styles.listSeat__SeatNoChoosed } onClick={()=>{
            if(listBookedTicket.length==2){
               if(listBookedTicket[0].maGhe==seatInfo.maGhe||listBookedTicket[1].maGhe==seatInfo.maGhe){
                //    if(maxSeat>4){
                //     Swal.fire({
                //         position: "center",
                //         icon: "warning",
                //         title: "Bạn được chọn tối đa 4 ghế trong 1 phòng vé!",
                //         showConfirmButton: true,
                //       });
                //    }else{
                 
                //    }
                   dispatch(bookTicketAction(seatInfo));setIsactive(!isactive)
               }
               else{
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Bạn được chọn tối đa 2 ghế!",
                    showConfirmButton: true,
                  });
               }
            }else{
                if(maxSeat>=6 ){
                    // if(listBookedTicket[0].maGhe==seatInfo.maGhe||listBookedTicket[1].maGhe==seatInfo.maGhe){
                    //     //    if(maxSeat>4){
                    //     //     Swal.fire({
                    //     //         position: "center",
                    //     //         icon: "warning",
                    //     //         title: "Bạn được chọn tối đa 4 ghế trong 1 phòng vé!",
                    //     //         showConfirmButton: true,
                    //     //       });
                    //     //    }else{
                         
                    //     //    }
                    //        dispatch(bookTicketAction(seatInfo));setIsactive(!isactive)
                    //    }else{
                        
                    //    }
                       Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: "Bạn được chọn tối đa 6 ghế trong 1 phòng vé!",
                        showConfirmButton: true,
                      });
                   }else{
                    dispatch(bookTicketAction(seatInfo));setIsactive(!isactive)
                   }
            }
            
        }}  > <img className={styles.listSeat__SeatOverplay} src="https://cinestar.com.vn/catalog/view/theme/default/images/single-chair.png"></img> <span>{seatInfo.tenGhe}</span></button>
        
    )
}

export default OneSeat

