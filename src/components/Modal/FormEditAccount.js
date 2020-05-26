import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { onToggleModal, editAccountInfo } from '../../actions/ManageUser';
import { MyTextField } from '../pages/SignUp';
import styles from "../../styles/Layout/_formUser.module.scss";
const FormEditAccount=()=> {
    const {isOpen}= useSelector(state=>state.userReducer);
    const {accountInfo} = useSelector(state=>state.userReducer);
    const dispatch = useDispatch();
    const userInfo = JSON.parse(localStorage.getItem("userInformation"));
    return (
        <div className={styles.formUser}>
            <Modal isOpen={isOpen} toggle={()=>dispatch(onToggleModal(false))}>
                <h2>Sửa thông tin</h2>
                <ModalBody>
                    <Formik initialValues={{
                        taiKhoan:userInfo.taiKhoan,
                        matKhau: accountInfo.matKhau,
                        hoTen: accountInfo.hoTen,
                        soDT: accountInfo.soDT,
                        email: accountInfo.email
                    }}
                    onSubmit = {values=>dispatch(editAccountInfo(values))}
                    >
                        {({handleSubmit})=><Form>
                        <FormGroup>
                                    <MyTextField   className={styles.myTextField} type="text" name="taiKhoan" disabled={true} label="tài khoản" />
                                </FormGroup>
                                {/* <FormGroup>
                                    <MyTextField   className={styles.myTextField} type="text" name="matKhau" label="mật khẩu" />
                                </FormGroup> */}
                                <FormGroup>
                                    <MyTextField  className={styles.myTextField} type="text" name="hoTen" label="họ tên" />
                                </FormGroup>
                                <FormGroup>
                                    <MyTextField  className={styles.myTextField}  className={styles.myTextField} type="text" name="soDT" label="số điện thọai" />
                                </FormGroup>
                                <FormGroup>
                                    <MyTextField  className={styles.myTextField} type="text" name="email" label="Email" />
                                </FormGroup>
                                <Button color="success" onClick={()=>{handleSubmit();dispatch(onToggleModal(false))}}>Cập nhật</Button>
                                <Button color="warning" onClick={()=>dispatch(onToggleModal(false))}>Đóng</Button>
                            </Form>}
                    </Formik>
                </ModalBody>
                </Modal>        
        </div>
    )
}

export default FormEditAccount
