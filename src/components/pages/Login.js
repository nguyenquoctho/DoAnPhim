import React, { useEffect,useState } from "react";
import styles from "../../styles/Layout/_signUp.module.scss";
import { Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { TextField, withStyles, InputAdornment } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  FromFeedBack
} from "reactstrap";
import * as yup from "yup";
import { logInAction } from "../../actions/ManageUser";
import { MyTextField } from "./SignUp";

const validationSchema = yup.object({
  taiKhoan: yup
    .string()
    .required("* Bắt buộc")
    .max(12, "Yêu cầu dưới 12 ký tự")
    .min(5, "Yêu cầu trên 5 ký tự"),
  matKhau: yup
    .string()
    .required("* Bắt buộc")
    .max(10, "Yêu cầu dưới 10 ký tự")
    .min(5, "Yêu cầu trên 5 ký tự")
});
// const validate = values => {
//     let errors = {}
//     Object.keys(values).forEach(key => {
//         if (!values[key]) {
//             errors[key] = "Required"
//         }
//     })
//     return errors
// }

const Login = props => {
  const dispatch = useDispatch();
  const { userInformation } = useSelector(state => state.userReducer);
  const handleSinginSuccess = () => {
    // day nguoi dung vao trang / sau khi dang nhap thanh cong ben action replace k bi quay lai trang register
    // props.history.replace("/")
    // console.log("da luu");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    props.history.replace("/home");
  };
  const [showPassWord, setShowPassWord] = useState(false);
  useEffect(() => {
    if (Object.keys(userInformation).length !== 0) {
      // props.history.push("/")
      // console.log("da luu");
    }
  }, [userInformation]);
  return (
    <div className={styles.signInUp}>
        <div className={styles.signUpContainer}>
      
      <Formik
        initialValues={{
          taiKhoan: "",
          matKhau: ""
        }}
        validationSchema={validationSchema}
        onSubmit={values => dispatch(logInAction(values, handleSinginSuccess))}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          errors,
          values,
          touched
        }) => (
          <Form className={styles.signUpForm}>
               <h2 className="text-center">Đăng Nhập</h2>
            <FormGroup>
              <MyTextField
                className={styles.myTextField}
                type="text"
                name="taiKhoan"
                label="Tài Khoản"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="fa fa-user"></i>
                    </InputAdornment>
                  )
                }}
              />
            </FormGroup>
            <FormGroup>
              <MyTextField
                className={styles.myTextField}
                type={showPassWord ? "text" : "password"}
                name="matKhau"
                label="Mật khẩu"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="fa fa-lock"></i>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <i
                        className="fa fa-eye"
                        onClick={() => setShowPassWord(!showPassWord)}
                        style={{ cursor: "pointer", color: "black" }}
                      ></i>
                    </InputAdornment>
                  )
                }}
              />
            </FormGroup>
            <Link
                        to="/signup"
                      >Bạn chưa có tài khoản? Đăng ký!
                      </Link>
         <div>   <button  className={styles.myBtnSubmit} onClick={handleSubmit} color="success">
              Đăng nhập
            </button></div>
          </Form>
        )}
      </Formik>
      </div>
    </div>
  );
};
export default Login;
