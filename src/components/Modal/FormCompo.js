import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { onToggleModalCompo, chooseCompoAction, getListCombo } from "../../actions/ManageBookTicket";

const FormCompo = () => {
  const { isOpenCompo, listCompo } = useSelector(
    state => state.manageBookTicketReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListCombo());
  }, []);
 
  return (
    <div>
      <Modal
        isOpen={isOpenCompo}
        toggle={() => dispatch(onToggleModalCompo(false))}
      >
        <ModalHeader>Chọn Compo</ModalHeader>
        <ModalBody>
          <table className="table">
            <thead>
              
            </thead>
            <tbody>
              {listCompo.length !== 0 && listCompo.map((item, index) => (
                <tr key={index}>
                  <td>{item.tenCompo}</td> 
                  <td>{item.gia} vnđ</td>
                  <td> <button onClick={()=>dispatch(chooseCompoAction({compo:`${item.tenCompo}`,val:false}))}>-</button> {item.soLuong} <button onClick={()=>dispatch(chooseCompoAction({compo:`${item.tenCompo}`,val:true}))}>+</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
};

export default FormCompo;
