import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListInfo,
  deleteInfo,
  addInfo,
  showFormAction,
  getInfoDetail,
} from "../../actions/ManageInfo";
import styles from "../../styles/Layout/_listInfo.module.scss";
import { Formik, useField } from "formik";
import { Form, FormGroup } from "reactstrap";
import * as yup from "yup";
import { MyTextField } from "../ui/Header";
const validationSchema = yup.object({
  maThongTin: yup
    .string()
    .required("* Bắt buộc")
    .max(10, "Yêu cầu dưới 10 ký tự")
    .min(3, "Yêu cầu trên 3 ký tự"),
  tieude: yup
    .string()
    .required("* Bắt buộc")
    .max(70, "Yêu cầu dưới 70 ký tự")
    .min(10, "Yêu cầu trên 10 ký tự"),

  noidung: yup
    .string()
    .required("* Bắt buộc")
    .max(1000, "Yêu cầu dưới 1000 ký tự")
    .min(55, "Yêu cầu trên 25 ký tự"),
  hinhanh: yup
    .string()
    .required("* Bắt buộc")
    .max(1000, "Yêu cầu dưới 1000 ký tự")
    .min(10, "Yêu cầu trên 25 ký tự"),
  chitiet: yup
    .string()
    .required("* Bắt buộc")
    .max(3000, "Yêu cầu dưới 1000 ký tự")
    .min(5, "Yêu cầu trên 25 ký tự"),
});

const InfoList = ({ ...props }) => {
  const { showForm } = useSelector((state) => state.infoReducer);
  const dispatch = useDispatch();
  const MyInput = ({ ...props }) => {
    const [field, meta] = useField(props);
    return <textarea {...field} {...props} />;
  };
  useEffect(() => {
    dispatch(getListInfo());
  }, []);
  const { listInfo } = useSelector((state) => state.infoReducer);
  return (
    <div className={styles.infoList}>
      <div className={styles.listTable__header}>
      <button
          className={styles.infoList__BtnAdd}
          onClick={() => dispatch(showFormAction(!showForm))}
        >
          Thêm tin tức
        </button>
        <h2>Tin Tức</h2>
        
      </div>
      <div className="container">
        {showForm ? (
          
          <Formik
            initialValues={{
              maThongTin: "",
              tieude: "",
              noidung: "",
              hinhanh: "",
              chitiet: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => dispatch(addInfo(values))}
          >
            {({ handleSubmit }) => (
              <Form className={styles.Form__Info}>
                <div className="row">
                  <FormGroup className="col-12 col-lg-4 col-md-4">
                    <MyTextField
                      className={styles.Form__Input}
                      type="text"
                      name="maThongTin"
                      label="Mã thông tin"
                    />
                  </FormGroup>
                  <FormGroup className="col-12 col-lg-4 col-md-4">
                    <MyTextField
                      className={styles.Form__Input}
                      type="text"
                      name="tieude"
                      label="Tiêu đề"
                    />
                  </FormGroup>
                  <FormGroup className="col-12 col-lg-4 col-md-4">
                    <MyTextField
                      className={styles.Form__Input}
                      type="text"
                      name="hinhanh"
                      label="Hình ảnh"
                    />
                  </FormGroup>
                </div>
                <FormGroup>
                  <MyInput
                    className={styles.movieComment__MyInput}
                    type="text"
                    name="noidung"
                    cols="125"
                    rows="8"
                    placeholder="Nội dung..."
                  />
                </FormGroup>

                <FormGroup>
                  <MyInput
                    className={styles.movieComment__MyInput}
                    type="text"
                    name="chitiet"
                    cols="125"
                    rows="30"
                    placeholder="Chi tiết..."
                  />
                </FormGroup>
                <div>
                  <button className="btn btn-success" onClick={handleSubmit}>
                    Đăng
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          ""
        )}

        <div className="row">
          {listInfo &&
            listInfo.map((item, index) => (
              <div key={index} >
                <div className="card p-3 ">
                  <div className="row">
                    <div className="col-12 col-lg-4">
                      <img 
                        className={styles.info__img}
                        onClick={() => {
                          props.history.push(`/admin/management-info-detail/${item.maInfo}`);
                          dispatch(getInfoDetail(item.maInfo))
                        }}
                        src={item.hinhanh}
                      ></img>
                      <div></div>
                    </div>
                    <div className="col-12 col-lg-8"> 
                    <h4>{item.tieude}</h4>
                    <p>{item.noidung}</p>
                    <button
                      className={styles.info__Btn}
                      onClick={() => {
                        dispatch(deleteInfo(item.maInfo));
                      }}
                    >
                      <i className="fas fa-trash "></i>
                    </button>
                    </div>
                    
                    {/* <button>
                      <i className="fas fa-edit"></i>
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default InfoList;
