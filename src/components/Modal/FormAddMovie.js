import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { onToggleModal } from '../../actions/ManageUser';
import { Formik, Form, useField } from 'formik';
import styles from "../../styles/Layout/_formUser.module.scss";
import { addMovie } from '../../actions/ManageMovie';
import { MyTextField } from '../pages/SignUp';
const MyInput = ({...props}) => {
    const [field, meta] = useField(props)
    return <input {...field} {...props}/>
}
const FormAddMovie=()=> {
    const {isOpen} = useSelector(state=>state.userReducer)
    const dispatch = useDispatch()
    const [file,setFile] = useState("");
    const handleChangeFile=e=>{
        setFile(e.target.files[0])
    }
    return (
        <div>
            <Modal isOpen ={isOpen} toggle={()=>dispatch(onToggleModal(false))}>
                <h2>Thêm phim</h2>
                <ModalBody>
                    <Formik 
                    initialValues={{
                        maPhim: '',
                        tenPhim: '',
                        biDanh: '', 
                        trailer: '',
                        hinhAnh: '',
                        moTa: '',
                        ngayKhoiChieu:'' ,
                        // danhGia:''
                    }}
                    onSubmit={values=>dispatch(addMovie({...values,hinhAnh:file}))}>
                        {({handleSubmit})=>
                        <Form>
                             {/* <FormGroup>
                                    <MyTextField className={styles.myTextField} type="number" name="maPhim" label="MÃ phim"  />
                                </FormGroup> */}
                                <FormGroup>
                                    <MyTextField className={styles.myTextField} type="text" name="tenPhim"  label="Tên phim"/>
                                </FormGroup>
                                {/* <FormGroup>
                                    <MyTextField className={styles.myTextField} type="text" name="biDanh" label="Bí Danh" />
                                </FormGroup> */}
                                <FormGroup>
                                    <MyTextField className={styles.myTextField} type="text" name="trailer" label="Trailer"/>
                                </FormGroup>
                                <FormGroup>
                                    <label> Hinh Ảnh</label>
                                    <MyInput type="file" name="hinhAnh" onChange={handleChangeFile}  />
                                </FormGroup>
                                <FormGroup>
                                    <MyTextField className={styles.myTextField} type="text" name="moTa" label="Mô tả" />
                                </FormGroup>
                                {/* <FormGroup>
                                    <MyTextField className={styles.myTextField} type="text" name="danhGia" label="Đánh Giá" />
                                </FormGroup> */}

                                <FormGroup>
                                
                                    <MyTextField className={styles.myTextField} type="date" name="ngayKhoiChieu"  />
                                </FormGroup>
                                <Button color="primary" onClick={() => {handleSubmit(); }}>Thêm phim</Button>
                                <Button color="secondary" onClick={() => dispatch(onToggleModal(false))}>Đóng</Button>
                            </Form>}
                    </Formik>
                </ModalBody>

            </Modal>
        </div>
    )
}

export default FormAddMovie
