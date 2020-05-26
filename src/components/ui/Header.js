import React from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  // Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  // Input
} from "reactstrap";
// import { MyTextField } from "./SignUp";
import SearchIcon from "@material-ui/icons/Search";
import "../../styles/Helper/_customize.scss";
// import { FormGroup, InputAdornment } from "@material-ui/core";
import {
  FormGroup,
  TextField,
  withStyles,
  InputAdornment
} from "@material-ui/core";
import { useField, Formik } from "formik";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/Layout/_header.module.scss";
import { findMovie } from "../../actions/ManageMovie";
const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#f06f24"
      },
      "&:hover fieldset": {
        borderColor: "#f06f24"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#f06f24"
      }
    }
  }
})(TextField);
export const MyTextField = ({ ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <CssTextField
      {...field}
      {...props}
      helperText={errorText}
      // error={errorText ? true : false}
      variant="outlined"
    />
  );
};
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const dispatch = useDispatch();
  const { userInformation } = useSelector(state => state.userReducer);
  const handleLogout = () => {
    localStorage.removeItem("userInformation");
    window.location.reload();
  };
  const handleFindMovieSuccess = () => {
    // day nguoi dung vao trang / sau khi dang nhap thanh cong ben action replace k bi quay lai trang register
    // props.history.replace("/")
    // console.log("da luu");
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
    // props.history.push("/findPage");
  };
  return (
    <div className={styles.header}>
      <Navbar className={styles.myNavbar} light expand="md">
        <NavbarBrand className={styles.navbrand} href="/">
          {/* <img src="./img/logo.svg" alt="" width={180} /> */}
          {/* <span><span>Star</span>-Movie</span> */}
          <p>VLTH'Movie</p>
          
        </NavbarBrand>
        {/* <Formik
          initialValues={{
            tenPhim: ""
          }}
          onSubmit={values => {
            if(values.tenPhim!==""){
              dispatch(findMovie(values.tenPhim));
            }else{
              // values.tenPhim==="a"
              dispatch(findMovie("a"));
            }
          
            // console.log(values);
          }}
        >
          {({ handleChange, handleSubmit }) => (
            <FormGroup>
              <MyTextField
                className={styles.myMain__Input}
                name="tenPhim"
                type="text"
                label="Tìm kiếm phim..."
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={handleSubmit}
                    >
                      <Link  to="/findPage">
                        <SearchIcon
                          fontSize="default"
                          style={{ cursor: "pointer" }}
                        />
                      </Link>
                    </InputAdornment>
                  )
                }}
                // onChange={e => {
                //   handleChange(e);
                //   handleFindMovie(e);
                // }}
              />
            </FormGroup>
          )}
        </Formik> */}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className={styles.myNavItem}>
              <NavLink className={styles.myNavLink} tag={Link} to="/home">
                TRANG CHỦ
              </NavLink>
            </NavItem>
            <NavItem className={styles.myNavItem}>
              <NavLink className={styles.myNavLink} tag={Link} to="/info">
                TIN TỨC
              </NavLink>
            </NavItem>
            <NavItem className={styles.myNavItem}>
              <NavLink className={styles.myNavLink} tag={Link} to="/promtion">
              KHUYẾN MÃI
              </NavLink>
            </NavItem>

            {Object.keys(userInformation).length !== 0 ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className={styles.acount}>
                  <i className="fa fa-user"></i>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/account-info">THÔNG TIN TÀI KHOẢN</Link>
                  </DropdownItem>
                  {userInformation.maLoaiNguoiDung === "QuanTri" && (
                    <DropdownItem>
                      <Link to="/admin">TRANG QUẢN TRỊ</Link>
                    </DropdownItem>
                  )}
                  <DropdownItem divider />
                  <DropdownItem onClick={handleLogout}>
                    <Link to="/home">ĐĂNG XUẤT</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className={styles.acountNotLogin}>
                  <i className="fa fa-user"></i>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/login">ĐĂNG NHẬP</Link>
                  </DropdownItem>

                  <DropdownItem divider />
                  <DropdownItem>
                    <Link to="/signup">ĐĂNG KÍ</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              // <div className="d-flex my-1"><NavItem tag={Link}
              //      to="/login"><Button color="secondary">ĐĂNG NHẬP</Button>
              // </NavItem>
              //     <NavItem
              //         tag={Link} to="/signup"><Button color="danger" >ĐĂNG KÍ</Button>
              //     </NavItem></div>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
export default Header;
