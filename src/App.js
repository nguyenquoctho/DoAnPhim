import React, { useEffect } from "react";
import UserList from "./components/pages/userList";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthorization } from "./utils/axios";
import { getUserInfo } from "./actions/ManageUser";
import UserLayout from "./components/layouts/UserLayout";
import Home from "./components/pages/Home";
import UserAuth from "./Auth/UserAuth";
import MovieDetail from "./components/pages/movieDetail";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminAuth from "./Auth/AdminAuth";
import MovieListTable from "./components/pages/movieListTable";
import ManageUserDetail from "./components/pages/ManageUserDetail";
import ManageMovieDetail from "./components/pages/ManageMovieDetail";
import ListSeat from "./components/pages/ListSeat";
import UserDetail from "./components/pages/UserDetail";
import System from "./components/pages/System";
import './firebase';
import Info from "./components/pages/Info";
import InfoDetail from "./components/pages/InfoDetail";
import TheaterSystem from "./components/pages/TheaterSystem";
import FindedMovieList from "./components/pages/FindedMovieList";
import InfoList from "./components/pages/InfoList";
import ManageInfoDetail from "./components/pages/ManageInfoDetail";
import Chat from "./components/pages/Chat";
import Message from "./components/pages/Message";
import Promotion from "./components/pages/Promotion";
import PromotionMain from "./components/pages/PromotionMain";
import ManageTicketRoom from "./components/pages/ManageTicketRoom";
// import TheaterTbl from "./components/pages/TheaterTbl";
function App() {
  const dispatch = useDispatch();
  // var date = new Date()
  // console.log(date.getDate()+"-"+date.getFullYear())
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInformation"));
    if (userInfo) {
      setAuthorization(userInfo.accessToken);
      dispatch(getUserInfo(userInfo));
      // console.log(userInfo);
    }
  });
  return (
    <div className="App">
      {/* <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />  </Switch> */}
      {/* <SignUp/> */}
      {/* <Login/> */}
      {/* <MovieList/>
     <UserList/>
     <TheaterList/>
     <ShowtimeTheaters/> */}
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        {/* <Route path="/Chat" component={Chat} /> */}
        {/* <UserAuth path="/pick-ticket-page" component={PickTicketPage} /> */}
        <AdminLayout path="/admin">
        <Redirect to="/admin/theaterSystem" component={TheaterSystem}/>
          <Switch>
            <AdminAuth path="/admin/users-management" component={UserList}/>
            <AdminAuth path="/admin/theaterSystem" component={TheaterSystem}/>
            <AdminAuth path="/admin/system-product" component={System}/>
            <AdminAuth path="/admin/info-management" component={InfoList}/>
            <AdminAuth path="/admin/promotion-management" component={Promotion}/>
            <AdminAuth path="/admin/message-management" component={Message}/>
            <AdminAuth path="/admin/management-info-detail/:maInfo" component={ManageInfoDetail}/>
            <AdminAuth path="/admin/movies-management" component={MovieListTable}/>
            <AdminAuth path="/admin/manage-user-detail/:taiKhoan" component={ManageUserDetail}/>
            <AdminAuth path="/admin/manage-movie-detail/:maPhim" component={ManageMovieDetail}/>
            <AdminAuth path="/admin/manage-ticket-room/:maLichChieu" component={ManageTicketRoom}/>
          </Switch>
        </AdminLayout>
        <UserLayout path="/">
          {/* <Redirect to="/home" component={Home} /> */}
          <Switch>
         
            <Route exact path="/" component={() => (<Redirect to="/home"/>)}/>
            <Route path="/home" component={Home} />
            <Route path="/info" component={Info} />
            <Route path="/info-detail/:maInfo" component={InfoDetail} />
            <Route path="/promtion" component={PromotionMain} />
            <Route path="/findPage" component={FindedMovieList} />
            <Route path="/movie-detail/:maPhim" component={MovieDetail} />
            <UserAuth path='/account-info/' component={UserDetail}/>
            <UserAuth path="/pick-seat-page/:maLichChieu" component={ListSeat} />
          </Switch>
        </UserLayout>
      </Switch>
    </div>
  );
}

export default App;
