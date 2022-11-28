import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import "./Employee.css"
import pp from './avatar.png';
import { useState } from 'react';
import Card from '../Emp Card/EmpCard';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Modal, Button, Form, Col, Row } from "react-bootstrap"
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Table from '../TableView/Table';

const AllEmployees = () => {

    const url = "/employee"
    const url1 = "/employee/addemployee";
    const [datas, setData] = useState();
    // const [modalShow, setModalShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [list, setlist] = useState(false);
    //for profile pic
    const [file, setfile] = useState()
    //Employee Add 
    const [emp, setEmp] = useState({
        profilepic: "", firstname: "", lastname: "", username: "", email: "", password: "", phone: "", address: "", department: "", designation: "", joiningdate: ""

    })

    //handle user input form data
    let name, value;
    const handleinput = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setEmp({ ...emp, [name]: value })

    }
    //getting Data from api
    //toggle list grid view
    const [view, setView] = useState(false);
    const handleChange = (event, nextView) => {
        setView(!view);
        setView(nextView);
        setView(!view)
        // setlist(nextView)
        console.log(nextView)
    };
    //   const handleChange = () => {
    //     setlist(!list)
    //   };
    //submitting values of user 
    const handleSubmit = async (e) => {
        e.preventDefault(e)
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append('name', fileName);
            data.append('file', file);
            emp.profilepic = fileName;
            try {
                await axios.post("/upload", data);
            } catch (err) {
                console.log(err)
                NotificationManager.error("Pic not Uploaded")
            }
        }


        try {
            const res = await axios.post(url1, emp);
            res && NotificationManager.success("Sucessfully Added Employee")
            res && window.location.replace('/');

        } catch (error) {
            console.log(error);
            NotificationManager.error("Something went wrong ")

        }

    }
    //fetching employees data
    const fetchData = async () => {
        try {
            const res = await axios.get(url);
            console.log(res.data);
            const data = res.data
            setData(data);


        } catch (error) {
            console.log(error);
            NotificationManager.error("Api Error 404")

        }



    }
    useEffect(() => {

        fetchData();
    }, [])

    return (
        <>


            <div className="content-wrapper" style={{ backgroundColor: '#f7f7f7' }}>
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <div className="container-fluid">
                        <div className='row align-items-center'>
                            <div className='col'>
                                <h3 className='page-title'>Employee</h3>
                                <ul className='breadcrumb' style={{ backgroundColor: '#f7f7f7' }}>
                                    <li className="breadcrumb-item">
                                        <Link to='/' style={{ color: '#1f1f1f' }}>Dashboard</Link>
                                    </li>
                                    <li className='breadcrumb-item active'>
                                        Employee
                                    </li>

                                </ul>

                            </div>
                            <div className='col-auto float-end ms-auto'>
                                <a className='btn add-btn ' data-bs-toggle="modal" data-bs-target="#add_employee" onClick={handleShow}><i className='fa fa-plus' style={{ fontSize: "14px", marginRight: "2px" }} > </i>Add Employee</a>

                            </div>

                            <div className='mt-4' style={{ display: "flex", justifyContent: "flex-end" }}>
                                <div>
                                    <ToggleButtonGroup
                                        orientation="horizontal"
                                        value={view}
                                        exclusive
                                        onChange={handleChange}
                                    >

                                        <ToggleButton value="module" aria-label="module" selected={!view}>
                                            <ViewModuleIcon />
                                        </ToggleButton>
                                        <ToggleButton value="list" aria-label="list" selected={view}>
                                            <ViewListIcon />
                                        </ToggleButton>

                                    </ToggleButtonGroup>
                                </div>
                            </div>
                        </div>

                    </div>{/* /.container-fluid */}

                </section>
                {/* Main content */}
                <section className="content" style={{ paddingBottom: "70px" }}>
                    <div className="container-fluid" >
                        <div className="row  gy-3  vertical-scrollable" style={{ display: "flex", flexWrap: "wrap" }}>

                            {/* list and grid view */}
                            {view ?
                                datas && <Table data={datas} />
                                : datas && datas.map((p, i) => {

                                    return (
                                        <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3" key={i}>
                                            <div >
                                                <Card data={p} />
                                            </div>
                                        </div>)
                                })
                            }







                        </div>
                    </div>
                </section>
                <NotificationContainer />

                <Modal size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={show}
                    onHide={handleClose}
                >
                    <Modal.Header closeButton>

                        <Modal.Title id="contained-modal-title-vcenter " style={{ textAlign: "center" }}>
                            <h5 > Add Employee</h5>
                        </Modal.Title>

                    </Modal.Header>

                    <Modal.Footer className='fm'>
                        <Form className='fm' type="submit" onSubmit={handleSubmit}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                <Form.Group className='mb-3' controlId="formGridProfilePic">

                                    <Form.Label htmlFor='uploadpic' >Profile Pic <br></br>
                                        {file ? <img style={{ borderRadius: "50%", width: "80px", marginTop: "10px" }} src={URL.createObjectURL(file)} alt="" /> : <img src={pp} alt="" style={{ borderRadius: "50%", width: "80px", marginTop: "10px" }} />}
                                    </Form.Label>

                                    <Form.Control type="file"
                                        name='file'
                                        value={emp.profilepic}
                                        style={{ display: "none" }}
                                        id='uploadpic'
                                        
                                        onChange={(e) => setfile(e.target.files[0])}
                                    />
                                </Form.Group></div>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" required name='firstname' placeholder="First Name" value={emp.firstname} onChange={handleinput} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" required name='lastname' placeholder="Last Name" value={emp.lastname} onChange={handleinput} />
                                </Form.Group>
                            </Row>
                            <Form.Group className='mb-3' controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control placeholder="Email" required name='email' value={emp.email} onChange={handleinput} />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridUsername" >
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control placeholder="username" required name='username' value={emp.username} onChange={handleinput} />
                                </Form.Group>


                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control placeholder="password" required name='password' type='password' value={emp.password} onChange={handleinput} />
                                </Form.Group>
                            </Row>
                            <Form.Group controlId="formGridAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type='text' name='address' required placeholder='street aaddress' value={emp.address} onChange={handleinput} />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type='phone' name='phone' required placeholder='+923.....' value={emp.phone} onChange={handleinput} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridDepartment">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Select defaultValue="Choose..." required name='department' value={emp.department} onChange={handleinput}>
                                        <option>Choose...</option>
                                        <option>IT</option>
                                        <option>HR</option>
                                        <option>Systems</option>
                                    </Form.Select>
                                </Form.Group>


                            </Row>
                            <Row className='mb-3'>
                                <Form.Group as={Col} controlId="formGridDesignation">
                                    <Form.Label>Designation</Form.Label>
                                    <Form.Control placeholder="Designation" required name='designation' value={emp.designation} onChange={handleinput} />

                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridJoinningDate">
                                    <Form.Label >Joinning Date</Form.Label>
                                    <Form.Control type='Date' required onChange={handleinput} value={emp.joiningdate} name="joiningdate" />
                                </Form.Group>
                            </Row>

                            {/* <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}

                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Button type="submit" className='btn' >
                                    Add Employee
                                </Button>
                            </div>
                        </Form>
                    </Modal.Footer>

                </Modal>
            </div>
        </>
    )
}

export default AllEmployees