import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import { Modal, Button, Form } from 'react-bootstrap';
import { DataGrid } from "@mui/x-data-grid";
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import './calendar.css';
import axios from "axios"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const Calendar = () => {

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [calendar, setcalendar] = useState([])
    const [Calendar,setCalendar] = useState({
        calendarname:""
    })
    const url = "calendar/addcalendar";
    const url1 = "/calendar";
     //handle input
     let name,value;
     const handleInput = (e) =>{
        
         name  =e.target.name;
         value =e.target.value
         setCalendar({...Calendar,[name]:value})
     }
    //posting calendars
    const postCalendar = async () =>{
        try{
               const post = await axios.post(url,Calendar);
               post && window.location.replace('/calendar')
        }catch(error){
            console.log(error)
        }
    }
    
   
    
    //get all calendars
    const getCalendars = async () => {
        try {
            const response = await axios.get(url1);
            const data = response.data;
            setcalendar(data);
            console.log(data)
           
        } catch (error) { console.log(error) }
    }

    useEffect(() => {
        getCalendars();
        

    },[])
   
  
    
    const columns = [
        { field: 'id', headerName: 'Sr #', width: 120 },
        { field: 'calendarname', headerName: 'Calendar Name', width: 300 },
        { field: 'createdOn', headerName: 'Created On', width: 280 },
        { field: 'day', headerName: 'Day', width: 280 },
        {field: "time",headerName:"Time", width:280}
    ]
   
   const rows = calendar.map(calendar=>({id:calendar.sr_no,calendarname:calendar.calendarname,createdOn:moment(calendar.createdAt).format("D/MM/YYYY"),day:moment(calendar.createdAt).format("dddd"),time:moment(calendar.createdAt).format('LT')}))

    return (
        <>
            <div className='' style={{ backgroundColor: '#f7f7f7' }}>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className='row align-items-center'>
                            <div className='col'>
                                <h3 className='page-title'>Calendars</h3>
                                <ul className='breadcrumb' style={{ backgroundColor: '#f7f7f7' }}>
                                    <li className="breadcrumb-item">
                                        <Link to='/' style={{ color: '#1f1f1f' }}>Dashboard</Link>
                                    </li>
                                    <li className='breadcrumb-item active'>
                                        Calendars
                                    </li>
                                </ul>
                                <div className='col-auto float-end ms-auto'>
                                    <div style={{display:"flex",alignItems:"center"}}><a className='btn add-btn ' data-bs-toggle="modal" data-bs-target="#add_calendar" onClick={handleShow}><i className='fa fa-plus'style={{fontSize:"14px",marginRight:"2px"}} > </i>Add Calendar</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='content'>
                    <div className='container-fluid'>
                        <div className="card">
                            <div className="card-header  " style={{ backgroundColor: "#ff9b44" }}>
                                <h3 className="card-title" style={{ color: "white" }}>Available Calandars</h3>
                            </div>
                            <div className="card-body">
                                <div className='table-responsive'>
                                    <div style={{ height: 400, width: '100%' }}>
                                        <DataGrid columns={columns} rows={rows} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
   

                {/* add calendar popup modal */}
                <Modal size="sm"
                    onHide={handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={show}

                >
                    <Modal.Header closeButton >
                        <Modal.Title id="contained-modal-title-vcenter" className='header-modal'>
                            <CalendarMonthIcon style={{ color: "#ff9b44" }} /> <span style={{ marginLeft: "10px", fontSize: "18px" }}>Add Calendar</span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form type="submit" onSubmit={postCalendar}>
                            <Form.Group>
                                <Form.Label><span> Calendar Name</span></Form.Label>
                                <Form.Control type='text' onChange={handleInput} name="calendarname"></Form.Control>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <Button type="submit" className='btn mt-4' >
                                        Add Calendar
                                    </Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>

            </div>

        </>
    )
}

export default Calendar