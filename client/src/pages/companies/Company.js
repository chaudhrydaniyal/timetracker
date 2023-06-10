import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Container } from "react-bootstrap";
import pp from "./avatar.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import axios from "axios";
import originURL from "../../url";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Row, Col, Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./Company.css";
import { useFormik } from 'formik';
import { validationSchema } from "./validation";
// import Table from "./TableView/Table";

const initialValue={
  companyName: "",
  shortName: "",
  contactName: "",
  phoneNo: "",
  landLineNo: "",
  registrationNo: "",
  city: "",
  country: "",
  postalCode: "",
  address: "",
  email: "",
  
}
const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [file, setfile] = useState();

  const [createCompany, setCreateCompany] = useState({
    companyName: "",
    shortName: "",
    contactName: "",
    phoneNo: "",
    landLineNo: "",
    registrationNo: "",
    city: "",
    country: "",
    postalCode: "",
    address: "",
    email: "",
  });
  const [show, setShow] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const [view, setView] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const modalClose = () => setDetailModal(false);
  const modalShow = () => setDetailModal(true);
  const url = "companies/";
  const submitFormData = (e) => {
    e.preventDefault();
  };

  const getCompany = async () => {
    try {
      const company = await axios.get(`${originURL}/${url}`);
      const res = company.data;
      console.log("addedCompany", res);
      setCompanies(res.companies);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCompany();
    document.title = "Company";
  }, [update]);

  const createCompanyHandler = (e) => {
    setCreateCompany((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const submitCreateCompanyHandler = async () => {
  //   try {
  //     const data = new FormData();
  //     console.log("company", createCompany.companyName);
  //     console.log("shortname", createCompany.shortName);
  //     data.append("companyName", createCompany.companyName);
  //     data.append("contactName", createCompany.contactName);
  //     data.append("address", createCompany.address);
  //     data.append("phoneNo", createCompany.phoneNo);
  //     data.append("country", createCompany.country);
  //     data.append("city", createCompany.city);
  //     data.append("registrationNo", createCompany.registrationNo);
  //     data.append("landLineNo", createCompany.landLineNo);
  //     data.append("email", createCompany.email);
  //     data.append("shortName", createCompany.shortName);
  //     data.append("postalCode", createCompany.postalCode);
  //     data.append("logo", file);

  //     const addCompany = await axios.post(
  //       `${originURL}/companies/addcompany`,
  //       data
  //     );
  //     addCompany && NotificationManager.success("Successfully Added");
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   setCreateCompany("");
  //   setfile("");
  //   handleClose();
  //   setUpdate(!update);
  // };

  const {values,touched,handleChange,handleBlur,handleSubmit,errors} = useFormik({
    initialValues:initialValue,
    validationSchema:validationSchema,
    onSubmit:async (values,action) => {
      try {
        const data = new FormData();
        console.log("company", values.companyName);
        console.log("shortname", values.shortName);
        data.append("companyName", values.companyName);
        data.append("contactName", values.contactName);
        data.append("address", values.address);
        data.append("phoneNo", values.phoneNo);
        data.append("country", values.country);
        data.append("city", values.city);
        data.append("registrationNo", values.registrationNo);
        data.append("landLineNo", values.landLineNo);
        data.append("email", values.email);
        data.append("shortName", values.shortName);
        data.append("postalCode", values.postalCode);
        data.append("logo", file);
  
        const addCompany = await axios.post(
          `${originURL}/companies/addcompany`,
          data
        );
        addCompany && NotificationManager.success("Successfully Added");
      } catch (err) {
        console.log(err);
      }
      handleClose();
      setUpdate(!update);
      action.resetForm()
    }
    
  })
  console.log("erros",errors)
  return (
    <div
      className="content-wrapper"
      style={{ backgroundColor: "#f7f7f7", paddingTop: "50px", height: "90%" }}
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
            <div style={{ display: "flex" }}>
              <h3>Company Information</h3>
              <div style={{ marginLeft: "65%" }} className="addCompany">
                <Button onClick={handleShow}>Add Company</Button>
              </div>
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
                      {console.log(("console123", companies))}
                      {companies.map((d, i) => {
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
                                  Company
                                </Card.Title>
                                <hr></hr>
                                <Card.Body>
                                  <Card.Text
                                    style={{ justifyContent: "center" }}
                                  >
                                    {d.companyName}
                                  </Card.Text>
                                  <Card.Text
                                    style={{ justifyContent: "center" }}
                                  >
                                    <span style={{ fontWeight: "bold" }}>
                                      short name:&nbsp;
                                    </span>
                                    {d.shortName}
                                  </Card.Text>
                                  {/* <Button onClick={modalShow} >Details</Button> */}
                                  <div className="col-auto float-end ms-auto ">
                                    <a
                                      className="btn add-btn "
                                      data-bs-toggle="modal"
                                      data-bs-target="#add_employee"

                                      // onClick={handleShow}
                                    >
                                      <i class="fa-solid fa-circle-info">
                                        <Link
                                          to="/companyDetails"
                                          state={{ companies: d }}
                                          style={{
                                            color: "white",
                                            textDecoration: "none",
                                          }}
                                        >
                                          {" "}
                                          &nbsp;Details
                                        </Link>
                                      </i>
                                    </a>
                                  </div>
                                  {/* <div className='d-flex justify-content-center align-items-center'><p className="px-2 text-center buttoncolor rounded" style={{ width: '70%' }}>Add Employee</p></div> */}
                                </Card.Body>
                              </Card>
                            </Col>
                          </>
                        );
                      })}
                    </Row>
                  </Container>
                  {/* ) */}
                  {/* } */}
                </div>
              </div>
            </div>

            <Modal show={detailModal} onHide={modalClose}>
              <Modal.Header closeButton>
                <Modal.Title>Company Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {companies.map((d, i) => {
                  return (
                    <>
                      <div>{d.companyName}</div>
                      <div>{d.contactName}</div>
                    </>
                  );
                })}
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
                  onClick={modalClose}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Company</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row>
                    <Col>
                      <label style={{ color: "grey" }} htmlFor="companyName">
                        Name:
                      </label>
                      <br></br>

                      <input
                        type="text"
                        placeholder="company name"
                        name="companyName"
                        // value={createCompany.companyName}
                        // onChange={createCompanyHandler}
                        value={values.companyName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.companyName && touched.companyName ? (<p style={{color:"red"}}>{errors.companyName}</p>):null}
                    </Col>
                    <Col>
                      <label style={{ color: "grey" }} htmlFor="shortName">
                        {" "}
                        Short Name:
                      </label>
                      <br></br>

                      <input
                        type="text"
                        placeholder="short name"
                        name="shortName"
                        // value={createCompany.shortName}
                        // onChange={createCompanyHandler}
                        value={values.shortName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.shortName && touched.shortName ? (<p style={{color:'red'}}>{errors.shortName}</p>):null}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label
                        style={{ color: "grey", marginTop: "1%" }}
                        htmlFor="contactName"
                      >
                        {" "}
                        Contact Name:
                      </label>
                      <br></br>

                      <input
                        type="text"
                        placeholder="contact name"
                        name="contactName"
                        // value={createCompany.contactName}
                        // onChange={createCompanyHandler}
                        value={values.contactName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.contactName && touched.contactName ? (<p style={{color:'red'}}>{errors.contactName}</p>):null}
                    </Col>
                    <Col>
                      <label
                        style={{ color: "grey", marginTop: "1%" }}
                        htmlFor="phoneNo"
                      >
                        {" "}
                        Phone No:
                      </label>
                      <br></br>

                      <input
                        type="number"
                        required
                        placeholder="phone no"
                        name="phoneNo"
                        // value={createCompany.phoneNo}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 11);
                        }}
                        // onChange={createCompanyHandler}
                        value={values.phoneNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.phoneNo && touched.phoneNo ? (<p style={{color:"red"}}>{errors.phoneNo}</p>):null}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label
                        style={{ color: "grey", marginTop: "1%" }}
                        htmlFor="landLineNo"
                      >
                        LandLine No:
                      </label>
                      <br></br>

                      <input
                        type="number"
                        placeholder="LandLine no"
                        name="landLineNo"
                        // value={createCompany.landLineNo}
                        // onChange={createCompanyHandler}
                        value={values.landLineNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                    <Col>
                      <label
                        style={{ color: "grey", marginTop: "1%" }}
                        htmlFor="registrationNo"
                        className="registrationNo"
                      >
                        {" "}
                        Registration No:
                      </label>
                      <br></br>
                      <input
                        placeholder="registration no"
                        name="registrationNo"
                        // value={createCompany.registrationNo}
                        // onChange={createCompanyHandler}
                        value={values.registrationNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label
                        style={{ color: "grey", marginTop: "1%" }}
                        htmlFor="city"
                      >
                        {" "}
                        City:
                      </label>
                      <br></br>

                      <input
                        type="text"
                        placeholder="city"
                        name="city"
                        // value={createCompany.city}
                        // onChange={createCompanyHandler}
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                    <Col>
                      <label
                        style={{ color: "grey", marginTop: "1%" }}
                        htmlFor="country"
                        className="country"
                      >
                        Country:
                      </label>
                      <br></br>

                      <input
                        type="text"
                        placeholder="country"
                        name="country"
                        // value={createCompany.country}
                        // onChange={createCompanyHandler}
                        value={values.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label
                        style={{ color: "grey", marginTop: "1%" }}
                        htmlFor="postalCode"
                      >
                        Postal Code:
                      </label>
                      <br></br>

                      <input
                        placeholder="postal code"
                        name="postalCode"
                        // value={createCompany.postalCode}
                        // onChange={createCompanyHandler}
                        value={values.postalCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                    <Col>
                      <label
                        style={{ color: "grey", marginTop: "1%" }}
                        htmlFor="address"
                      >
                        Address:
                      </label>
                      <br></br>
                      <input
                        placeholder="address"
                        name="address"
                        // value={createCompany.address}
                        // onChange={createCompanyHandler}
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label style={{ color: "grey", marginTop: "1%" }} htmlFor="email">
                        Email:
                      </label>
                      <br></br>
                      <input
                        placeholder="email"
                        name="email"
                        // value={createCompany.email}
                        // onChange={createCompanyHandler}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.email && touched.email ? (<p style={{color:'red'}}>{errors.email}</p>):null}
                    </Col>
                    <Col>
                      <label
                        htmlFor="logo"
                        style={{ color: "grey", marginTop: "1%" }}
                      >
                        Upload Logo:
                      </label>

                      <Form className="mb-3" controlId="formGridProfilePic">
                        <Form.Label htmlFor="uploadpic">
                          {file ? (
                            <>
                              <img
                                // className="rounded-circle"
                                style={{ width: "195px", height: "80px" }}
                                src={file}
                                alt=""
                              />
                            </>
                          ) : (
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
                          name="file"
                          style={{ display: "none" }}
                          id="uploadpic"
                          onChange={(e) => {
                            console.log("e target value file", e.target.files[0]);
                            setfile(e.target.files[0]);
                          }}
                        />
                      </Form>
                    </Col>
                  </Row>
                </Container>
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
                  onClick={handleClose}
                >
                  Close
                </Button>
                &nbsp;&nbsp;
                <Button
                  className="button"
                  style={{
                    backgroundColor: "#0F52BA",
                    color: "white",
                    fontWeight: "700",
                  }}
                  variant="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};
export default Company;
