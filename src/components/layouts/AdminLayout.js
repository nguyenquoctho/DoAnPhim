import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from 'react-router-dom'

import styles from "../../styles/Layout/_admin.module.scss";
import { changeAdmindLayoutScreenAction } from '../../actions/ManageUser';
const AdminLayout = (props) => {
    const dispatch = useDispatch();
    const { isSmall } = useSelector(state => state.userReducer);
    // console.log(isSmall)
    return (
        <>
             <div className={styles.adminLayout}>
            <div className={isSmall ?  `${styles.adminSibar} ${styles.adminSibar__width}`:`${styles.adminSibar} ${styles.adminSibar__width__small}`}>
               
                <Nav vertical>
                {/* <img src='./img/logo.svg' alt="" width={180} /> */}
              
                <NavItem>
                        <NavLink onClick={()=>{dispatch(changeAdmindLayoutScreenAction(!isSmall))}} > <i className="fa fa-bars" ></i></NavLink>
                    </NavItem>
                <NavItem>
                        <NavLink  tag={Link } to="/home"><i className="fa fa-arrow-left"></i>{isSmall?(<span>Quay lại trang chủ</span>):("")} </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink  tag={Link } to="/admin/theaterSystem"><i className="fa fa-home"></i>{isSmall?(<span>Hệ thống</span>):("")}</NavLink>
                    </NavItem>
                    {/* <NavItem>
                        <NavLink  tag={Link } to="/admin/system-product"><i className="fa fa-link"></i>{isSmall?(<span>Quản lý sản phẩm</span>):("")}</NavLink>
                    </NavItem> */}
                    <NavItem>
                        <NavLink tag={Link } to="/admin/users-management">  <i className="fa fa-user"></i>{isSmall?(<span>Quản lý người dùng</span>):("")}</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink  tag={Link } to="/admin/movies-management"><i className="fa fa-film"></i>{isSmall?(<span> Quản lý phim</span>):("")}</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink  tag={Link } to="/admin/info-management"><i className="fa fa-newspaper"></i>{isSmall?(<span> Tin tức</span>):("")}</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink  tag={Link } to="/admin/promotion-management"><i className="fas fa-gift"></i>{isSmall?(<span> Khuyến mãi</span>):("")}</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink  tag={Link } to="/admin/message-management">  <i className="fab fa-facebook-messenger"></i>{isSmall?(<span> Tin nhắn</span>):("")}</NavLink>
                    </NavItem>
                </Nav>
            </div>
            <div className={isSmall ? `${styles.adminPages} ${styles.adminPages__width}`: `${styles.adminPages} ${styles.adminPages__width__small}`}>{props.children}</div>
        </div>
        </>
   
    )
}
export default AdminLayout