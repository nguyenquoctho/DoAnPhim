import React from "react";
import styles from "../../styles/Layout/_brandTypeFilm.module.scss";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
const BrandTypeFilm = () => {
  return (
    <div className={styles.brandContainer}>
      <div id="Popover1" className={styles.brandItem}>
        <UncontrolledPopover
          trigger="legacy"
          placement="bottom"
          target="Popover1" 
          style={{width:700}}
        >
           <PopoverBody style={{width:700}}  >
             <div className={styles.brandItem__Popover1}>
             <h3>Dobly atmos - công nghệ âm thanh mới nhất mang tính đột phá</h3>
             <p>Dolby Atmos - sự phát triển đáng kể nhất trong công nghệ âm thanh kể từ 
               âm thanh vòm, đang tạo ra sự thay đổi độc đáo trong thiết kế âm thanh phân lớp, hiện tại đã có mặt tại
               Việt Nam và sẵn sàng phục vụ quý khách hàng tại Star Movie.
             </p>
             <p>Dolby Atmos sử dụng thiết kế phân lớp tân tiến để tạo nên các rãnh âm thanh. Lớp nền bao gồm các dải âm thanh môi trường tĩnh được phối theo phương pháp âm thanh phân luồng quen thuộc. Các lớp trên trần bao gồm các yếu tố âm thanh động được định hướng và thay đổi một cách chính xác theo hình ảnh hiển thị trên màn hình trong rạp. Bằng cách lắp đặt hệ thống loa ở trên đầu và xung quanh, Dolby Atmos có thể khiến khán giả trải nghiệm những âm thanh trung thực và tự nhiên như thật của bộ phim.
             </p>
             <h4 >TẠI SAO DOLBY ATMOS CÓ THỂ TẠO NÊN SỰ KHÁC BIỆT KHI TRẢI NGHIỆM ĐIỆN ẢNH</h4>
             <p>- Âm thanh rõ ràng và được định hướng một cách chính xác hơn; Sự trộn âm có định hướng đối tượng từ các yếu tố âm thanh theo lớp độc lập đến âm thanh phân luồng.</p>
            <p>- Kết nối ý đồ của đạo diễn từ dữ liệu mô tả và phát lại theo công nghệ âm thanh được trang bị cho từng phòng chiếu.</p>
            <p>- Tự động tạo ra các rãnh âm thanh tối ưu cho các phòng chiếu 5.1 và 7.1</p>
            <p>- Tạo ra trải nghiệm âm thanh sống động, trung thực thông qua 128 yếu tố âm thanh đồng thời và không bị mất đi khi phối âm.</p>
            <p>- Quy mô được điều chỉnh theo kích cỡ của từng phòng chiếu với hệ thống lên đến 64 loa độc lập với nhau.</p>
            <p>Trên thế giới hiện tại chỉ có 25 rạp trang bị hệ thống Dolby Atmos, và CineStar rất hân hạnh là một thành viên trong số đó.</p>
            </div>
           </PopoverBody>
        </UncontrolledPopover>
        <img src="./img/dolby2.png"></img>
      </div>
      {/* <div className={styles.brandItem}>
        <img src="./img/crhistie.png"></img>
      </div> */}
      <div id="Popover2" className={styles.brandItem}>
      <UncontrolledPopover
          trigger="legacy"
          placement="top"
          target="Popover2" 
          style={{width:700}}
        >
          <PopoverBody style={{width:700}}  >
             <div className={styles.brandItem__Popover2}>
             <h3>Công nghệ chiếu phim 2D Digital</h3>
             <p>Công nghệ chiếu phim 2D Digital là công nghệ chiếu phim kỹ thuật số 2 chiều, mang tới hình ảnh rõ nét cho khán giả yêu điện ảnh. Khán giả sẽ không phải mang kính khi xem phim 2D Digital.
             </p>
             <p>So với công nghệ chiếu phim 35mm sử dụng bản phim nhựa, thì định dạng 2D Digital sẽ giải quyết trọn vẹn vấn đề xước bản phim gây khó chịu cho khán giả, mang lại hình ảnh sắc nét hơn.
             </p>
            <p>Hiện tại, tất cả phòng chiếu của CineStar đều trang bị công nghệ chiếu phim 2D Digital.</p>
            </div>
           </PopoverBody>
        </UncontrolledPopover>
        <img src="./img/2d.jpg"></img>
      </div>
      <div id="Popover3" className={styles.brandItem}>
      <UncontrolledPopover
          trigger="legacy"
          placement="left"
          target="Popover3" 
          style={{width:700}}
        >
          <PopoverBody style={{width:700}}  >
             <div className={styles.brandItem__Popover2}>
             <h3>Công nghệ chiếu phim 3D Digital</h3>
             <p>So với công nghệ chiếu phim 2D Digital (Kỹ thuật số 2 chiều), công nghệ 3D Digital (Kỹ thuật số 3 chiều) cho phép khán giả cảm nhận thêm chiều sâu của hình ảnh, giúp cho không gian điện ảnh trở nên sống động như không gian thực mà chúng ta đang sống.
             </p>
             <p>Phim 3D được quay từ tối thiểu hai máy cùng một lúc, từ hai góc nhìn khác nhau tương ứng với hoạt động của hai mắt người. Khi xem phim khán giả sẽ cần đeo kính 3D để lọc hình ảnh cho mỗi mắt, khi qua não bộ sẽ chập lại tạo thành hình ảnh không gian ba chiều.
             </p>
            <p>Các phòng chiếu phim 3D Digital này đều sử dụng màn hình tráng bạc để giảm thiểu lượng hao hụt ánh sáng một cách tối đa.</p>
            <img src="https://cinestar.com.vn/pictures/moi/8DinhDang/3d2.jpg"></img>
            </div>
           </PopoverBody>
        </UncontrolledPopover>
        <img src="./img/3d.png"></img>
      </div>
      {/* <div className={styles.brandItem}>
        <img src="./img/cinestar-coffee-02.png"></img>
      </div> */}
    </div>
  );
};

export default BrandTypeFilm;
