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
import avatar from "../../Assets/img/avatar.jpg";
import { NotificationContainer, NotificationManager } from 'react-notifications';

import { useNavigate } from "react-router-dom";

import "./single.css";

var moment = require("moment"); // require

const ProjectDetail = () => {
  const navigate = useNavigate();

  const item = useLocation();

  console.log("testvalue", item);
  const [users, setusers] = useState("");
  const propDetail = item.state.item;
  console.log("propdetails", propDetail);
  const [coordinates, setCoordinates] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [datamodal, setmodaldata] = useState({});

  // const showDetail = async(id) =>{
  //        handleShow();

  //       setmodaldata(id)
  //       console.log("ids",datamodal)
  // }

  const [projectPhases, setProjectPhases] = useState([])
  const [update2, setUpdate2] = useState(false);

  useEffect(() => {


    const arr1 = [
      {id: 3, date: new Date(2022, 1, 24)},
      {id: 5, date: new Date(2027, 1, 24)},
      {id: 2, date: new Date(2023, 1, 24)},
    ];
    
    // ✅ Sort in Ascending order (low to high)
    const sortedAsc = arr1.sort(
      (objA, objB) => Number(objA.date) - Number(objB.date),
    );
    
    console.log("sortedAsc",sortedAsc);

    axios.get(`${originURL}/projectphase/getprojectphases/${propDetail._id}`).then((res) => {

    


      setProjectPhases(res.data.phases.sort(
        (objA, objB) => Number(new Date(objA.ExpectedStartDate)) - Number(new Date(objB.ExpectedStartDate)),
      ))

     
            
    });

  }, [update2]);



  const [projectName, setProjectName] = useState(propDetail.projectname);
  const [projectManager, setProjectManager] = useState("");
  const [projectDescription, setProjectDescription] = useState(
    propDetail.description
  );
  const [projectStartDate, setProjectStartDate] = useState(
    propDetail.projectStartDate
  );
  const [projectEndDate, setProjectEndDate] = useState(
    propDetail.projectEndDate
  );
  const [allocatedWorkingDays, setAllocatedWorkingDays] = useState(
    propDetail.allocatedWorkingDays
  );
  const [showProjectEdit, setShowProjectEdit] = useState(false);
  const [PhaseModel, setPhaseModel] = useState(false);
  const [PhaseEditModel, setPhaseEditModel] = useState(false);

  const [modelPhaseDetail, setModelPhaseDetail] = useState('');
  const [modelStartDate, setModelStartDate] = useState('')
  const [modelEndDate, setModelEndDate] = useState('')

  const handleCloseProjectEdit = () => setShowProjectEdit(false);
  const handleShowProjectEdit = () => setShowProjectEdit(true);
  const hanldeShowPhaseModel = () => setPhaseModel(true);
  const handleCloseModelPhase = () => setPhaseModel(false);
  const [update, setUpdate] = useState(false);

  return (
    <>
      <div
        style={{
          marginBottom: "170px"
        }}>
        <div
          className="content-wrapper"
          style={{
            backgroundColor: "#f7f7f7",
            height: "90vh",
            paddingTop: "50px",
          }}
        >
          <Container style={{ marginTop: "20px" }}>
            <Box sx={{ width: "95%" }}>
              <Paper className="p-4" sx={{ width: "100%", mb: 2 }}>
                {/* {JSON.stringify(propDetail)} */}
                <div className="d-flex">
                  <h3 className="ml-3">Project Details</h3>
                  {JSON.parse(localStorage.getItem("timesheet_user437")).isAdmin &&
                    (
                      <>
                        <Button
                          style={{
                            marginLeft: "auto",
                            marginRight: "10px",
                            backgroundColor: "#0F52BA",
                            color: "white",
                            fontWeight: "700",
                          }}
                          onClick={handleShowProjectEdit}
                        >
                          {" "}
                          &nbsp;&nbsp;&nbsp;
                          <i class="bi bi-pencil-square mb-1"></i> &nbsp;Edit
                          &nbsp;&nbsp;&nbsp;
                        </Button>{" "}
                        {/* <Button style={{ marginRight: "10px", backgroundColor: "red", color: "white", fontWeight: "700" }} onClick={() => {
                        axios.delete(`${originURL}/projects/${propDetail._id}`)
                        navigate("/projects");             
                    }}> <i class="bi bi-trash mb-1"></i> &nbsp;Delete</Button>{' '} */}
                      </>
                    )

                  }
                </div>
                <br></br>
                <Container fluid>
                  <Modal
                    style={{ marginTop: "18vh" }}
                    show={showProjectEdit}
                    onHide={handleCloseProjectEdit}
                    animation={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="d-flex justify-content-center">
                        <div style={{ width: "80%" }}>
                          <input
                            value={projectName}
                            style={{ width: "100%" }}
                            onChange={(e) => setProjectName(e.target.value)}
                          ></input>
                          <br />
                          <br />
                          <input
                            placeholder="Project Manager"
                            style={{ width: "100%" }}
                            onChange={(e) => setProjectManager(e.target.value)}
                          ></input>
                          <br />
                          <br />
                          <label>Start Date:</label> &nbsp;
                          <input
                            type="date"
                            defaultValue={moment(
                              new Date(projectStartDate)
                            ).format("YYYY-MM-DD")}
                            onSelect={(e) => {
                              // setProjectStartDate(moment(new Date(e.target.value)).format("dddd, MMMM Do YYYY"))
                              setProjectStartDate(new Date(e.target.value));
                            }}
                          />
                          <br />
                          <br />
                          <label>Estimated End Date:</label> &nbsp;
                          <input
                            type="date"
                            defaultValue={moment(
                              new Date(projectEndDate)
                            ).format("YYYY-MM-DD")}
                            onSelect={(e) => {
                              // setProjectEndDate(moment(new Date(e.target.value)).format("dddd, MMMM Do YYYY"))
                              setProjectEndDate(new Date(e.target.value));
                            }}
                          />
                          <br />
                          <br />
                          <input
                            value={allocatedWorkingDays}
                            type="number"
                            style={{ width: "100%" }}
                            onChange={(e) =>
                              setAllocatedWorkingDays(e.target.value)
                            }
                          ></input>
                          <br />
                          <br />
                          <textarea
                            value={projectDescription}
                            style={{ width: "100%" }}
                            onChange={(e) =>
                              setProjectDescription(e.target.value)
                            }
                          ></textarea>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        style={{
                          marginLeft: "auto",
                          backgroundColor: "gray",
                          color: "white",
                          fontWeight: "700",
                        }}
                        variant="secondary"
                        onClick={handleCloseProjectEdit}
                      >
                        Close
                      </Button>
                      &nbsp; &nbsp;
                      <Button
                        style={{
                          backgroundColor: "#0F52BA",
                          color: "white",
                          fontWeight: "700",
                        }}
                        variant="primary"
                        onClick={() => {
                          try {
                            axios.put(`${originURL}/projects/addproject`, {
                              _id: propDetail._id,
                              projectname: projectName,
                              description: projectDescription,
                              // dateCreated: moment(new Date).format("dddd, MMMM Do YYYY"),
                              projectStartDate: projectStartDate,
                              projectEndDate: projectEndDate,
                              allocatedWorkingDays: allocatedWorkingDays,
                            });

                            propDetail.projectname = projectName;
                            propDetail.description = projectDescription;
                            // propDetail.dateCreated= moment(new Date).format("dddd, MMMM Do YYYY"),
                            propDetail.projectStartDate = projectStartDate;
                            propDetail.projectEndDate = projectEndDate;
                            propDetail.allocatedWorkingDays = allocatedWorkingDays;

                            handleCloseProjectEdit();
                            setUpdate(!update);
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                      >
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  {/* flex */}
                  <div className="cardflex " >
                    {/* flex items */}
                    {/* right items */}
                    <div style={{ width: "100%" }}>
                      <Card style={{ width: "95%", height: "auto" }}>
                        <div className="d-flex align-items-center">
                          <div>
                            {" "}
                            <h4
                              className="px-3 py-2"
                              style={{ paddingBottom: 0, marginBottom: 0 }}
                            >
                              Overview
                            </h4>
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
                                  <span
                                    className="ml-2 "
                                    style={{
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {propDetail.projectname}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <br />
                          <div className="d-flex align-items-center justify-content-between mt-2">
                            <div className="d-flex flex-column ">
                              <div>
                                {" "}
                                <p
                                  style={{
                                    fontWeight: "bold",
                                    paddingBottom: 1,
                                    marginBottom: 1,
                                  }}
                                >
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
                                <p
                                  style={{
                                    fontWeight: "bold",
                                    paddingBottom: 1,
                                    marginBottom: 1,
                                  }}
                                >
                                  {" "}
                                  Start Date
                                </p>
                              </div>
                              <div>
                                <p>
                                  {moment(
                                    new Date(propDetail.projectStartDate)
                                  ).format("dddd, MMMM Do YYYY")}
                                </p>
                              </div>
                            </div>
                            <div className="d-flex flex-column ">
                              <div>
                                <p
                                  style={{
                                    fontWeight: "bold",
                                    paddingBottom: 1,
                                    marginBottom: 1,
                                  }}
                                >
                                  {" "}
                                  Deadline
                                </p>
                              </div>
                              <div>
                                <p>
                                  {moment(
                                    new Date(propDetail.projectEndDate)
                                  ).format("dddd, MMMM Do YYYY")}
                                </p>
                              </div>
                            </div>
                            <div className="d-flex flex-column ">
                              <div>
                                <p
                                  style={{
                                    fontWeight: "bold",
                                    paddingBottom: 1,
                                    marginBottom: 1,
                                  }}
                                >
                                  {" "}
                                  Status
                                </p>
                              </div>
                              <div>
                                <p> In progress</p>
                              </div>
                            </div>
                            <div className="d-flex flex-column ">
                              <div>
                                <p
                                  style={{
                                    fontWeight: "bold",
                                    paddingBottom: 1,
                                    marginBottom: 1,
                                  }}
                                >
                                  {" "}
                                  Supervison
                                </p>
                              </div>
                              <div>
                                <p> Sir Raheel</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p
                              style={{
                                fontWeight: "bold",
                                paddingBottom: 1,
                                marginBottom: 1,
                              }}
                            >
                              Description
                            </p>
                            <p>{propDetail.description}</p>
                          </div>
                        </div>
                      </Card>

                      <Modal
                        style={{ marginTop: "18vh" }}
                        show={PhaseModel}
                        onHide={handleCloseModelPhase}
                        animation={false}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Add Phases</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="d-flex justify-content-center">
                            <div style={{ width: "80%" }}>

                              <input
                                value={modelPhaseDetail}
                                placeholder="Phase detail"
                                style={{ width: "100%" }}
                                onChange={(e) => setModelPhaseDetail(e.target.value)}
                              ></input>
                              <br />
                              <br />
                              <label>Estimated Start Date:</label> &nbsp;
                              <input
                                // value={modelStartDate}
                                type="date"

                                // defaultValue={moment(
                                //   new Date(modelStartDate)
                                // ).format("YYYY-MM-DD")}

                                onSelect={(e) => {
                                  // setProjectStartDate(moment(new Date(e.target.value)).format("dddd, MMMM Do YYYY"))
                                  setModelStartDate(new Date(e.target.value));
                                }}
                              />
                              <br />
                              <br />
                              <label>Estimated End Date:</label> &nbsp;&nbsp;&nbsp;
                              <input
                                // value={modelEndDate}
                                type="date"

                                // defaultValue={moment(
                                //   new Date(modelEndDate)
                                // ).format("YYYY-MM-DD")}

                                onSelect={(e) => {
                                  // setProjectEndDate(moment(new Date(e.target.value)).format("dddd, MMMM Do YYYY"))
                                  setModelEndDate(new Date(e.target.value));
                                }}
                              />
                              <br />
                              <br />


                            </div>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            style={{
                              marginLeft: "auto",
                              backgroundColor: "gray",
                              color: "white",
                              fontWeight: "700",
                            }}
                            variant="secondary"
                            onClick={handleCloseModelPhase}
                          >
                            Close
                          </Button>
                          &nbsp; &nbsp;
                          <Button
                            style={{
                              backgroundColor: "#0F52BA",
                              color: "white",
                              fontWeight: "700",
                            }}
                            variant="primary"
                            onClick={() => {
                              if (modelPhaseDetail == "") {
                                NotificationManager.error("Write the phase title")

                              }
                              else {
                                try {
                                  axios.post(`${originURL}/projectphase/addprojectphase`, {
                                    phase: modelPhaseDetail,
                                    ExpectedStartDate: modelStartDate,
                                    ExpectedEndDate: modelEndDate,
                                    project: propDetail._id,



                                    // dateCreated: moment(new Date).format("dddd, MMMM Do YYYY"),


                                  });


                                  setUpdate2(!update2);

                                  handleCloseModelPhase();
                                  NotificationManager.success("Project phase added successfully")

                                }
                                catch (err) {
                                  console.log(err);
                                }
                              }
                            }}
                          >
                            Save
                          </Button>
                        </Modal.Footer>
                      </Modal>


                      <Modal
                        style={{ marginTop: "18vh" }}
                        show={PhaseEditModel}
                        onHide={handleCloseModelPhase}
                        animation={false}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Add Phases</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="d-flex justify-content-center">
                            <div style={{ width: "80%" }}>

                              <input
                                value={modelPhaseDetail}
                                placeholder="Phase detail"
                                style={{ width: "100%" }}
                                onChange={(e) => setModelPhaseDetail(e.target.value)}
                              ></input>
                              <br />
                              <br />
                              <label>Estimated Start Date:</label> &nbsp;
                              <input
                                // value={modelStartDate}
                                type="date"

                                // defaultValue={moment(
                                //   new Date(modelStartDate)
                                // ).format("YYYY-MM-DD")}

                                onSelect={(e) => {
                                  // setProjectStartDate(moment(new Date(e.target.value)).format("dddd, MMMM Do YYYY"))
                                  setModelStartDate(new Date(e.target.value));
                                }}
                              />
                              <br />
                              <br />
                              <label>Estimated End Date:</label> &nbsp;&nbsp;&nbsp;
                              <input
                                // value={modelEndDate}
                                type="date"

                                // defaultValue={moment(
                                //   new Date(modelEndDate)
                                // ).format("YYYY-MM-DD")}

                                onSelect={(e) => {
                                  // setProjectEndDate(moment(new Date(e.target.value)).format("dddd, MMMM Do YYYY"))
                                  setModelEndDate(new Date(e.target.value));
                                }}
                              />
                              <br />
                              <br />


                            </div>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            style={{
                              marginLeft: "auto",
                              backgroundColor: "gray",
                              color: "white",
                              fontWeight: "700",
                            }}
                            variant="secondary"
                            onClick={handleCloseModelPhase}
                          >
                            Close
                          </Button>
                          &nbsp; &nbsp;
                          <Button
                            style={{
                              backgroundColor: "#0F52BA",
                              color: "white",
                              fontWeight: "700",
                            }}
                            variant="primary"
                            onClick={() => {
                              if (modelPhaseDetail == "") {
                                NotificationManager.error("Write the phase title")

                              }
                              else {
                                try {
                                  axios.post(`${originURL}/projectphase/addprojectphase`, {
                                    phase: modelPhaseDetail,
                                    ExpectedStartDate: modelStartDate,
                                    ExpectedEndDate: modelEndDate,
                                    project: propDetail._id,



                                    // dateCreated: moment(new Date).format("dddd, MMMM Do YYYY"),


                                  });


                                  setUpdate2(!update2);

                                  handleCloseModelPhase();
                                  NotificationManager.success("Project phase added successfully")

                                }
                                catch (err) {
                                  console.log(err);
                                }
                              }
                            }}
                          >
                            Save
                          </Button>
                        </Modal.Footer>
                      </Modal>

                    </div>


                    {/* left items */}
                    <div>
                      <Card
                        className="cardcustomization"
                        style={{
                          height: "auto",
                          width: "250px",
                          overflowY: "auto",
                        }}
                      >
                        <h5 className="text-center">Assigned Users</h5>
                        <div className="flexusers">
                          {propDetail.assignTo.map((d, i) => {
                            return (
                              <div key={i}>
                                <div
                                  style={{ cursor: "pointer" }}
                                  className="my-2 d-flex w-100"
                                  onClick={() => {
                                    setmodaldata(d);
                                    handleShow();
                                  }}
                                >
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
                                        {d.username}
                                      </p>
                                    </div>
                                  </div>
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
                                      <div style={{ width: "40%" }}>
                                        <Avatar
                                          src={avatar}
                                          sx={{ width: 150, height: 150 }}
                                        />
                                      </div>
                                      <div>
                                        <h6 style={{ fontWeight: "bold" }}>
                                          Username:
                                          <span className="ml-2">
                                            {datamodal.username}
                                          </span>
                                        </h6>
                                        <h6 style={{ fontWeight: "bold" }}>
                                          Full Name:
                                          <span className="ml-2">
                                            {datamodal.firstname
                                              ? datamodal.firstname
                                              : "N/A"}
                                          </span>
                                        </h6>
                                        <h6 style={{ fontWeight: "bold" }}>
                                          Email:
                                          <span className="ml-2">
                                            {datamodal.email
                                              ? datamodal.email
                                              : "N/A"}
                                          </span>
                                        </h6>
                                        <h6 style={{ fontWeight: "bold" }}>
                                          Designation:
                                          <span className="ml-2">
                                            {datamodal.role
                                              ? datamodal.role
                                              : "N/A"}
                                          </span>
                                        </h6>
                                        <h6 style={{ fontWeight: "bold" }}>
                                          Phone:
                                          <span className="ml-2">
                                            {datamodal.phone
                                              ? datamodal.phone
                                              : "N/A"}
                                          </span>
                                        </h6>
                                        <h6 style={{ fontWeight: "bold" }}>
                                          joining Date:
                                          <span className="ml-2">
                                            {datamodal.joiningdate
                                              ? datamodal.joiningdate
                                              : "N/A"}
                                          </span>
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
                              </div>
                            );
                          })}
                        </div>
                      </Card>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex">
                      {/* <h4>Project Phases</h4> */}
                    </div>
                    <br></br>

                    {/* flex */}
                    <div className="cardflex ">
                      {/* flex items */}
                      {/* right items */}
                      <div style={{ width: "100%" }}>
                        <Card style={{ minHeight: "auto" }}>
                          <div className="d-flex align-items-center">
                            <div style={{ width: "100%" }}>
                              {" "}
                              <div className="d-flex justify-content-between">
                                <div>
                                  <h4 className="px-3 py-2">Project Phases</h4>
                                </div>
                                <div className="px-3 py-2"
                                >
                                  {JSON.parse(localStorage.getItem("timesheet_user437"))
                                    .isAdmin && (
                                      <Button
                                        style={{
                                          marginLeft: "auto",
                                          marginRight: "10px",
                                          backgroundColor: "#0F52BA",
                                          color: "white",
                                          fontWeight: "700",
                                          marginBottom: '5%'
                                          // alignItems: "self-end",
                                          // flex: "display",
                                        }}
                                        onClick={hanldeShowPhaseModel}
                                      >
                                        {" "}
                                        &nbsp;&nbsp;&nbsp;
                                        <i class="bi bi-pencil-square mb-1"></i>{" "}
                                        &nbsp;ADD  &nbsp;&nbsp;&nbsp;
                                      </Button>
                                    )}
                                </div>
                              </div>
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

                              </div>
                            </div>

                            <Container>

                              <div className="d-flex justify-content-end ">



                              </div>
                              <Row className="my-3">
                                <Table striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>#</th>
                                      <th style={{ textAlign: "center" }}>Phase Details</th>
                                      <th style={{ textAlign: "center" }}>Estimated Start Date</th>
                                      <th style={{ textAlign: "center" }}>Estimated End Date</th>
                                      <th style={{ textAlign: "center" }}>Delete</th>

                                    </tr>
                                  </thead>
                                  <tbody>
                                    {projectPhases &&
                                      projectPhases.map((d, i) => {
                                        return (

                                          <tr >
                                            <th style={{ textAlign: "center" }}>{i + 1}</th>
                                            <td style={{ textAlign: "center" }}>{d.phase}</td>
                                            <td style={{ textAlign: "center" }}>{(moment(d.ExpectedStartDate).format('D-MMM-yyyy'))}</td>
                                            <td style={{ textAlign: "center" }}>{(moment(d.ExpectedEndDate).format('D-MMM-yyyy'))}</td>
                                            <td style={{ textAlign: "center" }}><Button onClick={async () => {
                                              await axios.delete(`${originURL}/projectphase/${d._id}`).then(() => {
                                                setUpdate2(!update2)
                                              })
                                            }} style={{ backgroundColor: "transparent", color: "red", padding: "2px" }}
                                              title="Delete"
                                            ><i class="bi bi-trash"></i></Button>
                                            </td>
                                          </tr>

                                        );
                                      })}
                                  </tbody>
                                </Table>
                              </Row>
                            </Container>
                          </div>



                        </Card>
                      </div>
                    </div>



                    {/* </Paper> */}
                    {/* </Box> */}
                  </div>
                </Container>
              </Paper>
            </Box>
          </Container>
        </div>
        <NotificationContainer />

      </div>
    </>
  );
};

export default ProjectDetail;
