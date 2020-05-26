import React, { Component } from "react";
import { TextField, List, ListItem, ListItemText } from "@material-ui/core";
import firebase from "firebase";
import { useDispatch, connect } from "react-redux";
// import "./App.css"
import styles from "../../styles/Layout/_message.module.scss";
const userInfo = JSON.parse(localStorage.getItem("userInformation"));
const date = new Date()

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", user: "",time: "",room:"", listUsers: [], messages: [] };
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
    // console.log(this.props.listUsers)
    this.getListUser();
    console.log(`${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()+1}`)
    this.getMessages();

  }

  onSubmit = (event) => {
    if (userInfo) {
      if (event.charCode === 13 && this.state.text.trim() !== "") {
        this.writeMessageToDB(this.state.text);
        this.setState({ text: "" });
        this.setState({ user: "" });
        this.setState({ time: "" });
      }
    }
  };

  writeMessageToDB = (message) => {
    if (userInfo) {
      firebase.database().ref(`messages/${this.state.room}`).push({
        text: message,
        user: userInfo.taiKhoan,
        time: `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()+1}`,
      });
    } else {
      firebase.database().ref("messages/").push({
        text: message,
        user: "user",
        time: `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()+1}`,
      });
    }
  };
  setUser=(userId)=>{
      this.setState({room:userId})
    var messagesDB = firebase
    .database()
    .ref(`messages/${userId}`)
    .limitToLast(500);
    messagesDB.on("value", (snapshot) => {
    let newMessages = [];
    snapshot.forEach((child) => {
      var message = child.val();
      newMessages.push({
        id: child.key,
        text: message.text,
        user: message.user,
        time: message.time
      });
    });
    this.setState({ messages: newMessages });
    // this.bottomSpan.scrollIntoView({ behavior: "smooth" })
  });
  }
  getListUser = () => {
    var messagesDB = firebase.database().ref("messages/").limitToLast(500);
    messagesDB.on("value", (snapshot) => {
      let newListUser = [];
      snapshot.forEach((child) => {
        //   let useritem = child.val();
        newListUser.push({
          Userid: child.key,
        });
      });
      console.log(newListUser);
      this.setState({ listUsers: newListUser });
      // this.bottomSpan.scrollIntoView({ behavior: "smooth" })
    });
  };
  getMessages = () => {
    if (userInfo) {
      var messagesDB = firebase
        .database()
        .ref(`messages/bibi123`)
        .limitToLast(500);
      messagesDB.on("value", (snapshot) => {
        let newMessages = [];
        snapshot.forEach((child) => {
          var message = child.val();
          newMessages.push({
            id: child.key,
            text: message.text,
            user: message.user,
            time: message.time
          });
        });
        this.setState({ messages: newMessages });
        // this.bottomSpan.scrollIntoView({ behavior: "smooth" })
      });
    } else {
      var messagesDB = firebase.database().ref("messages/").limitToLast(500);
      messagesDB.on("value", (snapshot) => {
        let newMessages = [];
        snapshot.forEach((child) => {
          var message = child.val();
          newMessages.push({
            id: child.key,
            text: message.text,
            user: message.user,
            time: message.time
          });
        });
        this.setState({ messages: newMessages });
        // this.bottomSpan.scrollIntoView({ behavior: "smooth" })
      });
    }
  };

  renderMessages = () => {
    console.log(this.state.messages);
    return this.state.messages.map((message, index) => (
      <ListItem className={styles.ListMessage__Item} key={index}>
        <ListItemText
        //   style={{ wordBreak: "break-word" }}
          className={userInfo.taiKhoan===message.user ? "text-right": "text-left"}
    primary={message.user===userInfo.taiKhoan ? (<span>bạn {message.time}</span>):(<span>{message.user} {message.time}</span>)}
        />
      
       
          {message.text.length>30 ? (<h6 className={userInfo.taiKhoan===message.user ? `text-right m-0 bg-warning ${styles.ListMessage__Item__User}`: `text-left m-0  ${styles.ListMessage__Item__partner}`}>{message.text}</h6>):  (<h6 className={userInfo.taiKhoan===message.user ? `text-right my-2`: `text-left my-2 `}><span className={userInfo.taiKhoan===message.user ? `text-right m-0 bg-warning ${styles.ListMessage__Item__User}`: `text-left m-0  ${styles.ListMessage__Item__partner}`}>{message.text}</span></h6> ) }
         
          
    
      </ListItem>
    ));
  };
  renderListUser = () => {
    console.log(this.state.listUsers);
    return this.state.listUsers.map((item, index) => <p onClick={()=>{this.setUser(item.Userid)}}    className={this.state.room===item.Userid ? ` ${styles.ItemUser}`: ` ${styles.ItemPartner}`}  key={index}>{item.Userid}</p>);
  };

  render() {
    return (
      <div className={styles.message}>
        <div className={styles.message__ChatBox}>
          <List className={styles.ListMessage}>{this.renderMessages()}</List>
          <TextField
            autoFocus={true}
            multiline={true}
            rowsMax={3}
            placeholder="Nhập tin nhắn..."
            onChange={(event) => this.setState({ text: event.target.value })}
            value={this.state.text}
            onKeyPress={this.onSubmit}
            style={{ width: "100%", overflow: "hidden" }}
          />
          <span ref={(el) => (this.bottomSpan = el)} />
        </div>
        <div className={styles.message__ListUser}>{this.renderListUser()}</div>
      </div>
    );
  }
}

export default Message;
