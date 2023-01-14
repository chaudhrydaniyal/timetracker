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
import Modal from 'react-bootstrap/Modal';
import { useLocation, useParams } from 'react-router-dom';
import { visuallyHidden } from "@mui/utils";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import originURL from "../../url";
import { Button } from "react-bootstrap";
import {NotificationContainer, NotificationManager} from 'react-notifications';

import "./DailyTasks.css"

var moment = require('moment'); // require



const DailyTasks = () => {

    const [assignedTasks, setAssignedTasks] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("name");
    const [filteredRequestedProperties, setFilteredRequestedProperties] = useState("");
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [projects, setProjects] = useState("")
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDate, setTaskDate] = useState(new Date());
    const [taskStartTime, setTaskStartTime] = useState("09:00");
    const [timeTaken, setTimeTaken] = useState("510");
    const [taskEndTime, setTaskEndTime] = useState("17:30");
    const [taskProject, setTaskProject] = useState("");
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [update, setUpdate] = useState(false);
    const [projectPhase, setProjectPhase] = useState("");
    const [taskStatus, setTaskStatus] = useState("");


    // *****************   Edit task    *********************************


    const [taskTitleEdit, setTaskTitleEdit] = useState("");
    const [taskDescriptionEdit, setTaskDescriptionEdit] = useState("");
    const [taskDateEdit, setTaskDateEdit] = useState(new Date());
    const [taskStartTimeEdit, setTaskStartTimeEdit] = useState("");
    // const [timeTaken, setTimeTaken] = useState("");
    const [taskEndTimeEdit, setTaskEndTimeEdit] = useState("");
    const [taskProjectEdit, setTaskProjectEdit] = useState("");
    const [projectPhaseEdit, setProjectPhaseEdit] = useState("");
    const [taskIdEdit, setTaskIdEdit] = useState("");
    const [assignedTaskDetail, setAssignedTaskDetail] = useState({});
    const [projectPhases, setProjectPhases] = useState([]);

    const [tasksTab, setTasksTab] = useState(false)


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);


    const item = useLocation();
    const propDetail = item.state || {}


    useEffect(() => {

        axios.get(`${originURL}/tasks/${JSON.parse(localStorage.getItem("timesheet_user437")).details._id}`).then((res) => {
            setTasks(res.data.task);
        });

        axios.get(`${originURL}/projects/${JSON.parse(localStorage.getItem("timesheet_user437")).details._id}`).then((res) => {
            setProjects(res.data.finduser);
        });

    }, [update]);


    useEffect(() => {


        taskProject && axios.get(`${originURL}/projectphase/getprojectphases/${taskProject}`).then((res) => {
            setProjectPhases(res.data.phases);
        });

    }, [update]);


    useEffect(() => {

        axios.get(`${originURL}/assigntask/${JSON.parse(localStorage.getItem("timesheet_user437")).details._id}`).then((res) => {
            setAssignedTasks(res.data.task);
        });

    }, [update]);



    function descendingComparator(a, b, orderBy) {

        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {

        console.log("order", order)

        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    // This method is created for cross-browser compatibility, if you don't
    // need to support IE11, you can use Array.prototype.sort() directly
    function stableSort(array, comparator) {

        const stabilizedThis = array.map((el, index) => [el, index]);

        stabilizedThis.sort((a, b) => {

            const order = comparator(a[0], b[0]);

            if (order !== 0) {
                return order;
            }

            return a[1] - b[1];

        });

        return stabilizedThis.map((el) => el[0]);

    }

    const headCells = [
        {
            id: "date",
            numeric: false,
            disablePadding: false,
            label: "Date",
        },

        {
            id: "title",
            numeric: false,
            disablePadding: false,
            label: "Tasks",
            extended: true,
        },
        {
            id: "startTime",
            numeric: false,
            disablePadding: false,
            label: "Start Time",

        },
        {
            id: "endTime",
            numeric: true,
            disablePadding: false,
            label: "End Time",
        },
        {
            id: "Action",
            numeric: true,
            disablePadding: false,
            label: `Actions`,
        },
    ];

    function EnhancedTableHead(props) {
        const {
            onSelectAllClick,
            order,
            orderBy,
            numSelected,
            rowCount,
            onRequestSort,
        } = props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? "right" : "left"}
                            padding={headCell.disablePadding ? "none" : "normal"}
                            sortDirection={orderBy === headCell.id ? order : false}
                            width={headCell.extended === true ? "20%" : "5%"}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : "asc"}
                                onClick={createSortHandler(headCell.id)}
                                style={{ fontWeight: "600" }}
                            >
                                {headCell.label}
                                {"orderBy" === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === "desc"
                                            ? "sorted descending"
                                            : "sorted ascending"}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };





    // Avoid a layout jump when reaching the last page with empty rows.

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tasks.length) : 0;



    const TableRowCustom = (props) => {
        const { _id, date, title, startTime, endTime } = props;
        const labelId = props.labelId;
        const index = props.index
        const rowsPerPage = props.rowsPerPage;
        const page = props.page;
        const status = "Paid";
        const statusVariant =
            status === "Paid"
                ? "white"
                : status === "Due"
                    ? "warning"
                    : status === "Canceled"
                        ? "danger"
                        : "primary";
        const isItemSelected = false;


        return (
            <TableRow
                hover
                // onClick={(event) => handleClick(event, row.name)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={_id}
                selected={isItemSelected}
            >
                {/* <TableCell align="left">{rowsPerPage * page + index + 1}</TableCell> */}
                <TableCell align="left">{moment(new Date(date)).format("dddd, MMMM Do YYYY")}</TableCell>
                <TableCell align="left">{title}</TableCell>
                {/* <TableCell align="right">{ShortDescription}</TableCell> */}
                <TableCell align="left">{startTime}</TableCell>
                <TableCell align="right">{endTime}</TableCell>
                <TableCell align="right">
                    <Link
                        to="/dailytasks/taskdetail"
                        state={{
                            item: props
                        }}
                        style={{ textDecoration: "none" }}
                    >
                        <Button style={{ backgroundColor: "transparent", color: "black", padding: "3px" }}
                            title="Details"><i class="bi bi-card-text"></i></Button>
                    </Link>


                    <Button style={{ backgroundColor: "transparent", color: "black", padding: "2px" }}
                        onClick={() => {

                            console.log(props.description, "descriptions")

                            setTaskIdEdit(props._id)
                            setTaskTitleEdit(props.title)
                            setTaskDescriptionEdit(props.description)
                            setTaskDateEdit(props.date)
                            setTaskStartTimeEdit(props.startTime)
                            setTaskEndTimeEdit(props.endTime)
                            setTaskProjectEdit(props.projectname)
                            setProjectPhaseEdit(props.projectPhase)
                            handleShowEdit()
                            let start = props.startTime.split(":")
                            let startInMin = (parseInt(start[0]) * 60) + parseInt(start[1])


                            let end = props.endTime.split(":")

                            let endInMin = (parseInt(end[0]) * 60) + parseInt(end[1])
                            console.log(endInMin, startInMin)


                            setTimeTaken(endInMin - startInMin)

                        }}
                        title="Edit"
                    >                 <i class="bi bi-pencil-square"></i>
                    </Button>

                    <Button onClick={() => {
                        axios.delete(`${originURL}/tasks/${props._id}`)

                        setUpdate(!update)

                    }} style={{ backgroundColor: "transparent", color: "red", padding: "2px" }}
                        title="Delete"
                    ><i class="bi bi-trash"></i></Button>


                </TableCell>
            </TableRow>
        );
    };

    return (

        <div className='content-wrapper' style={{ backgroundColor: '#f7f7f7', paddingTop: "50px" }}>
            <Container style={{ marginTop: "20px", marginBottom: "50px" }}>
                <Box sx={{ width: "95%" }}>
                    <Paper className="p-4" sx={{ width: "100%", mb: 2 }}>

                        <TableContainer >
                            <div className="d-flex ml-3 mt-3 mb-1">
                                <h3
                                    className="mr-5"
                                    style={{ marginTop: "0px", marginBottom: "0px" }}
                                >
                                    Daily Tasks
                                </h3>
                                <div
                                    style={{
                                        marginLeft: "auto",
                                        display: "flex",
                                        paddingRight: "10px",
                                    }}
                                >
                                    <input
                                        id="tableSearch"
                                        onChange={(e) => {
                                            setFilteredRequestedProperties(e.target.value);
                                        }}
                                        className="form-control "
                                        placeholder="Search"
                                        style={{
                                            width: "500px",
                                            border: "none",
                                            backgroundColor: "#f0f0f0",
                                            marginRight: "30px",
                                            marginTop: "2px",
                                        }}
                                    ></input>
                                </div>
                                <div className='d-flex justify-content-between align-items-center ps-3 pe-3'>
                                    <Button style={{ marginLeft: "auto", backgroundColor: "#0F52BA", color: "white", fontWeight: "700" }} variant="success" onClick={handleShow}>Add Task</Button>{' '}
                                </div>
                                <br />
                                <Modal style={{ marginTop: "10vh" }} show={show} onHide={handleClose} animation={false}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Task</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <div class="container">
                                            <ul class="nav nav-tabs">
                                                <li className={tasksTab == false ? "tabs-active" : "tabs"}><a style={{ textDecoration: "none", color: "inherit", padding: "20px" }} data-toggle="tab" href="#home" onClick={() => { setTasksTab(false) }}>Additional Tasks</a></li>
                                                &nbsp;
                                                &nbsp;
                                                &nbsp;
                                                <li className={tasksTab == true ? "tabs-active" : "tabs"}><a style={{ textDecoration: "none", color: "inherit", padding: "20px" }} data-toggle="tab" href="#menu1" onClick={() => { setTasksTab(true) }}>Assigned Tasks</a></li>
                                            </ul>

                                            <div class="tab-content">

                                                <br />

                                                <div id="home" class="tab-pane in active">

                                                    <div className="d-flex justify-content-center">

                                                        <h5>Additional Tasks</h5>

                                                    </div>


                                                    <div className="d-flex justify-content-center">
                                                        <div style={{ width: "80%" }} >

                                                            <label >Date:</label> &nbsp;
                                                            <input type="date" style={{ width: "100%" }} defaultValue={moment(new Date).format("YYYY-MM-DD")} onChange={(e) => {
                                                                setTaskDate(new Date(e.target.value))
                                                            }}
                                                            />
                                                            <br /><br />

                                                            {/* <label>Select The Project:</label><br /> */}

                                                            <select onClick={(e) => {
                                                                setTaskProject(e.target.value)
                                                                setUpdate(!update)

                                                            }} style={{ width: "100%" }}>
                                                                <option value="none" selected disabled hidden>Select the Project</option>

                                                                {projects && projects.map((p) => (<option value={`${p._id}`}>{p.projectname}</option>))}

                                                            </select>
                                                            <br />

                                                            <br />

                                                            {/* <label>Project Phase:</label><br /> */}
                                                            <select onClick={(e) => { setProjectPhase(e.target.value) }} style={{ width: "100%" }}>
                                                                <option value="none" selected disabled hidden>Project Phase</option>

                                                                {projectPhases && projectPhases.map((p) => (<option value={`${p._id}`}>{p.phase}</option>))}

                                                            </select>
                                                            <br /><br />

                                                            <input placeholder="Task title" style={{ width: "100%" }} onChange={(e) => setTaskTitle(e.target.value)}></input>
                                                            <br /><br />

                                                            <textarea placeholder="Task Description" style={{ width: "100%" }} onChange={(e) => setTaskDescription(e.target.value)}></textarea>
                                                            <br /><br />

                                                            <label for="appt">Start Time: &nbsp;</label>
                                                            <input type="time" value={taskStartTime} id="appt" name="appt" onChange={(e) => {


                                                                setTaskStartTime(e.target.value)

                                                                let start = e.target.value.split(":")
                                                                let startInMin = (parseInt(start[0]) * 60) + parseInt(start[1])


                                                                let end = taskEndTime.split(":")

                                                                let endInMin = (parseInt(end[0]) * 60) + parseInt(end[1])
                                                                console.log(endInMin, startInMin)


                                                                setTimeTaken(endInMin - startInMin)


                                                            }}></input>
                                                            &nbsp;&nbsp;

                                                            <br />
                                                            <label for="appt">End Time:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                                            <input value={taskEndTime} type="time" id="appt" name="appt" onChange={(e) => {

 
console.log("TimeChanged",e.target.value)
                                                                setTaskEndTime(e.target.value)

                                                                let start = taskStartTime.split(":")
                                                                let startInMin = (parseInt(start[0]) * 60) + parseInt(start[1])

                                                                let end = e.target.value.split(":")

                                                                let endInMin = (parseInt(end[0]) * 60) + parseInt(end[1])

                                                                console.log(endInMin, startInMin)

                                                                setTimeTaken(endInMin - startInMin)

                                                                console.log("TimeTaken",endInMin - startInMin)

                                                            }
                                                            }></input>

                                                            <br /><br />

                                                            <label>Total Time:&nbsp;</label>{

                                                                Math.trunc(timeTaken / 60)} hours and {timeTaken % 60} mins

                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="menu1" class="tab-pane fade">

                                                    <div className="d-flex justify-content-center">

                                                        <h5>Assigned Tasks</h5>

                                                    </div>


                                                    <div className="d-flex justify-content-center">

                                                        <div style={{ width: "80%" }} >

                                                            <label >Date:</label> &nbsp;
                                                            <input type="date" style={{ width: "100%" }} defaultValue={moment(new Date).format("YYYY-MM-DD")} onChange={(e) => {
                                                                setTaskDate(new Date(e.target.value))
                                                            }}
                                                            />
                                                            <br /><br />

                                                            {/* <label>Select The Task:</label><br /> */}

                                                            <select onClick={(e) => {

                                                                setAssignedTaskDetail(assignedTasks.filter((a) => a._id == e.target.value)[0])
                                                                console.log("assignedTaskDetail", assignedTaskDetail)


                                                            }} style={{ width: "100%" }}>

                                                                <option value="none" selected disabled hidden>Select the Task</option>


                                                                {assignedTasks && assignedTasks.map((p) => (<option value={`${p._id}`}>{p.title}</option>))}

                                                            </select>

                                                            <br />
                                                            <br />

                                                            <label>Project:</label><br />

                                                            {assignedTaskDetail && assignedTaskDetail.project && assignedTaskDetail.project.projectname}

                                                            <br />
                                                            <br />

                                                            <label>Expected Start Date:</label><br />
                                                            {(moment(assignedTaskDetail && assignedTaskDetail.project && assignedTaskDetail.startDate).format('D-MMM-yyyy'))}
                                                            {/* { moment(assignedTaskDetail && assignedTaskDetail.project && assignedTaskDetail.startDateassignedTaskDetail.startDate).format('D-MMM-yyyy')} */}

                                                            <br />
                                                            <br />

                                                            <label>Expected End Date:</label><br />

                                                            {/* { moment(assignedTaskDetail && assignedTaskDetail.project && assignedTaskDetail.startDateassignedTaskDetail.endDate).format('D-MMM-yyyy')} */}
                                                            {(moment(assignedTaskDetail && assignedTaskDetail.project && assignedTaskDetail.endDate).format('D-MMM-yyyy'))}
                                                            <br />
                                                            <br />


                                                            <label>Status:</label><br />

                                                            <select placeholder="Status" onClick={(e) => { setTaskStatus(e.target.value) }} style={{ width: "100%" }}>
                                                                {assignedTaskDetail && assignedTaskDetail.status == "InProgress" ? <option selected value='InProgress'>In Progress</option> : <option value='InProgress'>In Progress</option>}
                                                                {assignedTaskDetail && assignedTaskDetail.status == "Pending" ? <option selected value='Pending'>Pending</option> : <option value='Pending'>Pending</option>}
                                                                {assignedTaskDetail && assignedTaskDetail.status == "Completed" ? <option selected value='Completed'>Completed</option> : <option value='Completed'>Completed</option>}

                                                            </select>

                                                            <br />
                                                            <br />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </Modal.Body>

                                    {!tasksTab &&

                                        <Modal.Footer>
                                            <Button style={{ marginLeft: "auto", backgroundColor: "gray", color: "white", fontWeight: "700" }} variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            &nbsp;
                                            &nbsp;
                                            <Button style={{ backgroundColor: "#0F52BA", color: "white", fontWeight: "700" }} variant="primary" onClick={() => {
                                                
                                                if ( taskTitle == "" || taskProject == "" ) {

                                                    NotificationManager.error("fill the required fields")

                                                }
                                                else{

                                                try {
                                                    axios.post(`${originURL}/tasks/addtask`, {
                                                        date: taskDate,
                                                        title: taskTitle,
                                                        description: taskDescription,
                                                        selectProject: taskProject,
                                                        startTime: taskStartTime,
                                                        endTime: taskEndTime,
                                                        addedby: JSON.parse(localStorage.getItem("timesheet_user437")).details._id,
                                                        projectPhase: projectPhase
                                                    })

                                                    handleClose()
                                                    setUpdate(!update)

                                                    NotificationManager.success("Task added successfully")


                                                } catch (err) {
                                                    console.log(err)
                                                }
                                            }
                                            }}>
                                                Add Task
                                            </Button>
                                        </Modal.Footer>
                                    }


                                    {tasksTab &&

                                        <Modal.Footer>
                                            <Button style={{ marginLeft: "auto", backgroundColor: "gray", color: "white", fontWeight: "700" }} variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            &nbsp;
                                            &nbsp;
                                            <Button style={{ backgroundColor: "#0F52BA", color: "white", fontWeight: "700" }} variant="primary" onClick={() => {
                                                try {
                                                    axios.post(`${originURL}/tasks/addtask`, {
                                                        date: taskDate,
                                                        title: assignedTaskDetail.title,
                                                        description: assignedTaskDetail.description,
                                                        selectProject: assignedTaskDetail.project._id,
                                                        startTime: '09:00',
                                                        endTime: '17:30',
                                                        addedby: JSON.parse(localStorage.getItem("timesheet_user437")).details._id,
                                                        projectPhase: assignedTaskDetail.phase,
                                                        status: taskStatus
                                                    })

                                                    axios.put(`${originURL}/assigntask/task`, {
                                                        _id: assignedTaskDetail._id,
                                                        status: taskStatus
                                                    })

                                                    handleClose()
                                                    setUpdate(!update)

                                                    NotificationManager.success("Task added successfully")


                                                } catch (err) {
                                                    NotificationManager.error("fill the required fields")

                                                    console.log(err)
                                                }
                                            }}>
                                                Add Task (Assigned)
                                            </Button>
                                        </Modal.Footer>}

                                </Modal>

                                <Modal style={{ marginTop: "15vh" }} show={showEdit} onHide={handleCloseEdit} animation={false}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit Task</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <div className="d-flex justify-content-center">
                                            <div style={{ width: "80%" }} >

                                                <label >Date:</label> &nbsp;
                                                <input type="date" style={{ width: "100%" }} defaultValue={moment(new Date(taskDateEdit)).format("YYYY-MM-DD")} onChange={(e) => {
                                                    setTaskDateEdit(new Date(e.target.value))
                                                }}
                                                />
                                                <br /><br />

                                                <label>Select The Project:</label><br />


                                                <select value={taskProjectEdit} onClick={(e) => { setTaskProjectEdit(e.target.value) }} style={{ width: "100%" }}>

                                                    {projects && projects.map((p) => (<option value={`${p._id}`}>{p.projectname}</option>))}

                                                </select>

                                                <br />

                                                <label>Project Phase:</label><br />


                                                <select
                                                    value={projectPhaseEdit} onClick={(e) => { setProjectPhaseEdit(e.target.value) }} style={{ width: "100%" }}>

                                                    <option value='Analysis'>Analysis</option>
                                                    <option value='Configuration'>Configuration</option>
                                                    <option value='Customization'>Customization</option>
                                                    <option value='Development'>Development</option>
                                                    <option value='Design'>Design</option>
                                                    <option value='Testing'>Testing</option>
                                                    <option value='Training'>Training</option>

                                                </select>

                                                <br /><br />


                                                <input value={taskTitleEdit} style={{ width: "100%" }} onChange={(e) => setTaskTitleEdit(e.target.value)}></input>
                                                <br /><br />

                                                <textarea value={taskDescriptionEdit} style={{ width: "100%" }} onChange={(e) => setTaskDescriptionEdit(e.target.value)}></textarea>
                                                <br /><br />


                                                <label for="appt">Start Time: &nbsp;</label>
                                                <input type="time" id="appt" value={taskStartTimeEdit} name="appt" onChange={(e) => {


                                                    setTaskStartTimeEdit(e.target.value)

                                                    let start = e.target.value.split(":")
                                                    let startInMin = (parseInt(start[0]) * 60) + parseInt(start[1])


                                                    let end = taskEndTimeEdit.split(":")

                                                    let endInMin = (parseInt(end[0]) * 60) + parseInt(end[1])
                                                    console.log(endInMin, startInMin)


                                                    setTimeTaken(endInMin - startInMin)


                                                }}></input>
                                                &nbsp;&nbsp;
                                                <br />
                                                <label for="appt">End Time:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                                <input type="time" id="appt" name="appt" value={taskEndTimeEdit} onChange={(e) => {


                                                    setTaskEndTimeEdit(e.target.value)

                                                    let start = taskStartTimeEdit.split(":")
                                                    let startInMin = (parseInt(start[0]) * 60) + parseInt(start[1])

                                                    let end = e.target.value.split(":")

                                                    let endInMin = (parseInt(end[0]) * 60) + parseInt(end[1])

                                                    console.log(endInMin, startInMin)

                                                    setTimeTaken(endInMin - startInMin)

                                                }
                                                }></input>

                                                <br /><br />
                                                <label>Total Time:&nbsp;</label>{

                                                    Math.trunc(timeTaken / 60)} hours and {timeTaken % 60


                                                } mins

                                            </div></div>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button style={{ marginLeft: "auto", backgroundColor: "gray", color: "white", fontWeight: "700" }} variant="secondary" onClick={handleCloseEdit}>
                                            Close
                                        </Button>
                                        &nbsp;
                                        &nbsp;

                                        <Button style={{ backgroundColor: "#0F52BA", color: "white", fontWeight: "700" }} variant="primary" onClick={() => {
                                            try {
                                                axios.put(`${originURL}/tasks/addtask`, {
                                                    _id: taskIdEdit,
                                                    date: taskDateEdit,
                                                    title: taskTitleEdit,
                                                    description: taskDescriptionEdit,
                                                    selectProject: taskProjectEdit,
                                                    startTime: taskStartTimeEdit,
                                                    endTime: taskEndTimeEdit,
                                                    addedby: JSON.parse(localStorage.getItem("timesheet_user437")).details._id,
                                                    projectPhase: projectPhaseEdit
                                                })

                                                handleCloseEdit()
                                                setUpdate(!update)

                                            } catch (err) {
                                                console.log(err)
                                            }
                                        }}>
                                            Edit Task
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={false ? "small" : "medium"}
                            >
                                {" "}
                                <EnhancedTableHead
                                    // numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    // onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={5}
                                />
                                <TableBody>
                                    {stableSort(tasks, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((b, index) => {
                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            return (
                                                (b.title
                                                    .toLowerCase()
                                                    .includes(filteredRequestedProperties.toLowerCase()) ||
                                                    b.description.toLowerCase().includes(
                                                        filteredRequestedProperties.toLowerCase()
                                                    ) ||
                                                    b.date
                                                        .toLowerCase()
                                                        .includes(filteredRequestedProperties.toLowerCase())) && (
                                                    <TableRowCustom
                                                        key={`transaction-${b._id}`}
                                                        {...b}
                                                        labelId={labelId}
                                                        index={index}
                                                        rowsPerPage={rowsPerPage}
                                                        page={page}
                                                    />
                                                )
                                            );
                                        })}

                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: (dense ? 33 : 53) * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}

                                </TableBody>
                            </Table>
                        </TableContainer>{" "}
                        <TablePagination
                            rowsPerPageOptions={[25, 50, 100]}
                            component="div"
                            count={tasks.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Box>
            </Container>
            <br />

            <NotificationContainer />
        </div>
    );
};

export default DailyTasks