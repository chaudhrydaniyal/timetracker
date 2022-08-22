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
import { Button } from "@mui/material";

var moment = require('moment'); // require



const DailyTasks = () => {

    const [requestedProperties, setRequestedProperties] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("name");
    const [filteredRequestedProperties, setFilteredRequestedProperties] = useState("");
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [projects, setProjects] = useState("")
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDate, setTaskDate] = useState( moment(new Date).format("YYYY-MM-DD"));
    const [taskStartTime, setTaskStartTime] = useState("");
    const [taskEndTime, setTaskEndTime] = useState("");
    const [taskProject, setTaskProject] = useState("");
    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState(false);



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const item = useLocation();
    const propDetail = item.state || {}

    useEffect(() => {

        axios.get(`${originURL}/tasks/${JSON.parse(localStorage.getItem("user")).details._id}`).then((res) => {
            setTasks(res.data.task);
        });

        axios.get(`${originURL}/projects/${JSON.parse(localStorage.getItem("user")).details._id}`).then((res) => {
            setProjects(res.data.finduser);
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
            id: "Date",
            numeric: false,
            disablePadding: false,
            label: "Date",
        },

        {
            id: "Tasks",
            numeric: false,
            disablePadding: false,
            label: "Tasks",
            extended: true,
        },
        {
            id: "Start_Time",
            numeric: false,
            disablePadding: false,
            label: "Start Time",

        },
        {
            id: "End_Time",
            numeric: true,
            disablePadding: false,
            label: "End Time",
        },
        {
            id: "Details",
            numeric: true,
            disablePadding: false,
            label: "Details",
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

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };


    // Avoid a layout jump when reaching the last page with empty rows.

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tasks.length) : 0;

    const TableRowCustom = (props) => {
        const { _id,date, title, startTime, endTime } = props;

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
                <TableCell align="left">{date}</TableCell>

                <TableCell align="left">{title}</TableCell>
                {/* <TableCell align="right">{ShortDescription}</TableCell> */}
                <TableCell align="left">{startTime}</TableCell>
                <TableCell align="right">{endTime}</TableCell>
                {/* <TableCell align="right">

                    {Type}

                </TableCell> */}

                <TableCell align="right">
                    <Link
                        to="/propertylisting/propertyDetail"
                        state={{
                            item: props
                        }}
                    >
                        <Button variant="success">Details</Button>
                    </Link>
                </TableCell>
            </TableRow>
        );
    };

    return (
        <>

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
                                                console.log("projects",projects)
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

                                        <label>{propDetail.propertyType} Add User</label>      <Button style={{ marginLeft: "auto" }} variant="success" onClick={handleShow}>Add Today's Task</Button>{' '}
                                    </div>
                                    <br />
                                    <Modal style={{ marginTop: "20vh" }} show={show} onHide={handleClose} animation={false}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Add Task</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>

                                            <label >Date:</label>
                                            <input type="date" defaultValue={ moment(new Date).format("YYYY-MM-DD")} onChange={(e)=>{
                    
                                                setTaskDate(moment(new Date(e.target.value)).format("dddd, MMMM Do YYYY"))
                                            
                                            }                                          
                                            } 
                                                
                                                />

                                            <br /><br />
                                            
                                            <input placeholder="Task title" style={{ width: "80%" }} onChange={(e) => setTaskTitle(e.target.value)}></input>
                                            <br /><br />
                                            
                                            <textarea placeholder="Task Description" style={{ width: "80%" }} onChange={(e) => setTaskDescription(e.target.value)}></textarea>
                                            <br /><br />

                                            <div className="d-flex">
                                                <label for="appt">Start Time: &nbsp;</label>
                                                <input type="time" id="appt" name="appt" onChange={(e) => setTaskStartTime(e.target.value)}></input>
                                                &nbsp;&nbsp;
                                                <label for="appt">End Time:&nbsp;</label>
                                                <input type="time" id="appt" name="appt" onChange={(e) => setTaskEndTime(e.target.value)}></input>
                                            </div>
                                            <br /><br />
                                            
                                            <select onClick={(e) => { setTaskProject(e.target.value) }} style={{width:"70%"}}>

                                                {projects && projects.map((p) => (<option value={`${p._id}`}>{p.projectname}</option>))}

                                            </select>

                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="primary" onClick={() => {
                                                try {
                                                    axios.post(`${originURL}/tasks/addtask`, {

                                                        date:taskDate,
                                                        title:taskTitle,
                                                        description:taskDescription,
                                                        selectProject:taskProject,
                                                        startTime:taskStartTime,
                                                        endTime:taskEndTime,
                                                        addedby:JSON.parse(localStorage.getItem("user")).details._id
                                                    })



                                                    handleClose()

                                                    setUpdate(!update)

                                                } catch (err) {
                                                    console.log(err)
                                                }
                                            }}>

                                                Add Task
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
                                rowsPerPageOptions={[5, 10, 25]}
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
            </div>
        </>
    );
};

export default DailyTasks