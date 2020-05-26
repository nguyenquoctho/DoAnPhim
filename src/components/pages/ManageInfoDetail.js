import React, { useEffect }  from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Layout/_listInfo.module.scss";
const ManageInfoDetail = () => {
    const { infoDetail } = useSelector(state => state.infoReducer);
    // console.log(infoDetail)
    let getNodes = str => new DOMParser().parseFromString(str, 'text/html').body.childNodes;
    let nodes = getNodes(infoDetail);
   useEffect(() => {
   let content =  document.getElementById("containerInfo");
   nodes.forEach(node => content.appendChild(node.cloneNode(true)));
  
  }, []);
  return (
    <>
    
     {/* <div className={styles.infoDetail}> */}
     
      {/* <h2 className={styles.infoDetail__h2}>Tin Tức</h2> */}
      <div className={styles.infoDetail} id="containerInfo">

      </div>
      
     
    {/* </div> */}
    </>
    
  );
};

export default ManageInfoDetail;
