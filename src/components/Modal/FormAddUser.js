import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import styles from "../../styles/Layout/_formUser.module.scss";
import { Formik, Form } from 'formik';

import { addUser } from '../../actions/ManageUsers';
import { MyTextField } from '../pages/SignUp';
import { onToggleModal } from '../../actions/ManageUser';

const FormAddUser = () => {
    const { isOpen } = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    return (
        <div>
            <Modal isOpen={isOpen} toggle={() => dispatch(onToggleModal(false))} >
                <h2>Thêm người dùng</h2>
                <ModalBody>
                    <Formik initialValues={{
                        taiKhoan: '',
                        matKhau: '',
                        hoTen: '',
                        soDt: '',
                        maLoaiNguoiDung: '',
                        email: ''
                    }}
                        onSubmit={values => dispatch(addUser(values))}
                    >
                        {({ handleSubmit }) =>
                            <Form>
                                <FormGroup>
                                    <MyTextField  className={styles.myTextField} type="text" name="taiKhoan" label="Tài khoản" />
                                </FormGroup>
                                <FormGroup>
                                    <MyTextField  className={styles.myTextField} type="password" name="matKhau" label="Mật khẩu" />
                                </FormGroup>
                                <FormGroup>
                                    <MyTextField  className={styles.myTextField} type="text" name="hoTen" label="Họ tên" />
                                </FormGroup>
                                <FormGroup>
                                    <MyTextField  className={styles.myTextField} type="text" name="soDT" label="SDT" />
                                </FormGroup>
                                <FormGroup>
                                    <MyTextField  className={styles.myTextField} type="text" name="maLoaiNguoiDung" label="Mã loại người dùng" />
                                </FormGroup>
                                <FormGroup>
                                    <MyTextField  className={styles.myTextField} type="text" name="email" label="Email" />
                                </FormGroup>
                                <Button color="primary" onClick={() => {handleSubmit(); dispatch(onToggleModal(false))}}>Thêm người dùng</Button>
                                <Button color="secondary" onClick={() => dispatch(onToggleModal(false))}>Đóng</Button>
                            </Form>
                        }
                    </Formik>
                </ModalBody>
                <ModalFooter>
                    
                    
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default FormAddUser
