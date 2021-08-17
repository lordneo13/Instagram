/* eslint-disable jsx-a11y/alt-text */
import React,{useState} from "react";
import {Modal} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "./Post.css";

export default function Post(props){
    const index = props.index;
    const item = props.item;
    async function get_quote(){
      const resp = await fetch("https://api.quotable.io/random");
      const data = await resp.json();
      setQuote(data.content);
      setAuthor(data.author);
    }
    const [show,setShow] = useState(false);
    const [quote,setQuote] = useState("");
    const [author,setAuthor] = useState("");
    const handleShow = () => {
      get_quote();
      setShow(true);
    }
    const handleClose = () => setShow(false);

    return(
    <>
    <div className="Post">
    <div className="user" style={{float:"left"}}>
    <img src={item.avatar} style={{
      width: 30,
      margin: 10,
      border: "none",
      borderRadius: "50px",
    }} onClick={handleShow}/>
    <label><b>{item.uname}</b></label>
    </div>
    <LazyLoadImage key={index} src={item.src} alt="img" width="100%" effect="blur"/>
    </div>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
            <img src={item.avatar} style={{
            width: 70,
            margin: 10,
            border: "none",
            borderRadius: "50px",
            }}/><lable><b>{item.uname}</b></lable>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <b>"<i>{quote}</i>" - {author}.</b>
      </Modal.Body>
    </Modal>
    </>
    );
}
