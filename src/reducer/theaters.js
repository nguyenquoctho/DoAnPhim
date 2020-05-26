import { GET_LIST_THEATERS, GET_THEATER_INFO, GET_ONE_GROUP_THEATER, GET_MOVIE_SHOWTIME, GET_CURRENT_THEATER, GET_CURRENT_CUM_RAP, GET_CURRENT_DANH_SACH_PHIM, GET_CURRENT_THEATER_NAME, GET_CURRENT_THEATER_DATE, GET_CURRENT_THEATER_ADMIN, RESET_CURRENT_THEATER, RESET_CURRENT_THEATER_DAYTIME_TEMPORATY } from "../constants/ManageTheaters"

const initialState = {
    listTheaters:[],
    oneGroupTheater:{},
    showtimeInfoOfTheater:[],
    movieShowTime:{},
    currentTheater:"BHDStar",
    currentCumRap:"bhd-star-cineplex-pham-hung",
    currentDanhSachPhim:[{
        lstLichChieuTheoPhim: [
        {maLichChieu: 16634, maRap: "476", tenRap: "Rạp 6", ngayChieuGioChieu: "2019-01-09T12:10:00", giaVe: 75000},
        {maLichChieu: 16635, maRap: "476", tenRap: "Rạp 6", ngayChieuGioChieu: "2019-01-09T14:10:00", giaVe: 75000},
        {maLichChieu: 16636, maRap: "476", tenRap: "Rạp 6", ngayChieuGioChieu: "2019-01-09T16:10:00", giaVe: 75000},
        {maLichChieu: 16637, maRap: "476", tenRap: "Rạp 6", ngayChieuGioChieu: "2019-01-09T18:10:00", giaVe: 75000},
        {maLichChieu: 16638, maRap: "476", tenRap: "Rạp 6", ngayChieuGioChieu: "2019-01-09T20:10:00", giaVe: 75000}],
        maPhim: 1323, 
        tenPhim: "Ted 3"   
    }],
    CurrentTheaterNgayGioAdmin:[],
    listCurrentTheater:[],
    listCurrentTheaterName:[{ label: "CHỌN RẠP", value: "" }],
    CurrentTheaterName:{},
    CurrentTheaterDayTime:[{ label: "CHỌN NGÀY CHIẾU", value: "" }],
    CurrentTheaterDayTimeTemporary:[],
    CurrentTheaterTime:[{ label: "CHỌN GIỜ CHIẾU", value: "" }],
     ListBHD : [{ten:"BHD Star Cineplex - Phạm Hùng",ma:"476"},
    {ten:"BHD Star Cineplex - Vincom Quang Trung",ma:"491"},
    {ten:"BHD Star Cineplex - Vincom Thảo Điền",ma:"506"},
    {ten:"BHD Star Cineplex - 3/2",ma:"451"}
    ],
     ListCGV : [{ten:"CGV - Aeon Tân Phú",ma:"521"},
    {ten:"CGV - CGV Saigonres Nguyễn Xí",ma:"536"},
    {ten:"CGV - CT Plaza",ma:"551"},
    {ten:"CGV - Golden Plaza",ma:"566"},
    {ten:"CGV - Hùng Vương Plaza",ma:"581"},
    // {ten:"CGV - IMC Trần Quang Khải",ma:"551"},
    // {ten:"CGV - Pandora City",ma:"611"},
    // {ten:"CGV - Paragon",ma:"626"},
    // {ten:"CGV - Pearl Plaza",ma:"641"},
    // {ten:"CGV - Satra Củ Chi",ma:"656"},
    // {ten:"CGV - Vincom Đồng Khởi",ma:"671"},
    // {ten:"CGV - Vincom Thủ Đức",ma:"701"},
    // {ten:"CGV - Aeon Bình Tân",ma:"511"},
    ],
     ListCNS : [{ten:"CNS - Quốc Thanh",ma:"732"},
    {ten:"CNS - Hai Bà Trưng",ma:"729"},
    ],
     ListGLX : [{ten:"GLX - Huỳnh Tấn Phát",ma:"747"},
    {ten:"GLX - Nguyễn Du",ma:"762"},
    {ten:"GLX - Nguyễn Văn Quá",ma:"777"},
    {ten:"GLX - Quang Trung",ma:"792"},
    {ten:"GLX - Tân Bình",ma:"807"},
    ],
     ListLOTTE : [{ten:"Lotte - Cantavil",ma:"822"},
    {ten:"Lotte - Cộng Hòa",ma:"837"},
    {ten:"Lotte - Gò Vấp",ma:"852"},
    {ten:"Lotte - Nam Sài Gòn",ma:"867"},
   
    {ten:"Lotte - Thủ Đức",ma:"897"},
    ],
    listTheaterAdmin:[{ten:"BHD Star Cineplex - Phạm Hùng",ma:"476"},
    {ten:"BHD Star Cineplex - Vincom Quang Trung",ma:"491"},
    {ten:"BHD Star Cineplex - Vincom Thảo Điền",ma:"506"},
    {ten:"BHD Star Cineplex - 3/2",ma:"451"}],
}

const manageTheatersReducer =(state=initialState,action)=>{
    switch(action.type){
        case GET_LIST_THEATERS:{
            return{
                ...state,listTheaters:action.data
            }
        }
        case GET_THEATER_INFO:{
            console.log(action.data)
            if(action.data.length>0){
                return{
                    ...state,showtimeInfoOfTheater:action.data,currentCumRap : action.data[0].lstCumRap[0].maCumRap,
                    currentDanhSachPhim:action.data[0].lstCumRap[0].danhSachPhim
                }
            }  return{
                ...state,showtimeInfoOfTheater:action.data
            }
           
        }
        case GET_ONE_GROUP_THEATER:{
           
            return {
                ...state,oneGroupTheater:action.data
            }
        }
        case GET_MOVIE_SHOWTIME:{
            const listCurrentTheater=[];
            // listCurrentTheater.concat(action.data.heThongRapChieu)
            // console.log(action.data.heThongRapChieu)
            action.data.heThongRapChieu.forEach(e=>listCurrentTheater.push(e))
            // console.log(listCurrentTheater)
            const listCurrentTheaterName = [ { label: "CHỌN RẠP", value: "" }];
            listCurrentTheater.forEach(e=>listCurrentTheaterName.push({label:e.tenHeThongRap,value:e.maHeThongRap}))
            const  CurrentTheaterDayTime=[{ label: "CHỌN NGÀY CHIẾU", value: "" }];
            const CurrentTheaterTime=[{ label: "CHỌN GIỜ CHIẾU", value: "" }];
          
            return {
                ...state,listCurrentTheater,listCurrentTheaterName,CurrentTheaterDayTime,CurrentTheaterTime,movieShowTime:action.data
            }
        }
        case GET_CURRENT_THEATER:{
            // console.log(action.data)
            return{
                ...state,currentTheater:action.data
            }
        }
        case RESET_CURRENT_THEATER:{
            return{...state,currentTheater:"BHDStar"}
        }
        case RESET_CURRENT_THEATER_DAYTIME_TEMPORATY:{
            const    CurrentTheaterDayTimeTemporary=[];
            return{...state,CurrentTheaterDayTimeTemporary}
        }
        case GET_CURRENT_CUM_RAP:{
            // console.log(action.data)
            return{...state,currentCumRap:action.data}
        }
        case GET_CURRENT_DANH_SACH_PHIM:{
            // console.log(action.data)
            return{
                ...state,currentDanhSachPhim:action.data
            }
        }
        case GET_CURRENT_THEATER_NAME :{
            const CurrentTheaterTime=[{ label: "CHỌN GIỜ CHIẾU", value: "" }];
            // console.log(action.data);
            const index = state.listCurrentTheater.findIndex(item=>{return item.maHeThongRap===action.data})
            // console.log(state.listCurrentTheater)
            // console.log(index)
            const CurrentTheaterName = state.listCurrentTheater[index]
            // console.log(CurrentTheaterName)
            const CurrentTheaterDayTime=[{ label: "CHỌN NGÀY CHIẾU", value: "" }];
            const CurrentTheaterDayTimeTemporary=[];
           
            CurrentTheaterName.cumRapChieu.forEach(item=>item.lichChieuPhim.slice(item.lichChieuPhim.length-5,item.lichChieuPhim.length).forEach(e=>CurrentTheaterDayTimeTemporary.push(e)))
            // console.log(CurrentTheaterDayTimeTemporary)
            // {item.ngayKhoiChieu.slice(8, 10)}-{item.ngayKhoiChieu.slice(5, 7)}
            const CurrentTheaterNgayGio=[];
            let date = new Date()

            CurrentTheaterDayTimeTemporary.forEach(e=> {
                if(parseInt(e.ngayChieuGioChieu.slice(5,7))>(parseInt(date.getMonth())+1)||(parseInt(e.ngayChieuGioChieu.slice(5,7))==(parseInt(date.getMonth()))+1) && parseInt(e.ngayChieuGioChieu.slice(8,10))>=parseInt(date.getDate())){
                    CurrentTheaterNgayGio.push(`${e.ngayChieuGioChieu.slice(8, 10)}-${e.ngayChieuGioChieu.slice(5,7)}`)
                }
            }
                  )
            // console.log(CurrentTheaterDayTimeTemporary);
            const namesArr = CurrentTheaterNgayGio.filter((val, id,array) => {
                return  array.indexOf(val) === id;  // this just returns true
            });
            // console.log(namesArr)
            namesArr.forEach(e=>CurrentTheaterDayTime.push({label: e, value: e}))
            

            return{
                ...state,CurrentTheaterName,CurrentTheaterTime,CurrentTheaterDayTime,CurrentTheaterDayTimeTemporary
            }

        }
        case GET_CURRENT_THEATER_DATE:{
            // console.log(action.data)
            
            // console.log(state.CurrentTheaterDayTimeTemporary)
            const CurrentTheaterDayTimeTemporary = state.CurrentTheaterDayTimeTemporary
            const CurrentTheaterNgayGio=[];
            CurrentTheaterDayTimeTemporary.forEach(e=> CurrentTheaterNgayGio.push({ngayChieu:`${e.ngayChieuGioChieu.slice(8, 10)}-${e.ngayChieuGioChieu.slice(5,7)}`,gioChieu:`${e.ngayChieuGioChieu.slice(11, 16)}`,maLichChieu:e.maLichChieu,maRap:e.maRap,ngayChieuGioChieu:e.ngayChieuGioChieu.slice(11,16),giaVe:e.giaVe}) )
            // console.log(CurrentTheaterNgayGio);
            const CurrentTheaterTime=[{ label: "CHỌN GIỜ CHIẾU", value: "" }];
            const CurrentTheaterNgayGioAdmin= [];
            CurrentTheaterNgayGio.forEach(item=>{
                // console.log(item.ngayChieu)
                // console.log(item)
                
                if(item.ngayChieu===action.data.ngayChieuGioChieu){
                    CurrentTheaterTime.push({ label: item.gioChieu, value: item.maLichChieu,maLichChieu:item.maLichChieu,maRap:item.maRap,ngayChieuGioChieu:item.ngayChieuGioChieu.slice(11,16),giaVe:item.giaVe })
                    CurrentTheaterNgayGioAdmin.push(item)
                }
            })
            // console.log("sadasda"+CurrentTheaterTime)
            return{
                ...state,CurrentTheaterTime,CurrentTheaterNgayGioAdmin
            }

        }
        case GET_CURRENT_THEATER_ADMIN:{
            let listTheaterAdmin =[];
            if(action.data==="BHD"){
                listTheaterAdmin=state.ListBHD
            }
            else if(action.data==="CGV"){ listTheaterAdmin=state.ListCGV}
            else if(action.data==="CNS"){ listTheaterAdmin=state.ListCNS}
            else if(action.data==="GALAXY"){ listTheaterAdmin=state.ListGLX}
            else if(action.data==="LOTTE"){ listTheaterAdmin=state.ListLOTTE}
            return{
                ...state,listTheaterAdmin
            }
        }
        default :return state
    }
}

export default manageTheatersReducer