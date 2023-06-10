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
import Badge from 'react-bootstrap/Badge';
var moment = require('moment'); // require



const TasksAssigned = () => {

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
    const [taskDate, setTaskDate] = useState(new Date());
    const [taskStartTime, setTaskStartTime] = useState("");
    const [timeTaken, setTimeTaken] = useState("");


    const [taskEndTime, setTaskEndTime] = useState("");
    const [taskUser, setTaskUser] = useState("");

    const [taskProject, setTaskProject] = useState("");
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [update, setUpdate] = useState(false);
    const [projectPhase, setProjectPhase] = useState("");







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


    const [users, setUsers] = useState([]);

    const [projectPhases, setProjectPhases] = useState([]);










    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const item = useLocation();
    const propDetail = item.state || {}


    useEffect(() => {

        axios.get(`${originURL}/users/allusers`).then((res) => {
            setUsers(res.data.users);
        });

    }, [update]);



    useEffect(() => {


        taskProject && axios.get(`${originURL}/projectphase/getprojectphases/${taskProject}`).then((res) => {
            setProjectPhases(res.data.phases);
        });
document.title='My priorities'
    }, [update]);




    useEffect(() => {


        axios.get(`${originURL}/assigntask/${JSON.parse(localStorage.getItem("timesheet_user437")).details._id}`).then((res) => {
            setTasks(res.data.task);
        });


        axios.get(`${originURL}/projects/${taskUser}`).then((res) => {
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
            id: "task",
            numeric: false,
            disablePadding: false,
            label: "Task",
            extended: true
        },

        {
            id: "project",
            numeric: false,
            disablePadding: false,
            label: "Project",
            extended: true,
        },
        {
            id: "startDate",
            numeric: false,
            disablePadding: false,
            label: "Expected Start Date",
        },
        {
            id: "endDate",
            numeric: true,
            disablePadding: false,
            label: "Expected End Date",
        },
        {
            id: "Status",
            numeric: true,
            disablePadding: false,
            label: `Status`,
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
                            width={headCell.extended === true ? "15%" : "10%"}
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
        const { _id, date, title, startDate, endDate, status } = props;
        const labelId = props.labelId;
        const index = props.index
        const rowsPerPage = props.rowsPerPage;
        const page = props.page;

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
                <TableCell align="left">{(moment(startDate).format('D-MMM-yyyy'))}</TableCell>
                <TableCell align="right">{(moment(endDate).format('D-MMM-yyyy'))}</TableCell>
                <TableCell align="right">

                    <div>
                        {status == "Completed" &&
                            <Badge pill bg="success" style={{width:"75px"}} >
                                Completed
                            </Badge>
                        }
                        {status == "Pending" &&
                            <Badge style={{width:"75px"}} pill bg="danger"  >
                                Pending
                            </Badge>
                        }
                        {status == "InProgress" &&
                            <Badge style={{width:"75px"}} pill bg="warning" text="dark" >
                                In Progress
                            </Badge>
                        }
                    </div>

                </TableCell>
                {/* <TableCell align="right">

                    <Link
                        to="/dailytasks/taskdetail"
                        state={{
                            item: props
                        }}
                        style={{ textDecoration: "none" }}
                    >
                    </Link>

                    <div>
                        <Badge pill bg="warning" text="dark" >
                            Warning
                        </Badge>{' '}
                    </div>

                </TableCell> */}
            </TableRow>
        );
    };

    return (

        <div className='content-wrapper' style={{ backgroundColor: '#f7f7f7', paddingTop: "50px" }}>




            <Container style={{ marginTop: "50px", marginBottom: "50px" }}>
                <Box sx={{ width: "95%" }}>
                    <Paper className="p-4" sx={{ width: "100%", mb: 2 }}>

                        <TableContainer >
                            <div className="d-flex ml-3 mt-3 mb-1">
                                <h3
                                    className="mr-5"
                                    style={{ marginTop: "0px", marginBottom: "0px" }}
                                >
                                    Assigned Tasks
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
            <br />
        </div>
    );
};

export default TasksAssigned