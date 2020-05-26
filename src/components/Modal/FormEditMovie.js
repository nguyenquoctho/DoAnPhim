import React ,{ useState }from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, useField } from 'formik';
import { onToggleModal } from '../../actions/ManageUser';
import { MyTextField } from '../pages/SignUp';
import { editMovie } from '../../actions/ManageMovie';
import styles from "../../styles/Layout/_formUser.module.scss";
const MyInput = ({...props}) => {
    const [field, meta] = useField(props)
    return <input {...field} {...props}/>
}
const FormEditMovie=()=> {
    const {isOpen}= useSelector(state=>state.userReducer)
    const {movieDetail} = useSelector(state=>state.manageMovieReducer);
    const dispatch = useDispatch();
    const [file,setFile] = useState("");
    const handleChangeFile=e=>{
        setFile(e.target.files[0])
    }
    return (
        <div>
            <Modal isOpen={isOpen} toggle={()=>dispatch(onToggleModal(false))}>
                <h2>Cập nhật thông tin phim</h2>
                <ModalBody>
                    <Formik initialValues={{
                        maPhim:movieDetail.maPhim,
                        tenPhim: movieDetail.tenPhim,
                        biDanh: movieDetail.biDanh,
                        trailer: movieDetail.trailer,
                        hinhAnh: movieDetail.hinhAnh,
                        moTa: movieDetail.moTa,
                        ngayKhoiChieu: movieDetail.ngayKhoiChieu,
                        danhGia: movieDetail.danhGia
                        
                    }}
                    onSubmit = {values=>dispatch(editMovie({...values,hinhAnh: movieDetail.hinhAnh}))}
                    >
                        {({handleSubmit})=><Form>
                        <FormGroup>
                                    <MyTextField  className={styles.myTextField} type="text" name="maPhim" disabled={true} label="Ma Phim" />
                                </FormGroup>
                                <FormGroup>
                                    <MyTextField className={styles.myTextField} type="text" name="tenPhim" label="Ten Phim" />
                                </FormGroup>
                                {/* <FormGroup>
                                    <MyTextField className={styles.myTextField} type="text" name="biDanh" label="Bi Danh" />
                                </FormGroup> */}
                                <FormGroup>
                                    <MyTextField className={styles.myTextField} type="text" name="trailer" label="trailer" />
                                </FormGroup>
                                {/* <FormGroup>
                                    <label> Hinh Anh </label>
                                    <MyTextField type="text" name="hinhAnh" />
                                </FormGroup> */}
                                <FormGroup>
                                    <MyTextField className={styles.myTextField} type="text" name="moTa" label="Mo Ta" />
                                </FormGroup>
                                <FormGroup>
                                {/* <label> Ngay khoi chieu</label> */}
                                    <MyTextField  className={styles.myTextField} type="date" name="ngayKhoiChieu"  label="ngayKhoiChieu" />
                                </FormGroup>
                                {/* <FormGroup>
                                    <MyTextField className={styles.myTextField} type="text" name="danhGia" label="Danh Gia" />
                                </FormGroup> */}
                                <Button color="success" onClick={()=>{handleSubmit();dispatch(onToggleModal(false))}}>Cập nhật</Button>
                                <Button color="warning" onClick={()=>dispatch(onToggleModal(false))}>Đóng</Button>
                            </Form>}
                    </Formik>
                </ModalBody>
                </Modal>        
        </div>
    )
}

export default FormEditMovie