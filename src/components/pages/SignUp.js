import React, { useState } from "react";
import { TextField, withStyles, InputAdornment } from "@material-ui/core";
import * as yup from "yup";
import { Link } from "react-router-dom";
import styles from "../../styles/Layout/_signUp.module.scss";
import { useField, Formik } from "formik";
import { useDispatch } from "react-redux";
import useLoading from "../../customHook/useLoading";
import { Form, FormGroup, Button, Spinner } from "reactstrap";
import { signUp } from "../../actions/ManageUser";
const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ff8c00"
      },
      "&:hover fieldset": {
        borderColor: "orange"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ff4500"
      },
    }
  }
})(TextField);
const validationSchema = yup.object({
  taiKhoan: yup
    .string()
    .required("* Bắt buộc")
    .max(10, "Yêu cầu dưới 10 ký tự")
    .min(5, "Yêu cầu trên 5 ký tự"),
  matKhau: yup
    .string()
    .required("* Bắt buộc")
    .max(10, "Yêu cầu dưới 10 ký tự")
    .min(5, "Yêu cầu trên 5 ký tự"),
  xacNhanMatKhau: yup
    .string()
    .oneOf([yup.ref("matKhau")], "Xác nhận kaij mật khẩu")
    .required("* Bắt buộc"),
  hoTen: yup.string().required("* Bắt buộc"),
  soDt: yup
    .string()
    .required("* Bắt buộc")
    .matches(/(09|01[2|6|8|9])+([0-9]{8})\b/g, "Số điện thoại không đúng"),
  email: yup
    .string()
    .required("* Bắt buộc")
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim,
      "Yếu cầu email"
    )
});
export const MyTextField = ({ ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (<CssTextField {...field} {...props}
      helperText={errorText}
      error={errorText ? true : false}
      variant="outlined"
    />);
};
const SignUp = props => {
    // console.log(props)
  const dispatch = useDispatch();
  const handleSucces = () => {
    // console.log("da dang nahp thanh cong");
    props.history.push('/login')
  };
  const [showPassWord, setShowPassWord] = useState(false);
  const { loading } = useLoading();
  return (
    <div className={styles.signInUp}>
      
     
          <div className={styles.signUpContainer}>
          <Formik
            initialValues={{
              taiKhoan: "",
              matKhau: "",
              xacNhanMatKhau: "",
              hoTen: "",
              soDt: "",
              email: ""
            }}
            validationSchema={validationSchema}
            onSubmit={values => dispatch(signUp(values, handleSucces))}
          >
            {({ handleSubmit }) => (
              <Form className={styles.signUpForm}>
                <h2>Đăng Ký Tài Khoản</h2>
                <div className="row">
                  <FormGroup className="col-12 col-lg-6 col-md-6">
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
                  <FormGroup className="col-12 col-lg-6 col-md-6">
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
                  <FormGroup className="col-12 col-lg-6 col-md-6">
                    <MyTextField
                      className={styles.myTextField}
                      type={showPassWord ? "text" : "password"}
                      name="xacNhanMatKhau"
                      label="Xác nhận mật khẩu"
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
                  <FormGroup className="col-12 col-lg-6 col-md-6">
                    <MyTextField
                      className={styles.myTextField}
                      type="text"
                      name="hoTen"
                      label="Họ Tên"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <i className="fa fa-info"></i>
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormGroup>
                  <FormGroup className="col-12 col-lg-6 col-md-6">
                    <MyTextField
                      className={styles.myTextField}
                      type="text"
                      name="soDt"
                      label="Số Điện Thoại"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <i className="fa fa-phone"></i>
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormGroup>
                  <FormGroup className="col-12 col-lg-6 col-md-6">
                    <MyTextField
                      className={styles.myTextField}
                      type="text"
                      name="email"
                      label="Email"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <i className="fa fa-envelope"></i>
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormGroup>
                </div>
                <Link
                        to="/login"
                      >Bạn đã có tài khoản? Đăng nhập!
                      </Link>
                <div><button className={styles.myBtnSubmit} onClick={handleSubmit}>Đăng Ký</button></div>
              </Form>
            )}
          </Formik>
        </div>
        
    </div>
  );
};

export default SignUp;
