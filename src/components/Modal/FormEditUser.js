import React, { useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { onToggleModal, onToggleModalEdit } from '../../actions/ManageUser';
import { editUser } from '../../actions/ManageUsers';
import styles from "../../styles/Layout/_formUser.module.scss";
import { MyTextField } from '../pages/SignUp';
const FormEditUser=()=> {
    const {isOpenEdit}= useSelector(state=>state.userReducer)
    const {userEdit} = useSelector(state=>state.manageUserReducer);
    const dispatch = useDispatch();
//     const {listUsers} = useSelector(state=>state.manageUserReducer);
   
//    const maND = listUsers.findIndex((item)=> item.taiKhoan===userDetail.taiKhoan)
//    console.log()
    
    // useEffect(()=>{
    //     
    //     console.log(listUsers)
    //     // if(listUsers.length>0){
    //     //     abc=listUsers[maND]
    //     // }
        
    // },[listUsers])
    // useEffect(()=>{
        
    // },[listUsers])
    return (
        <div>
            <Modal isOpen={isOpenEdit} toggle={()=>dispatch(onToggleModalEdit(false))}>
                <h2>Cập nhật thông tin</h2>
                <ModalBody>
                    <Formik initialValues={{
                        taiKhoan:userEdit.taiKhoan,
                        matKhau: userEdit.matKhau,
                        hoTen: userEdit.hoTen,
                        soDt: userEdit.soDt,
                        maLoaiNguoiDung: userEdit.maLoaiNguoiDung,
                        email: userEdit.email
                    }}
                    onSubmit = {values=>dispatch(editUser(values))}
                    >
                        {({handleSubmit})=><Form>
                        <FormGroup>
                                    <MyTextField className={styles.myTextField} type="text" name="taiKhoan" disabled={true} label="Tài khoản" />
                                </FormGroup>
                                <FormGroup>
                                    <MyTextField className={styles.myTextField} type="text" name="matKhau" label="Mật khẩu" />
                                </FormGroup>
                                <FormGroup>
                                    <MyTextField className={styles.myTextField} type="text" name="hoTen" label="Họ tên" />
                                </FormGroup>
                                <FormGroup>
                                    <MyTextField className={styles.myTextField} type="text" name="soDt" label="SDT" />
                                </FormGroup>
                                <FormGroup>
                                    <MyTextField className={styles.myTextField} type="text" name="maLoaiNguoiDung" label="Mã loại người dùng" />
                                </FormGroup>
                                <FormGroup>
                                    <MyTextField className={styles.myTextField} type="text" name="email" label="Email" />
                                </FormGroup>
                                <Button color="success" onClick={()=>{handleSubmit();dispatch(onToggleModalEdit(false))}}>Cập nhật</Button>
                                <Button color="warning" onClick={()=>dispatch(onToggleModalEdit(false))}>Đóng</Button>
                            </Form>}
                    </Formik>
                </ModalBody>
                </Modal>        
        </div>
    )
}

export default FormEditUser
