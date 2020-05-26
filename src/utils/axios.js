import axios from "axios";

// Config global axios
// Sau này khi sử dụng axios sẽ import từ đây
const instance = axios.create({
  baseURL: "http://movie0706.cybersoft.edu.vn/api/"
});
export const  setAuthorization=token=>{
  instance.defaults.headers.common.Authorization = `Bearer ${token}`
}
export default instance