// import React from 'react'
// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { getBoxOfficeInfo } from '../../actions/ManageBookTicket';

// const PickTicketPage=({...props})=> {
//     const {theaterOfMovie} = useSelector(state=>state.manageMovieReducer);
//     const dispatch = useDispatch();
//     useEffect(() => {
//       console.log(theaterOfMovie)
//     }, [theaterOfMovie])
//     return (
//         <div>
//             <hr/>
//             <hr/>
//             <hr/>
//             <hr/>
//             <hr/>
//            {theaterOfMovie.lichChieu && theaterOfMovie.lichChieu.map((item,index)=>(
//                <button onClick={()=>{dispatch(getBoxOfficeInfo(item.maLichChieu));props.history.push(`/pick-seat-page`)}} key={index}>{item.ngayChieuGioChieu}</button>
//            ))}
//         </div>
//     )
// }

// export default PickTicketPage
