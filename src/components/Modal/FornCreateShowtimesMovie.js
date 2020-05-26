import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import { Formik, Form } from 'formik';

import styles from "../../styles/Layout/_formUser.module.scss";
import { MyTextField } from '../pages/SignUp';

import { onToggleModalTicket } from '../../actions/ManageBookTicket';
import { createShowtime } from '../../actions/ManageMovie';

const FormCreateShowtimesMovie = () => {
    const { isOpenTicket } = useSelector(state => state.manageBookTicketReducer)
    const dispatch = useDispatch();
    const {movieDetail} = useSelector(state=>state.manageMovieReducer);
    return (
        <div>
            <Modal isOpen={isOpenTicket} toggle={() => dispatch(onToggleModalTicket(false))} >
                <h2>Tạo lịch chiếu</h2>
                <ModalBody>
                    <Formik initialValues={{
                        maPhim:movieDetail.maPhim,
                        maRap: '',
                        giaVe: '',
                        ngayChieuGioChieu:''
                    }}
                        onSubmit={values =>dispatch(createShowtime(values))
                            // console.log(values)
                        }
                    >
                        {({ handleSubmit }) =>
                            <Form>

                               {/* <FormGroup>
                                    <MyTextField type="text" name="maPhim" label="ma phim" />
                                </FormGroup> */}
                                <FormGroup>
                                    <MyTextField className={styles.myTextField} type="text" name="maRap" label="ma rap" />
                                </FormGroup>
                                <FormGroup>
                                    <MyTextField className={styles.myTextField} type="text" name="giaVe" label="gia ve" />
                                </FormGroup>
                                <FormGroup>
                               
                                    <MyTextField className={styles.myTextField} type="datetime-local" name="ngayChieuGioChieu"  />
                                </FormGroup>
                                <Button color="primary" onClick={() => {handleSubmit(); dispatch(onToggleModalTicket(false))}}>Tạo lịch chiếu</Button>
                                <Button color="secondary" onClick={() => dispatch(onToggleModalTicket(false))}>Đóng</Button>
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
export default FormCreateShowtimesMovie
