/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React,{useState,useEffect,createRef} from "react";
import ReactDOM from "react-dom";
import "./style.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import {Nav,NavItem,Navbar,Container} from "react-bootstrap";
import {HouseFill,PersonFill,BoxArrowInRight} from 'react-bootstrap-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch,Link } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import Post from "./Post";

firebase.initializeApp({
  apiKey: "AIzaSyD5AnQdIML65gm2vp91nWt1AGbwLQQ75l8",
  authDomain: "chat-7153a.firebaseapp.com",
  databaseURL: "https://chat-7153a-default-rtdb.firebaseio.com",
  projectId: "chat-7153a",
  storageBucket: "chat-7153a.appspot.com",
  messagingSenderId: "474170944297",
  appId: "1:474170944297:web:7227dbdeef5a75b0206538",
  measurementId: "G-H77CVNSHRY",
});

function App(){
const [uname,setUname] = useState("User");
const [avatar,setAvatar] = useState(`https://avatars.dicebear.com/api/avataaars/User${Math.random()}.svg`);
const [list,setList] = useState();
var ref = createRef();

function Home(){
return(
  <>
  <div className="bg">
  <center>
  <div className="screen">
    <Navbar bg="light" variant="light">
    <Container>
      <Navbar.Brand>
        <img alt="title" width="70" src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo-500x313.png" className="d-inline-block align-top"/>
      </Navbar.Brand>
      <Nav>
      <Nav.Link as={Link} to="/"><HouseFill color="black" size={20}/></Nav.Link>
      <Nav.Link as={Link} to="/profile"><PersonFill color="black" size={20}/></Nav.Link>
      <Nav.Link><BoxArrowInRight color="black" size={20} onClick={auth}/></Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  <div style={{marginTop:30}}>
  <center>
  <input type="file" id="file" onChange={async (e) => {
    var storage = firebase.storage();
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      };
    const file = await imageCompression(e.target.files[0],options);
    const ref = storage.ref(`img/${file.name + Math.random(100000)}`);
    await ref.put(file);
    ref.getDownloadURL().then(async url => {
      await firebase.database().ref("instagram").push({uname:uname,avatar:avatar,src:url});
    })
  }}/>
  <label for="file">Share Stories</label>
  <div>
  {
    list ? list.map((item,index) => <Post index={index} item={item} list={list}/>) : ""
  }
  </div>
  </center>
  </div>
  </div>
  </center>
  </div>
  </>
)}

function Profile(){
  return(
    <>
      <div className="bg">
      <center>
      <div className="screen">
      <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>
          <img alt="title" width="70" src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo-500x313.png" className="d-inline-block align-top"/>
        </Navbar.Brand>
        <Nav>
        <Nav.Link as={Link} to="/"><HouseFill color="black" size={20}/></Nav.Link>
        <Nav.Link as={Link} to="/profile"><PersonFill color="black" size={20}/></Nav.Link>
        <Nav.Link><BoxArrowInRight color="black" size={20} onClick={auth}/></Nav.Link>
      </Nav>
      </Container>
    </Navbar>
    <div style={{height:"100vh",marginTop:30}}>
    <img src={avatar} style={{
      width: 70,
      margin: 10,
      border: "none",
      borderRadius: "50px",
    }}/>
    <p><b>{uname}</b></p>
    </div>
    <div>
      {
        list ? list.map((item,index) => {
          return (item.uname === uname && item.uname !== "User") ? <Post index={index} item={item} list={list}/> : ""
        }) : ""
      }
    </div>
    </div>
    </center>
    </div>
    </>
)}

function auth(){
var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider).then((data) => {
console.log(data.user);
setUname(data.user.displayName);
setAvatar(data.user.photoURL);
});
}

useEffect(() => {
const insta = firebase.database().ref("instagram");
insta.on("value",(snap) => {
const data = snap.val();
const list = [];
for(let id in data) list.push({id,...data[id]});
setList(list);
});
},[]);

return(
  <>
  <BrowserRouter>
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/profile" component={Profile}/>
  </Switch>
  </BrowserRouter>
  </>
);
}

ReactDOM.render(<App/>,document.getElementById("root"));
