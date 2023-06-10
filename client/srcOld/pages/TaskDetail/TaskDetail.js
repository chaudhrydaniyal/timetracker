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
import "./single.css";
var moment = require('moment');




const TaskDetail = () => {
  const item = useLocation();

  console.log("testvalue", item);

  const propDetail = item.state.item;
  console.log("propdetails", propDetail)

  let timeTaken='8 hours and 30 mins'
try{
  let start = propDetail.startTime.split(":")
  let startInMin =(parseInt(start[0]) * 60) + parseInt(start[1])

  let end = propDetail.endTime.split(":")

  let endInMin = (parseInt(end[0]) * 60) + parseInt(end[1])

  timeTaken = `${ Math.trunc((endInMin - startInMin)/60) } hours and ${ (endInMin - startInMin) % 60 } mins`
}catch{ timeTaken='8 hours and 30 mins'}

  const [coordinates, setCoordinates] = useState([]);

  return (
    <>
      <div
        className="content-wrapper"
        style={{ backgroundColor: "#f7f7f7", paddingTop: "50px" }}
      >
        <Container style={{ marginTop: "20px", marginBottom: "50px" }}>
          <Box sx={{ width: "95%", }}>
            <Paper className="p-4" sx={{ width: "100%", mb: 2 }}>
              {/* {JSON.stringify(propDetail)} */}
              <h4>Task Details</h4>
              <br></br>
              <Container fluid>
                {/* flex */}
                <div className="cardflex ">

                  <div style={{ width: "75%" }}>
                    <Card style={{ height: 'auto' }}>
                      <h3 className="px-3 py-2">Overview</h3>
                      <div className="px-3" >
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
                                Task Title:
                                <span className="ml-2 " style={{ fontWeight: "normal" }}>
                                  {propDetail.title}
                                </span>
                              </p>
                            </div>
                          </div>


                        </div>
                        <br />
                        <div className="d-flex align-items-center justify-content-between mt-2">
                          <div className="d-flex flex-column ">
                            <div> <p style={{
                              fontWeight: "bold",
                              paddingBottom: 1,
                              marginBottom: 1,
                            }}>Product Type</p> </div>
                            <div> <p>Company Product</p> </div>
                          </div>
                          <div className="d-flex flex-column ">
                            <div>
                              <p style={{
                                fontWeight: "bold",
                                paddingBottom: 1,
                                marginBottom: 1,
                              }}> Start</p>
                            </div>
                            <div>
                              <p>    {propDetail.startTime}</p>
                            </div>
                          </div>
                          <div className="d-flex flex-column ">
                            <div>
                              <p style={{
                                fontWeight: "bold",
                                paddingBottom: 1,
                                marginBottom: 1,
                              }}> End</p>
                            </div>
                            <div>
                              <p>                                   {propDetail.endTime}
                              </p>
                            </div>
                          </div>
                          <div className="d-flex flex-column ">
                            <div>
                              <p style={{
                                fontWeight: "bold",
                                paddingBottom: 1,
                                marginBottom: 1,
                              }}> Time Taken:</p>
                            </div>
                            <div>
                              <p>                                   {timeTaken}
                              </p>
                            </div>
                          </div>
                          <div className="d-flex flex-column ">
                            <div>
                              <p style={{
                                fontWeight: "bold",
                                paddingBottom: 1,
                                marginBottom: 1,
                              }}> Date</p>
                            </div>
                            <div>
                              <p>     
                              {(moment(propDetail.date).format('D-MMM-yyyy'))}





                              </p>
                            </div>
                          </div>
                          </div>
                          <div className="d-flex flex-column ">
                            <div>
                              <p style={{
                                fontWeight: "bold",
                                paddingBottom: 1,
                                marginBottom: 1,
                              }}> Description</p>
                            </div>
                            <div>
                              <p>                                   {propDetail.description}
                              </p>
                            </div>
                          </div>
                        
                      </div>
                    </Card>
                  </div>

                  <div>
                    <Card className="cardcustomization" style={{ height: 'auto' }}>
                      <h5 className="text-center">{JSON.parse(localStorage.getItem("timesheet_user437")).details.username}</h5>
                      <div className="flexusers">
                        <div className="my-2 d-flex w-100">
                          <div>
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
                                
                              </p>
                            </div>
                            <div>
                              <p
                                style={{
                                  paddingBottom: 0,
                                  marginBottom: 0,
                                  fontSize: "13px",
                                }}
                              >
                                {JSON.parse(localStorage.getItem("timesheet_user437")).details.role}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* <div className="my-2 d-flex w-100">
                          <div>
                            {" "}
                            <Avatar
                              alt="user"
                              src={img2}
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
                                M.Noman
                              </p>
                            </div>
                            <div>
                              <p
                                style={{
                                  paddingBottom: 0,
                                  marginBottom: 0,
                                  fontSize: "13px",
                                }}
                              >
                                Jr Software Engineer
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="my-2 d-flex w-100">
                          <div>
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
                                M.Noman
                              </p>
                            </div>
                            <div>
                              <p
                                style={{
                                  paddingBottom: 0,
                                  marginBottom: 0,
                                  fontSize: "13px",
                                }}
                              >
                                Jr Software Engineer
                              </p>
                            </div>
                          </div>
                        </div> */}
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

export default TaskDetail;
