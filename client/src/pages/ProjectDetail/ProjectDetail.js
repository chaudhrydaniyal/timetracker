import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Modal from "react-bootstrap/Modal";
import { visuallyHidden } from "@mui/utils";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useLocation, useParams } from "react-router-dom";
// import { Dropdown, ButtonGroup, Button } from "@themesberg/react-bootstrap";
// import { Card } from "@themesberg/react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import originURL from "../../url";
import { Button } from "@mui/material";
import { Card } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import img1 from "../../Assets/DataTables img/1.jpg";
import img2 from "../../Assets/DataTables img/2.jpg";
import avatar from '../../Assets/img/avatar.jpg'
import "./single.css";
const ProjectDetail = () => {
  const item = useLocation();

  console.log("testvalue", item);
 const [users,setusers] = useState('')
  const propDetail = item.state.item;
  console.log("propdetails", propDetail);
  const [coordinates, setCoordinates] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [datamodal,setmodaldata] = useState({})
  // const showDetail = async(id) =>{
  //        handleShow();
     
  //       setmodaldata(id)
  //       console.log("ids",datamodal)
  // }
  console.log("data",datamodal)
  useEffect(()=>{
   
  },[])

  return (
    <>
      <div
        className="content-wrapper"
        style={{ backgroundColor: "#f7f7f7",height:"90vh", paddingTop: "50px" }}
      >
        <Container style={{ marginTop: "20px", marginBottom: "50px" }}>
          <Box sx={{ width: "95%" }}>
            <Paper className="p-4" sx={{ width: "100%", mb: 2 }}>
              {/* {JSON.stringify(propDetail)} */}
              <h4>Project Details</h4>
              <br></br>
              <Container fluid>
                {/* flex */}
                <div className="cardflex ">
                  {/* flex items */}
                  {/* right items */}
                  <div style={{ width: "75%" }}>
                    <Card style={{ height: "340px" }}>
                      <div className="d-flex align-items-center">
                        <div>
                          {" "}
                          <h3
                            className="px-3 py-2"
                            style={{ paddingBottom: 0, marginBottom: 0 }}
                          >
                            Overview
                          </h3>
                        </div>
                      </div>
                      <hr className="p-0 m-0" />
                      <div className="px-3 my-3">
                        <div className="d-flex justify-content-between">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              className: "py-2",
                            }}
                          >
                            <div className="">
                              <p
                                style={{
                                  fontWeight: "bold",
                                  paddingBottom: 1,
                                  marginBottom: 1,
                                }}
                              >
                                Project Name:
                                <span className="ml-2 ">
                                  {propDetail.projectname}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-2">
                          <div className="d-flex flex-column ">
                            <div>
                              {" "}
                              <p style={{ fontWeight: "bold" }}>
                                Product Type
                              </p>{" "}
                            </div>
                            <div>
                              {" "}
                              <p>Company Product</p>{" "}
                            </div>
                          </div>
                          <div className="d-flex flex-column ">
                            <div>
                              <p style={{ fontWeight: "bold" }}> Start Date</p>
                            </div>
                            <div>
                              <p> 17-april-2021</p>
                            </div>
                          </div>
                          <div className="d-flex flex-column ">
                            <div>
                              <p style={{ fontWeight: "bold" }}> DeadLine</p>
                            </div>
                            <div>
                              <p> 17-april-2022</p>
                            </div>
                          </div>
                          <div className="d-flex flex-column ">
                            <div>
                              <p style={{ fontWeight: "bold" }}> Status</p>
                            </div>
                            <div>
                              <p> In progress</p>
                            </div>
                          </div>
                          <div className="d-flex flex-column ">
                            <div>
                              <p style={{ fontWeight: "bold" }}> Supervison</p>
                            </div>
                            <div>
                              <p> Sir Raheel</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5>Description</h5>
                          <p>{propDetail.description}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                  {/* left items */}
                  <div>
                    <Card
                      className="cardcustomization"
                      style={{
                        height: "340px",
                        width: "250px",
                        overflowY: "auto",
                      }}
                    >
                      <h5 className="text-center">Assigned Users</h5>
                      <div className="flexusers">
                        {propDetail.assignTo.map((d, i) => {
                          return (
                            <div key={i}>
                              <div className="my-2 d-flex w-100">
                                <div onClick={()=>{setmodaldata(d); handleShow() }}>
                                  <Avatar
                                    alt="user"
                                    src={img1}
                                    sx={{ width: 46, height: 46 }}
                                  />
                                </div>
                                <div className="px-2 d-flex flex-column justify-content-center">
                                  <div>
                                    <p
                                      style={{
                                        paddingBottom: 0,
                                        marginBottom: 0,
                                        fontSize: "13px",
                                      }}
                                    >
                                      {d.username}
                                    </p>
                                  </div>
                                  <Modal
                                    style={{ marginTop: "30vh" }}
                                    show={show}
                                    onHide={handleClose}
                                    animation={false}
                                    
                                    
                                  >
                                    <Modal.Header closeButton>
                                      <Modal.Title>User Details</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <div className="d-flex align-items-center justify-centent-between w-100">
                                        <div style={{width:'40%'}}>
                                           <Avatar src={avatar} sx={{width:150,height:150}}/>
                                        </div>
                                        <div>
                                          <h6 style={{fontWeight:'bold'}}>
                                            Username:<span className="ml-2">{datamodal.username}</span> 
                                          </h6>
                                          <h6 style={{fontWeight:'bold'}}>
                                           Full Name:<span className="ml-2">{datamodal.firstname ? datamodal.firstname :'N/A'}</span> 
                                          </h6>
                                          <h6 style={{fontWeight:'bold'}}>
                                            Email:<span className="ml-2">{datamodal.email ? datamodal.email :"N/A"}</span> 
                                          </h6>
                                          <h6 style={{fontWeight:'bold'}}>
                                          Designation:<span className="ml-2">{datamodal.role ? datamodal.role :"N/A"}</span>
                                          </h6>
                                          <h6 style={{fontWeight:'bold'}}>
                                            Phone:<span className="ml-2">{datamodal.phone ? datamodal.phone :"N/A"}</span> 
                                          </h6>
                                          <h6 style={{fontWeight:'bold'}}>
                                          joining Date:<span className="ml-2">{datamodal.joiningdate ? datamodal.joiningdate :"N/A"}</span>
                                          </h6>

                                        </div>
                                      </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <Button
                                        variant="secondary"
                                        onClick={handleClose}
                                      >
                                        Close
                                      </Button>
                                    </Modal.Footer>
                                  </Modal>
                                  {/* <div>
                             <p
                               style={{
                                 paddingBottom: 0,
                                 marginBottom: 0,
                                 fontSize: "13px",
                               }}
                             >
                               Jr Software Engineer
                             </p>
                           </div> */}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </Card>
                  </div>
                </div>
              </Container>
            </Paper>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default ProjectDetail;
