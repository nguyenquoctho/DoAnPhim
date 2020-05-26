import React, {useState, useEffect} from 'react'
import styles from '../../styles/Layout/_carousel.module.scss'
import ImgComp from './ImgComp';
const Carousel=()=> {
    let sliderArr = [
    <ImgComp src="./img/annabelle.jpg" content=" Cameron is presently in pre-production on three Avatar sequels." title="annabelle" video="https://www.youtube.com/embed/EMa-KFfatT0"/>,
    <ImgComp src="./img/bossbaby.jpg" content=" Cameron is presently in pre-production on three Avatar sequels." title="bossbaby" video="https://www.youtube.com/embed/r8kE7rSzfQs"/>,
    <ImgComp src="./img/cover_dora.jpg" content=" Cameron is presently in pre-production on three Avatar sequels." title="cover_dora" video="https://www.youtube.com/embed/TnpTcrtsN3U"/>,
    <ImgComp src="./img/unnderwater.png" content=" Cameron is presently in pre-production on three Avatar sequels." title="unnderwater" video="https://www.youtube.com/embed/Rszr56AH3Co"/>,
    <ImgComp src="./img/avatar.jpg" content=" Cameron is presently in pre-production on three Avatar sequels." title="avatar" video="https://www.youtube.com/embed/yUXd-enstO8"/>,];
    const [x,setX] = useState(0)
    const goLeft=()=>{
       x===0 ? setX(-100 * (sliderArr.length -1)) : setX(x+100)
    }
    const goRight=()=>{
       x=== -100*(sliderArr.length -1) ? setX(0) : setX(x-100)
    }
    useEffect(() => {
        let timeOut = setTimeout(() => {
            goRight()
        }, 5000);
      
        return () => {
          // Tương ứng với componentWillUnmount
          // Sẽ chạy khi component bị xoá khỏi DOM
          // Trong này ta thường sẽ xử lý clearTimeout, removeEvenlistener,...
         
          clearTimeout(timeOut);
        };
      } , [x]);
    return (
        <div className={styles.slider}>
         {sliderArr.map((item,index)=>{
             return(
                 <div key={index} className={styles.slide} style={{transform:`translateX(${x}%)`}}>{item}</div>
             )
         })}
         <button className={styles.goLeft} onClick={()=>{goLeft()}}></button>
         <button className={styles.goRight} onClick={()=>{goRight()}}></button>
        </div>
    )
}

export default Carousel
