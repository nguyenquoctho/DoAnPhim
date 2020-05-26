import React from 'react'
import { Modal } from 'reactstrap';
import { onToggleModalTrailer } from '../../actions/ManageMovie';
import { useDispatch, useSelector } from 'react-redux';
import styles from "../../styles/Layout/_modalTrailer.module.scss";
const ModalTrailer=()=> {
    const dispatch = useDispatch()
    const {trailer,isOpenTrailer} = useSelector(state=>state.manageMovieReducer);
    return (
        
        <div className={styles.modalTrailer} >
             <Modal   isOpen={isOpenTrailer} toggle={()=>dispatch(onToggleModalTrailer(false))} >
             {/* <button type="button" className="close" onClick={()=>dispatch(onToggleModalTrailer(false))}>
                <span aria-hidden="true">&times;</span>
              </button> */}
             <iframe width="560" height="315"  src={trailer} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
             {/* <iframe className="venoframe vbvid figlio" webkitallowfullscreen="" mozallowfullscreen="" allowFullScreen="" frameBorder="0" src={trailer} ></iframe> */}
             </Modal>
        </div>
    )
}

export default ModalTrailer
