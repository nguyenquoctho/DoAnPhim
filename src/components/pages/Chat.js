import React, { Component } from "react"
import { TextField, List, ListItem, ListItemText } from "@material-ui/core"
import firebase from "firebase"
// import "./App.css"
import "../../styles/Helper/_customize.scss"
import Swal from 'sweetalert2';
import styles from "../../styles/Layout/_chatBox.module.scss";
const userInfo = JSON.parse(localStorage.getItem("userInformation"));
const date = new Date()
class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = { text: "",user:"",time: "",openBoxChat:false, messages: [] }
  }

  componentDidMount() {
    // var config = {
    //   apiKey: "AIzaSyB57g6S3CzwzMhRYM1o36xgdxjJ9htOJWQ",
    //   authDomain: "fir-chat-app-dd80a.firebaseapp.com",
    //   databaseURL: "https://fir-chat-app-dd80a.firebaseio.com",
    //   projectId: "fir-chat-app-dd80a",
    //   storageBucket: "fir-chat-app-dd80a.appspot.com",
    //   messagingSenderId: "940693699636"
    // }
    // firebase.initializeApp(config)
    // var firebaseConfig = {
    //     apiKey: "AIzaSyAfKuFO05b3dUqSWYquBNYCdReiyKFXLA8",
    //     authDomain: "phimcomment.firebaseapp.com",
    //     databaseURL: "https://phimcomment.firebaseio.com",
    //     projectId: "phimcomment",
    //     storageBucket: "phimcomment.appspot.com",
    //     messagingSenderId: "659649374403",
    //     appId: "1:659649374403:web:10b1d8f69022d5274e5a76",
    //     measurementId: "G-T7E7J1NEC5"
    //   };
    //   // Initialize Firebase
    //   firebase.initializeApp(firebaseConfig);
    this.getMessages()
  }

  onSubmit = event => {
      if(userInfo){
        if (event.charCode === 13 && this.state.text.trim() !== "") {
            this.writeMessageToDB(this.state.text)
            this.setState({ text: "" })
            this.setState({ user: "" })
            this.setState({ time: "" })
          }
      }else{
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Xin hãy đăng nhập",
            showConfirmButton: true
          });
      }
   
  }

  writeMessageToDB = message => {
      if(userInfo){
        firebase
        .database()
        .ref(`messages/${userInfo.taiKhoan}`)
        .push({
          text: message,
          user:userInfo.taiKhoan,
          time: `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()+1}`,
        })
      }
    
  }

  getMessages = () => {
      if(userInfo){
        var messagesDB = firebase
        .database()
        .ref(`messages/${userInfo.taiKhoan}`)
        .limitToLast(500)
      messagesDB.on("value", snapshot => {
        let newMessages = []
        snapshot.forEach(child => {
          var message = child.val()
          newMessages.push({ id: child.key, text: message.text,user:message.user,  time: message.time })
        })
        this.setState({ messages: newMessages })
        // this.bottomSpan.scrollIntoView({ behavior: "smooth" })
      })
      }else{
        var messagesDB = firebase
        .database()
        .ref("messages/")
        .limitToLast(500)
      messagesDB.on("value", snapshot => {
        let newMessages = []
        snapshot.forEach(child => {
          var message = child.val()
          newMessages.push({ id: child.key, text: message.text,user:message.use,  time: message.timer })
        })
        this.setState({ messages: newMessages })
        // this.bottomSpan.scrollIntoView({ behavior: "smooth" })
      })
      }
   
  }

  renderMessages = () => {
      // console.log(this.state.messages)
    return this.state.messages.map((message,index) => (
      <div key={index} style={{ width:"240px"}} className="mx-3">
            <h6
         className={userInfo.taiKhoan===message.user ? "text-right my-1": "text-left my-1"}
        
        >{message.time}
        </h6>
        {/* <h6 
        className={userInfo.taiKhoan===message.user ? `text-right m-1 ${styles.listMessage__Item_User}`:`m-1 text-left ${styles.listMessage__Item_Admin}`}
          style={{ wordBreak: "break-word" }}
         
        >  */}
        {message.text.length>20 ? (<h6 className={userInfo.taiKhoan===message.user ? `text-right m-0 bg-warning ${styles.ListMessage__Item__User}`: `text-left m-0  ${styles.ListMessage__Item__partner}`}>{message.text}</h6>):  (<h6 className={userInfo.taiKhoan===message.user ? `text-right my-2`: `text-left my-2 `}><span className={userInfo.taiKhoan===message.user ? `text-right m-0 bg-warning ${styles.ListMessage__Item__User}`: `text-left m-0  ${styles.ListMessage__Item__partner}`}>{message.text}</span></h6> ) }
         
      {/* </h6> */}
      </div>
    ))
  }

  openCloseMessenger=(validation)=>{
      this.setState({openBoxChat:validation})
  }

  render() {
    return (
        <>
        {userInfo ? (
         this.state.openBoxChat ? (  <div className={styles.chatBox}>
            <div className={styles.chatBox__Close}><i onClick={()=>{this.openCloseMessenger(false)}}  className="fas fa-times"></i></div>
            <hr ></hr>
            <List className={styles.listMessage}>{this.renderMessages()}</List>
            <TextField
              autoFocus={true}
              multiline={true}
              rowsMax={3}
              placeholder="Nhập tin nhắn..."
              onChange={event => this.setState({ text: event.target.value })}
              value={this.state.text}
              onKeyPress={this.onSubmit}
              style={{ width: "95%",height:"100px" ,margin:"5px", overflow: "auto" }}
            />
            <span ref={el => (this.bottomSpan = el)} />
          </div>):(<div className={styles.MessengerIcon}>
              <div className={styles.MessengerIcon__Border}>
              <img onClick={()=>{this.openCloseMessenger(true)}}  src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Facebook_Messenger-512.png"></img>
              </div>  </div>)
      ):("")}
      </>
    )
  }
}

export default Chat
