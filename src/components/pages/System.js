import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListCombo,
  addCombo,
  deleteCombo
} from "../../actions/ManageBookTicket";
import { MyTextField } from "./SignUp";
import { Formik, Form } from "formik";
import styles from "../../styles/Layout/_listTable.module.scss";
import * as yup from "yup";
const validationSchema = yup.object({
  maCombo: yup
    .string()
    .required("* Bắt buộc")
    .max(10, "Yêu cầu dưới 10 ký tự")
    .min(5, "Yêu cầu trên 5 ký tự"),
  tenCombo: yup
    .string()
    .required("* Bắt buộc")
    .max(30, "Yêu cầu dưới 30 ký tự")
    .min(5, "Yêu cầu trên 5 ký tự"),

  gia: yup
    .number()
    .required("* Bắt buộc")
    .max(1000000, "Yêu cầu dưới 1.000.000 vnđ")
    .min(25000, "Yêu cầu trên 25.000 vnđ")
});
const System = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListCombo());
  }, []);
  const { listCompoSystem } = useSelector(
    state => state.manageBookTicketReducer
  );
  // console.log(listCompoSystem);
  return (
    <div className={styles.listTable}>
    
        <div className={styles.listTable__header}>
          <h2>Danh sách sản phẩm</h2>
        </div>
        <Formik
          initialValues={{
            maCombo: "",
            tenCombo: "",
            gia: ""
          }}
          validationSchema={validationSchema}
          onSubmit={values => dispatch(addCombo(values))}
        >
          {({ handleSubmit }) => (
            <Form className={styles.listTable__Form}>
              <MyTextField className={styles.listTable__Form__Input} type="text" name="maCombo" label="mã sản phẩm" />
              <MyTextField className={styles.listTable__Form__Input} type="text" name="tenCombo" label="tên sản phẩm" />
              <MyTextField className={styles.listTable__Form__Input} type="number" name="gia" label="giá" />
              <button   className={styles.phim_btnWhite} onClick={handleSubmit}>
                Thêm sản phẩm
              </button>
            </Form>
          )}
        </Formik>
        <div className={styles.listTable__Tbl}>
          <table className="table">
            <thead>
              <tr>
                  <th>STT</th>
                <th>Mã sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listCompoSystem.length !== 0 &&
                listCompoSystem.map((item, index) => (
                  <tr
                    className={index % 2 !== 0 ? styles.trOdd : ""}
                    key={item.maCombo}
                  >
                      <td>{index+1}</td>
                    <td>{item.maCombo}</td>
                    <td>{item.tenCombo}</td>
                    <td>{item.gia}</td>
                    <td>
                      <button
                        className={styles.listTable__BtnDelete}
                        onClick={() => dispatch(deleteCombo(item.maCombo))}
                      >
                        {" "}
                        <i className="fas fa-trash "></i>
                      </button>
                    </td>
                    {/* <button className="btn btn-success" onClick={() => {dispatch(sanPhamDangChonAction(item)); dispatch(onToggleModal(true))}}>Sua san pham</button> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
   
    </div>
  );
};

export default System;
