import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Container, Button } from "react-bootstrap";
import pp from "./avatar.png";
// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom";
import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";
import axios from "axios";
import originURL from "../../url";
import Modal from "react-bootstrap/Modal";
// import { Button } from "@mui/material";
import { Row, Col, Card } from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import DeleteIcon from "@mui/icons-material/Delete";

const CompanyDetails = () => {
  const url = "/companies/";
  const url1 = "/departments/";
  {
    console.log("state");
  }
  const [file, setfile] = useState();
  const [phoneNo, setPhoneNo] = useState("");
  const [disableFields, setDisableFields] = useState(true);
  const [update, setUpdate] = useState(false);
  const [getDepartments, setAddedDepartments] = useState([]);

  const [companyDetails, setCompanyDetails] = useState({
    department: "",
    role: "",
    description: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var item = useLocation();
  console.log("item", item);
  var companyData = item.state.companies;
  // var setUpdateParent = item.state.upDateParent
  {
    console.log("companyData", companyData);
  }
  const [data, setData] = useState({
    _id: companyData._id,
    companyName: companyData.companyName,
    contactName: companyData.contactName,
    shortName: companyData.shortName,
    phoneNo: companyData.phoneNo,
    landLineNo: companyData.landLineNo,
    registrationNo: companyData.registrationNo,
    city: companyData.city,
    country: companyData.country,
    postalCode: companyData.postalCode,
    address: companyData.address,
    email: companyData.email,
    logo: companyData.logo,
  });


  const handleInput = (e) => {
    let name, value;

    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    // const url = `${data._id}`;

    try {
      const updateUser = await axios
        .put(`${originURL}${url}`, {
          _id: data._id,
          companyName: data.companyName,
          contactName: data.contactName,
          shortName: data.shortName,
          phoneNo: data.phoneNo,
          landLineNo: data.landLineNo,
          registrationNo: data.registrationNo,
          city: data.city,
          country: data.country,
          postalCode: data.postalCode,
          address: data.address,
          email: data.email,
          logo: companyData.logo,
        })
        .then((user) => {
          console.log("updateUser", user.data.updateData);
          data.companyName = user.data.updateData.companyName;
          data.shortName = user.data.updateData.shortName;
          data.contactName = user.data.updateData.contactName;
          data.phoneNo = user.data.updateData.phoneNo;
          data.city = user.data.updateData.city;
          data.country = user.data.updateData.country;
          data.registrationNo = user.data.updateData.registrationNo;
          data.landLineNo = user.data.updateData.landLineNo;
          data.address = user.data.updateData.address;
          data.postalCode = user.data.updateData.postalCode;
          data.email = user.data.updateData.email;
          data.logo = user.data.updateData.logo;
        });

      updateUser && NotificationManager.success("Successfully Updated");
    } catch (error) {
      console.log("error2", error);
      NotificationManager.error("Failed to update");
    }
  };

  const Department = async () => {
    try {
      const department = await axios.get(`${originURL}${url1}${data._id}`);
      const res = department.data;
      console.log("addedDepartment", res);
      setAddedDepartments(res.departments);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Department();
    document.title = "Details";
  }, [update]);

  const companyDetailsHandler = (e) => {
    setCompanyDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <div
        className="content-wrapper"
        style={{
          backgroundColor: "#f7f7f7",
          paddingTop: "50px",
          height: "90%",
        }}
      >
        <Container
          style={{ marginTop: "20px", marginBottom: "80px", height: "90%" }}
        >
          <Box>
            <Paper
              sx={{
                width: "100%",
                mb: 2,
                padding: "30px",
                paddingBottom: "20px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Company Details</h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    onClick={() => {
                      setDisableFields(false);
                    }}
                  >
                    Edit
                  </Button>
                  &nbsp; &nbsp;
                  <Button
                    onClick={() => {
                      handleSubmit();
                      setDisableFields(true);
                      
                    }}
         
                  >
                    Save
                  </Button>
                </div>
              </div>
              <hr></hr>
              <Container>
                <Row>
                  <Col>
                    <label style={{ color: "grey" }} for="Name">
                      Name:
                    </label>
                    <br></br>

                    <input
                      type="text"
                      placeholder="company name"
                      name="companyName"
                      value={data.companyName}
                      onChange={handleInput}
                      disabled={disableFields}
                    />
                  </Col>
                  <Col>
                    <label style={{ color: "grey" }} for="sName">
                      {" "}
                      Short Name:
                    </label>
                    <br></br>

                    <input
                      type="text"
                      placeholder="short name"
                      name="shortName"
                      value={data.shortName}
                      onChange={handleInput}
                      disabled={disableFields}
                    />
                  </Col>
                  <Col>
                    <label style={{ color: "grey" }} for="cName">
                      {" "}
                      Contact Name:
                    </label>
                    <br></br>

                    <input
                      type="text"
                      placeholder="contact name"
                      name="contactName"
                      value={data.contactName}
                      onChange={handleInput}
                      disabled={disableFields}
                    />
                  </Col>
                  <Col>
                    <label style={{ color: "grey" }} for="phone">
                      {" "}
                      Phone No:
                    </label>
                    <br></br>

                
                    <input
                      type="number"
                      required
                      name="phoneNo"
                      placeholder="phone no"
                      value={data.phoneNo}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 11);
                      }}
                      onChange={handleInput}
                 
                      disabled={disableFields}
                    />
                  </Col>
                  {/* </Form.Group> */}
                </Row>

                <Row>
                  <Col>
                    <label style={{ color: "grey" }} for="landline">
                      LandLine No:
                    </label>
                    <br></br>

                    <input
                      type="number"
                      placeholder="LandLine no"
                      name="phoneNo"
                      value={data.landLineNo}
                      onChange={handleInput}
                      disabled={disableFields}
                    />
                  </Col>
                  <Col>
                    <label
                      style={{ color: "grey", marginTop: "2%" }}
                      for="registration"
                    >
                      {" "}
                      Registration No:
                    </label>
                    <br></br>
                    <input
                      placeholder="registration no"
                      name="registrationNo"
                      value={data.registrationNo}
                      onChange={handleInput}
                      disabled={disableFields}
                    />
                  </Col>
                  <Col>
                    <label
                      style={{ color: "grey", marginTop: "2%" }}
                      for="city"
                    >
                      {" "}
                      City:
                    </label>
                    <br></br>

                    <input
                      type="text"
                      placeholder="city"
                      name="city"
                      value={data.city}
                      onChange={handleInput}
                      disabled={disableFields}
                    />
                  </Col>
                  <Col>
                    <label
                      style={{ color: "grey", marginTop: "2%" }}
                      for="country"
                    >
                      Country:
                    </label>
                    <br></br>

                    <input
                      type="text"
                      placeholder="country"
                      name="country"
                      value={data.country}
                      onChange={handleInput}
                      disabled={disableFields}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <label
                      style={{ color: "grey", marginTop: "2%" }}
                      for="postal"
                    >
                      Postal Code:
                    </label>
                    <br></br>

                    <input
                      placeholder="postal code"
                      name="postalCode"
                      value={data.postalCode}
                      onChange={handleInput}
                      disabled={disableFields}
                    />
                  </Col>
                  <Col>
                    <label
                      style={{ color: "grey", marginTop: "2%" }}
                      for="address"
                    >
                      Address:
                    </label>
                    <br></br>
                    <input
                      placeholder="address"
                      name="address"
                      value={data.address}
                      onChange={handleInput}
                      disabled={disableFields}
                    />
                  </Col>

                  <Col>
                    <label style={{ color: "grey", marginTop: "1%" }}>
                      Email:
                    </label>
                    <br></br>
                    <input
                      placeholder="email"
                      name="email"
                      value={data.email}
                      onChange={handleInput}
                      disabled={disableFields}
                    />
                    <br></br>
                  </Col>
                  <Col>
                    <label
                      for="logo"
                      style={{ color: "grey", marginTop: "1%" }}
                    >
                      Company Logo:
                    </label>

                    <Form className="mb-3" controlId="formGridProfilePic">
                      <Form.Label htmlFor="uploadpic">
                        {companyData.logo ? (
                          <img
                            src={companyData.logo}
                            alt="Admin"
                            // className="rounded-circle"
                            width={190}
                            height={80}
                          />
                        ) : (
                          // <img
                          // style={{backgroundImage:'cover'}}
                          //   src={pp}
                          //   alt="Admin"
                          //   // className="rounded-circle"
                          //   width={190}
                          //   height={80}
                          // />
                          <div
                            style={{
                              width: "190px",
                              height: "80px",
                              border: "1px solid grey",
                            }}
                          >
                            <div
                              style={{
                                textAlign: "center",
                                paddingTop: "15%",
                                color: "grey",
                              }}
                            >
                              Upload logo
                            </div>
                          </div>
                        )}
                      </Form.Label>

                      <Form.Control
                        type="file"
                        name="logo"
                        // value={emp.profilepic}
                        // defaultValue={profilepic}
                        style={{ display: "none" }}
                        id="uploadpic"
                        // onChange={(e)=>setData({...data,[logo]:e.target.files[0]})}
                      />
                    </Form>
                  </Col>
                  {/* <Col>
               
                    <label for="logo" style={{ color: "grey",marginTop: "2%" }}>
                      Company Logo:
                    </label>
            
                  <Form className="mb-3" controlId="formGridProfilePic">
                    <Form.Label htmlFor="uploadpic">
                      {companyData.logo ? (
                        <img
                          src={companyData.logo}
                          alt="Admin"
                          // className="rounded-circle"
                          width={190}
                          height={80}
                        />
                      ) : (
                        // <img
                        // style={{backgroundImage:'cover'}}
                        //   src={pp}
                        //   alt="Admin"
                        //   // className="rounded-circle"
                        //   width={190}
                        //   height={80}
                        // />
                        <div style={{width:'190px',height:"80px",border:'1px solid grey'}}>

                          <div style={{textAlign:'center',paddingTop:'15%',color:'grey'}}>Upload logo</div>
                        </div>
                      )}
                    </Form.Label>

                    <Form.Control
                      type="file"
                      name="logo"
                      // value={emp.profilepic}
                      // defaultValue={profilepic}
                      style={{ display: "none" }}
                      id="uploadpic"
                      // onChange={(e)=>setData({...data,[logo]:e.target.files[0]})}
                    />
                  </Form>
                
                  </Col> */}
                </Row>
              </Container>

              <br></br>
              <br></br>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Departments</h3>
                <Button onClick={handleShow}>Add Department</Button>
              </div>
              <hr></hr>

              <div className="card-body">
                <div className="table-responsive">
                  <div style={{ height: "auto", width: "100%" }}>
                    {/* {view ? (
                      <Table data={getdata}></Table>
                    ) : ( */}
                    <Container>
                      <Row>
                        {console.log(("console123", getDepartments))}
                        {getDepartments.map((d, i) => {
                          console.log("get d", d);

                          return (
                            <>
                              <Col xs="12" xl="3" lg="4" md="6" sm="6">
                                <Card>
                                  <Card.Title
                                    className="id"
                                    style={{
                                      textAlign: "center",
                                      fontWeight: "bold",
                                      marginBottom: "0",
                                      marginTop: "3%",
                                    }}
                                  >
                                    Department
                                  </Card.Title>
                                  <hr></hr>
                                  <Card.Body>
                                    <Card.Text
                                      style={{ justifyContent: "center" }}
                                    >
                                      <span style={{ fontWeight: "bold" }}>
                                        Name:&nbsp;
                                      </span>
                                      {d.name}
                                    </Card.Text>
                                    <Card.Text
                                      style={{ justifyContent: "center" }}
                                    >
                                      <span style={{ fontWeight: "bold" }}>
                                        Role:&nbsp;
                                      </span>
                                      {d.role}
                                    </Card.Text>
                                    <Card.Text
                                      style={{ justifyContent: "center" }}
                                    >
                                      <span style={{ fontWeight: "bold" }}>
                                        Description:&nbsp;
                                      </span>
                                      {d.description}
                                    </Card.Text>
                                    <div>
               

                                      <Button
                                        onClick={async () => {
                                          await axios
                                            .delete(
                                              `${originURL}${url1}${d._id}`
                                            )
                                            .then(() => {
                                              setUpdate(!update);
                                            });
                                        }}
                                      >
                                        <i class="bi bi-trash"></i>
                                      </Button>
                                    
                                    </div>
                                
                                  </Card.Body>
                                </Card>
                              </Col>
                            </>
                          );
                        })}
                      </Row>
                    </Container>
                    {/* )
                  } */}
                  </div>
                </div>
              </div>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Departments</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Department Name:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="department name"
                        // value={department}
                        name="department"
                        value={companyDetails.department}
                        // onChange={(e) => setDepartment(e.target.value)}
                        onChange={companyDetailsHandler}
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Label>Role:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Role"
                        name="role"
                        // value={role}
                        value={companyDetails.role}
                        onChange={companyDetailsHandler}
                        // onChange={(e) => setRole(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label> Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={companyDetails.description}
                        onChange={companyDetailsHandler}
                        // value={descripton}
                        // onChange={(e)=>setDescription(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button style={{ background: "grey" }} onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={async () => {
                      try {
                        const addedUser = await axios.post(
                          `${originURL}${url1}`,
                          {
                            name: companyDetails.department,
                            role: companyDetails.role,
                            description: companyDetails.description,
                            company: data._id,
                          }
                        );

                        handleClose();
                        setUpdate(!update);
                      } catch (err) {
                        console.log(err);
                      }
                      // setDepartment("")
                      // setRole("")
                      // setDescription("")
                      setCompanyDetails("");
                    }}
                  >
                    Add
                  </Button>
                </Modal.Footer>
              </Modal>
            </Paper>
          </Box>
        </Container>
      </div>
    </>
  );
};
export default CompanyDetails;
