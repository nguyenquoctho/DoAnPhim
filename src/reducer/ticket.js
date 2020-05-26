import { GET_BOX_OFFICE_INFO, BOOK_TICKET, BUY_TICKET, TOGGLE_MODAL_TICKET,TOGGLE_MODAL_COMPO,  RESET_MONEY, CHOOSE_COMPO, GET_LIST_COMPO, ADD_COMPO, DELETE_COMPO, GET_LIST_PROMOTION, ADD_PROMOTION, GET_LIST_BOOKED_TICKET, GET_HISTORY, CONFIRM_HISTORY, DELETE_HISTORY, GET_LIST_BOOKED_TICKET_ROOM, RESET_LIST_BOOKED_TICKET } from "../constants/ManageBookTicket"

const initialState = {
    boxOfficeInformation:{},
    listBookedTicket:[],
    isOpenTicket:false,
    isOpenCompo:false,
    tongTien:0,
    giaVe:0,
    maxSeat:0,
    maxSeatCurrent:0,
    historyUser:[],
    listCompo:[
        // {tenCompo:"1 bắp rang nhỏ",gia:35000,soLuong:0},
        // {tenCompo:"1 bắp rang lớn",gia:45000,soLuong:0},
        // {tenCompo:"1 Pepsi nhỏ",gia:20000,soLuong:0},
        // {tenCompo:"1 Pepsi lớn",gia:25000,soLuong:0},
        // {tenCompo:"Compo 1 bắp rang lớn và 2 Pepsi nhỏ",gia:75000,soLuong:0},
        // {tenCompo:"Compo 1 bắp rang lớn và 2 Pepsi lớn",gia:80000,soLuong:0}
    ],
    listPromotion:[],
    listCompoSystem:[],
    listBookedTicketFirebase:[],
    listBookedTicketRoom:[],
}
const manageBookTicketReducer =(state=initialState,action)=>{
    switch(action.type){
        case GET_BOX_OFFICE_INFO:{
            // console.log(action.data);
            let bookedTickets=[]
            action.data.danhSachGhe.forEach(item=>{if(item.daDat===true){bookedTickets.push(item)}})
            // console.log(bookedTickets)
            let listBookedTicket=state.listBookedTicket;
            let tongTien = state.tongTien;
            let giaVe = action.data.danhSachGhe[0].giaVe;
            console.log(giaVe)
            // console.log(listBookedTicket);
            if(listBookedTicket.length>0){
                bookedTickets.forEach(item=>{
                    let tien = item.giaVe;
                    // console.log(tien)
                    for(let i=0;i<listBookedTicket.length;i++){
                        if(item.maGhe===listBookedTicket[i].maGhe){
                            listBookedTicket.splice(i,1);
                            // console.log(listBookedTicket[i].giaVe)
                            tongTien-=tien
                        }
                    }
                  })
            }
           
            

            return{
                ...state,listBookedTicket,tongTien,giaVe,boxOfficeInformation:action.data
            }
        }
       case BOOK_TICKET:{
            let  tongTien=state.tongTien;
            let maxSeatCurrent = state.maxSeatCurrent
           let giaVe= state.giaVe;
           const listBookedTicket=[...state.listBookedTicket];
           const index = listBookedTicket.findIndex(item=>item.maGhe===action.data.maGhe)
           if(index!==-1){
            tongTien -= giaVe
               listBookedTicket.splice(index,1);
               maxSeatCurrent-=1;
            //    listBookedTicket.forEach(element => {
            //     //    console.log(element.giaVe)
            //        tongTien-=element.giaVe;
            //    });
               
           }else{
               listBookedTicket.push(action.data);
            //    listBookedTicket.forEach(element => {
            //     //    console.log(element.giaVe)
            //        tongTien+=element.giaVe;
            //    });
            tongTien += giaVe;
            maxSeatCurrent+=1;
           }
           
           
        //    console.log(tongTien)
           return{...state,tongTien,listBookedTicket,maxSeatCurrent}
       }
       case BUY_TICKET:{
           const listBookedTicket=[];
          const tongTien=0
          const listCompo = state.listCompo;
          listCompo.forEach(item=>item.soLuong=0)
           return{...state,tongTien,listBookedTicket,listCompo}
       }
       case TOGGLE_MODAL_TICKET:{
        return {...state,isOpenTicket:action.data}
        }
        case TOGGLE_MODAL_COMPO:{
            return {...state,isOpenCompo:action.data}
            }
        case RESET_MONEY:{
            let tongTien=0;
            const listCompo = state.listCompo;
            listCompo.forEach(item=>item.soLuong=0)
            const listBookedTicket=[]
            return{...state,tongTien,listCompo,listBookedTicket}
        }
        case CHOOSE_COMPO:{
            // console.log(action.data)
            const listCompo = state.listCompo;
            let tongTien = state.tongTien;
            const index = listCompo.findIndex(
                item => item.tenCompo === action.data.compo
              );
              if(index!==-1){
                  if(action.data.val===false){
                      if(listCompo[index].soLuong>0){
                        listCompo[index].soLuong-=1;
                        tongTien-= listCompo[index].gia
                      }else{
                        listCompo[index].soLuong=0;
                      }
                  }
                  else{
                    listCompo[index].soLuong+=1;
                    tongTien+= listCompo[index].gia
                  }
              }
              return{
                  ...state,listCompo,tongTien
              }
        }
        case GET_LIST_COMPO:{
            const listCompo = [];
            if(action.data.length>0){
                action.data.forEach(e=>{listCompo.push({maCompo:e.maCombo,tenCompo:e.tenCombo,gia:e.gia,soLuong:0})})
            }
            return{...state,listCompo,listCompoSystem:action.data};

        }
    
        case ADD_COMPO: 
        {
            const listCompoSystem = [...state.listCompoSystem]
            listCompoSystem.push(action.data)
            return {...state, listCompoSystem}
        }
        case DELETE_COMPO: {
           const listCompoSystem = [...state.listCompoSystem]
           const index = listCompoSystem.findIndex(item => item.maCombo === action.data)
           if(index !== -1) {
            listCompoSystem.splice(index, 1)
            //    console.log(listCompoSystem)
           }
           return {...state, listCompoSystem}
       }
       case GET_LIST_PROMOTION:{
        // const listPromotion = [];
        // if(action.data.length>0){
        //     action.data.forEach(e=>{listPromotion.push({hinhAnhKM:e.hinhAnhKM,mucKM:e.mucKM,noiDungKM:e.noiDungKM,tenKM:e.tenKM})})
        // }
        return{...state,listPromotion:action.data};
        
    }
    case ADD_PROMOTION: 
        {
            const listPromotion = [...state.listPromotion]
            // listPromotion.push(action.data)
   
            let index = listPromotion.findIndex(item=>item.maKM===action.data.ma)
            listPromotion[index].isOn =action.data.truefalse
            
            return {...state, listPromotion}
        }
        case GET_LIST_BOOKED_TICKET:{
            let boxOfficeInformation = {...state.boxOfficeInformation}
            console.log(action.data.listBookedTicketfirebase);
            let maxSeat = state.maxSeatCurrent;
            console.log(maxSeat)
            action.data.listBookedTicketfirebase.forEach(item=>{
                if(item.taiKhoan==action.data.taiKhoan){
                    maxSeat+=1;
                }
            })
            console.log(maxSeat)
            action.data.listBookedTicketfirebase.forEach(item=>{
                for(let i = 0;i<=52;i++){
                    if(parseInt(item.maGhe)==parseInt(boxOfficeInformation.danhSachGhe[i].maGhe)){
                        boxOfficeInformation.danhSachGhe[i].daDat=true;
                        console.log(  boxOfficeInformation.danhSachGhe[i].daDat)
                    }
                }
            })
            // console.log(boxOfficeInformation)
            
            return{...state,boxOfficeInformation,maxSeat}
        }
        case GET_HISTORY:{
            return{...state,historyUser:action.data};

        }
        case CONFIRM_HISTORY:{
            let historyUser=[...state.historyUser];
            let index = historyUser.findIndex(item=>item.id==action.data)
            // console.log(historyUser[index])
            historyUser[index].xacNhan=true
            return{...state,historyUser}
        }
        case DELETE_HISTORY:{
            let historyUser=[...state.historyUser];
            let index = historyUser.findIndex(item=>item.id==action.data)
            // console.log(historyUser[index])
            historyUser.splice(index,1)
            return{...state,historyUser}
        }
        case GET_LIST_BOOKED_TICKET_ROOM:{
            return{...state,listBookedTicketRoom:action.data};

        }
        case RESET_LIST_BOOKED_TICKET:{
            let listBookedTicket=[];
            return{...state,listBookedTicket}
        }
        default :return state
    }
}

export default manageBookTicketReducer