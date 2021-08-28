/* eslint-disable jsx-a11y/alt-text */
import React,{useState} from "react";
import {Modal} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Post(props){
    const index = props.index;
    const item = props.item;
    const list = props.list;
    const uname = item.uname;

    const [show,setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return(
    <>
    <div className="Post" style={{marginTop:"50px"}}>
    <div className="user" style={{float:"left"}}>
    <img src={item.avatar} style={{
      width: 30,
      margin: 10,
      border: "none",
      borderRadius: "50px",
    }} onClick={handleShow}/>
    <label><b>{uname}</b></label>
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
            }}/><lable><b>{uname}</b></lable>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {
            list ? list.map((item,index) => {
              return (item.uname === uname && item.uname !== "User") ? <LazyLoadImage key={index} src={item.src} alt="img" width="100%" effect="blur"/> : ""
            }) : ""
          }
        </div>
      </Modal.Body>
    </Modal>
    </>
    );
}
