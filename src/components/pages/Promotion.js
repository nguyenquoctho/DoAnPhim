import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { MyTextField } from "./SignUp";
// import { Formik, Form, useField } from "formik";
import styles from "../../styles/Layout/_listTable.module.scss";
// import * as yup from "yup";
import { Switch,FormControlLabel ,FormGroup } from '@material-ui/core';
// import {
//   Switch,
//   FormControlLabel,
//   FormGroup
// } from "reactstrap";
import { getListPromotion, addPromotion } from "../../actions/ManageBookTicket";
// const validationSchema = yup.object({
//   maCombo: yup
//     .string()
//     .required("* Bắt buộc")
//     .max(10, "Yêu cầu dưới 10 ký tự")
//     .min(5, "Yêu cầu trên 5 ký tự"),
//   tenCombo: yup
//     .string()
//     .required("* Bắt buộc")
//     .max(30, "Yêu cầu dưới 30 ký tự")
//     .min(5, "Yêu cầu trên 5 ký tự"),

//   gia: yup
//     .number()
//     .required("* Bắt buộc")
//     .max(1000000, "Yêu cầu dưới 1.000.000 vnđ")
//     .min(25000, "Yêu cầu trên 25.000 vnđ"),
// });
const Promotion = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListPromotion());
  }, []);
  const { listPromotion } = useSelector(
    (state) => state.manageBookTicketReducer
  );
  // console.log(listPromotion);
  // const [isactive, setIsactive] = useState(false);
  return (
    <div className={styles.listTable}>
      <div className={styles.listTable__header}>
        <h2>Khuyến Mãi</h2>
      </div>
      {/* <Formik
          initialValues={{
            maKM: "",
            tenKM: "",
            mucKM: "",
            hinhAnhKM:"",
            noiDungKM:""

          }}
          // validationSchema={validationSchema}
          onSubmit={values => dispatch(addPromotion(values))}
        >
          {({ handleSubmit }) => (
            <Form className={styles.listTable__Form}>
              <div className="row">
                <div className="col-4">
                <MyTextField className={styles.listTable__Form__Input} type="text" name="maKM" label="mã" />
              <MyTextField className={styles.listTable__Form__Input} type="text" name="tenKM" label="tên" />
                </div>
                <div className="col-4">
                <MyTextField className={styles.listTable__Form__Input} type="number" name="mucKM" label="mức" />
              <MyTextField className={styles.listTable__Form__Input} type="text" name="hinhAnhKM" label="Hình Ảnh" />
                </div>
                 <div className="col-4">
                   
              <MyTextField className={styles.listTable__Form__Input} type="text" name="noiDungKM" label="Nội dung" />
              <br></br>
              <button   className={styles.phim_btnWhite} type="submit" onClick={handleSubmit}>
                Thêm KM
              </button>
                 </div>
              </div>
             
            
            </Form>
          )}
        </Formik> */}
      <div className={styles.listTable__Tbl}>
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã KM</th>
              <th>Tên KM</th>
              <th>Mức KM</th>
              <th>Hình Ảnh</th>
              <th>Nội Dung</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listPromotion.length !== 0 &&
              listPromotion.map((item, index) => (
                <tr
                  className={index % 2 !== 0 ? styles.trOdd : ""}
                  key={item.maKM}
                >
                  <td>{index + 1}</td>
                  <td>{item.maKM}</td>
                  <td>{item.tenKM}</td>
                  <td>{item.mucKM}%</td>
                  <td>
                    <img src={item.hinhAnhKM}></img>
                  </td>
                  <td>{item.noiDungKM}</td>
                  <td>
                    {/* <button
                      className={styles.listTable__BtnDelete}
                      // onClick={() => dispatch(deleteCombo(item.maCombo))}
                    >
                      {" "}
                      <i className="fas fa-trash "></i>
                    </button> */}
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            // size="small"
                            checked={item.isOn}
                            onChange={()=>{dispatch(addPromotion(item,!item.isOn))}}
                          />
                        }
                        // label="Normal"
                      />
                      {/* <FormControlLabel
                        control={
                          <Switch checked={true} onChange={()=>{}} />
                        }
                        label="Normal"
                      /> */}
                    </FormGroup>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Promotion;
