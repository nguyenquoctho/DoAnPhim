import React, { useState } from "react";
import * as yup from "yup";
import Swal from "sweetalert2";
import styles from "../../styles/Layout/_formUser.module.scss";
import "../../styles/Helper/_customize.scss";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup
} from "reactstrap";
import { TextField, withStyles, InputAdornment } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import {
    changePassAccount,
  onToggleModalChangePass
} from "../../actions/ManageUser";
import { MyTextField } from "../pages/SignUp";

const validationSchema = yup.object({
  matKhauCu: yup
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
    .required("* Bắt buộc")
});

const FormChangePass = () => {
  const { isOpenChangePass } = useSelector(state => state.userReducer);
  const { accountInfo } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInformation"));
  const [showPassWord, setShowPassWord] = useState(false);
  return (
    <div className={styles.formUser}>
      <Modal
        isOpen={isOpenChangePass}
        toggle={() => dispatch(onToggleModalChangePass(false))}
      >
        <h2>Đổi mật khẩu</h2>
        <ModalBody>
          <Formik
            initialValues={{
              // taiKhoan:userInfo.taiKhoan,
              // matKhau: accountInfo.matKhau,
              matKhauCu: "",
              matKhau: "",
              xacNhanMatKhau: ""
              // hoTen: userInfo.hoTen,
              // soDT: userInfo.soDT,
              // email: userInfo.email
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
                if(values.matKhauCu===accountInfo.matKhau){
                    dispatch(changePassAccount({   taiKhoan:userInfo.taiKhoan,matKhau:values.matKhau, hoTen: userInfo.hoTen,
                        soDT: userInfo.soDT,
                        email: userInfo.email}))
                }else{
                    Swal.fire({
                        position:'center',
                        icon:'error',
                        title:'Vui lòng nhập lại!',
                        showConfirmButton:false,
                        timer:2500
                    })
                }
            
            }
                // dispatch(editAccountInfo(values))
            }
          >
            {({ handleSubmit }) => (
              <Form>
                <FormGroup >
                  <MyTextField
                    className={styles.myTextField}
                    type={showPassWord ? "text" : "password"}
                    name="matKhauCu"
                    label="Mật khẩu cũ"
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
                <FormGroup>
                  <MyTextField
                    className={styles.myTextField}
                    type={showPassWord ? "text" : "password"}
                    name="matKhau"
                    label="Mật khẩu mới"
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
                <FormGroup >
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
                <Button
                  color="success"
                  onClick={() => {
                    handleSubmit();
                    dispatch(onToggleModalChangePass(false));
                  }}
                >
                  Cập nhật
                </Button>
                <Button
                  color="warning"
                  onClick={() => dispatch(onToggleModalChangePass(false))}
                >
                  Đóng
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default FormChangePass;
