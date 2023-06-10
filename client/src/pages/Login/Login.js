import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { Container, Form } from "react-bootstrap";
import "./login.css";
// import { Context } from "../../Context/Context"
import { useRef } from "react";
import axios from "axios";

import { loginCall } from './apicalls'
import { useNavigate } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';

import originURL from "../../url";

const url = "companies/";
const Login = ({setAuth}) => {


  const username = useRef();
  const password = useRef();
  let navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault();
    var  loginres = false

    try {

     loginres =  await axios.post(`${originURL}/auth/login`, { username: username.current.value, password: password.current.value })

     localStorage.setItem('timesheet_user437', JSON.stringify(loginres.data));
      
     setAuth(loginres)
      
  } catch (error) {
           

  }
    !loginres &&  NotificationManager.error("username or password not correct")

    loginres && navigate("/dashboard")
  }
  const companyName= async()=>{
    try{
      companyName = await axios.get(`${originURL}/${url}`)
      const res = companyName.data
      localStorage.setItem('companyName',JSON.stringify(res.companyName))
    } catch(error){

    }

  }

  return (
    <>
      <Container className="plogin ">
        <Card
          style={{ width: "40%", backgroundColor: "white", padding: "40px" }}
          className="page-header"
        >
          <Card.Header
            className="text-center"
            style={{ backgroundColor: "white", }}
          >
            <div className="p-3">
              <h5 style={{ fontSize: "24px" }}>Login</h5>
            </div>
          </Card.Header>
          <Card.Body style={{ backgroundColor: "white", }}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="email" placeholder="Enter username" ref={username} required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={password} required />
              </Form.Group>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Button variant="success" type="submit" className="px-5 mt-5" onClick={handleClick} >
                  Login
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
        <NotificationContainer />

      </Container>
    </>
  );
};


export default Login;
