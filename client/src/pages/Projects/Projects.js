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
import { visuallyHidden } from "@mui/utils";
import { Link } from "react-router-dom";
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import originURL from "../../url";
import { Button } from "@mui/material";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Badge from 'react-bootstrap/Badge';

import { styled } from '@mui/material/styles';

var moment = require('moment'); // require


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));




const Projects = () => {
    const [requestedProperties, setRequestedProperties] = useState([]);
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("name");
    const [filteredRequestedProperties, setFilteredRequestedProperties] = useState("");
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [projectName, setProjectName] = useState("");
    const [projectManager, setProjectManager] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projects, setProjects] = useState([]);
    const [projectStartDate, setProjectStartDate] = useState("");
    const [projectEndDate, setProjectEndDate] = useState("");
    const [allocatedWorkingDays, setAllocatedWorkingDays] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [update, setUpdate] = useState(false);
    const item = useLocation();


    const propDetail = item.state || {}

    useEffect(() => {


        {





            if (JSON.parse(localStorage.getItem("timesheet_user437")).isAdmin) {

                axios.get(`${originURL}/projects/allprojects/${JSON.parse(localStorage.getItem("timesheet_user437")).details._id}`).then((res) => {
                    setProjects(res.data.get);
                });
            } else {


                axios.get(`${originURL}/projects/userprojects/${JSON.parse(localStorage.getItem("timesheet_user437")).details._id}`).then((res) => {
                    setProjects(res.data.get);
                });

            }


        }


    }, [update]);


    console.log("reqprop", requestedProperties)

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

        console.log(
            "stabilizedThis",
            stabilizedThis.map((el) => el[0])
        );

        return stabilizedThis.map((el) => el[0]);
    }

    const headCells = [
        {
            id: "index",
            numeric: false,
            disablePadding: false,
            label: "No.",
        },
        {
            id: "projectname",
            numeric: false,
            disablePadding: false,
            label: "Title",
            extended: true,
        },
        {
            id: "projectStartDate",
            numeric: false,
            disablePadding: false,
            label: "Date Started",
            extended: true,

        },
        {
            id: "projectEndDate",
            numeric: false,
            disablePadding: false,
            label: "Project Deadline",
            extended: true,

        },
        {
            id: "timeSpent",
            numeric: false,
            disablePadding: false,
            label: "Project Time Spent",
            extended: true,

        },
        {
            id: "Detail",
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
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projects.length) : 0;

    const TableRowCustom = (props) => {
        console.log("table", props)
        const { _id, projectname, description, projectStartDate, projectEndDate, datestart } = props;

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

                <TableCell align="left">{rowsPerPage * page + index + 1}</TableCell>

                <TableCell align="left">{projectname}</TableCell>
                {/* <TableCell align="right">{ShortDescription}</TableCell> */}
                <TableCell align="left">{moment(new Date(projectStartDate)).format("dddd, MMMM Do YYYY")}</TableCell>
                {/* <TableCell align="right">{updatedAt.slice(0, 25)}</TableCell> */}
                <TableCell align="left">
                    {moment(new Date(projectEndDate)).format("dddd, MMMM Do YYYY")}

                </TableCell>
                {/* <TableCell align="left">
                    {
                        Math.round((((new Date().getTime()) - (new Date(projectStartDate).getTime())) / ((new Date(projectEndDate).getTime()) - (new Date(projectStartDate).getTime()))) * 100)
                    }%
                    <BorderLinearProgress variant="determinate" value={
                        (((new Date().getTime()) - (new Date(projectStartDate).getTime())) / ((new Date(projectEndDate).getTime()) - (new Date(projectStartDate).getTime()))) * 100
                    } />

                </TableCell> */}

                <TableCell align="left">

                    {(((new Date().getTime()) - (new Date(projectStartDate).getTime())) / ((new Date(projectEndDate).getTime()) - (new Date(projectStartDate).getTime()))) * 100 <= 100 ?

                        <>
                            {
                                Math.round((((new Date().getTime()) - (new Date(projectStartDate).getTime())) / ((new Date(projectEndDate).getTime()) - (new Date(projectStartDate).getTime()))) * 100)
                            }%
                            <BorderLinearProgress variant="determinate" value={
                                (((new Date().getTime()) - (new Date(projectStartDate).getTime())) / ((new Date(projectEndDate).getTime()) - (new Date(projectStartDate).getTime()))) * 100
                            }



                            /> </> : <>

                            {projectEndDate ?

                                <div className="d-flex justify-content-center">
                                    <Badge style={{ width: "100px", height: "20px" }} pill bg="danger"  >
                                        overdue
                                    </Badge>
                                </div>

                                :
                                <div className="d-flex justify-content-center">
                                    <Badge style={{ width: "100px", height: "20px" }} pill bg="success"  >
                                        In Progress
                                    </Badge>
                                </div>}
                        </>
                            
                    }

                </TableCell>

                <TableCell align="right">
                    <Link
                        to="/projects/projectdetail"
                        state={{
                            item: props
                        }}
                        style={{ textDecoration: "none" }}
                    >
                        <Button style={{ backgroundColor: "#0096FF", color: "white", fontWeight: "500", height: "28px" }} >Details</Button>
                    </Link>
                </TableCell>
            </TableRow>
        );
    };

    return (

            <div className='content-wrapper' style={{ backgroundColor: '#f7f7f7', height: "90%", paddingTop: "50px"  }}>
                <Container style={{ marginTop: "20px", marginBottom: "80px" }}>
                    <Box sx={{ width: "95%"}}>
                        <Paper className="p-4" sx={{ width: "100%", mb: 2 }}>
                            <TableContainer >
                                <div className="d-flex ml-3 mt-3 mb-1">
                                    <h3
                                        className="mr-5"
                                        style={{ marginTop: "0px", marginBottom: "0px" }}
                                    >
                                        Projects
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


                                    {
                                        JSON.parse(localStorage.getItem("timesheet_user437")).isAdmin &&
                                        <div className='d-flex justify-content-between align-items-center ps-3 pe-3'>
                                            <Button style={{ marginLeft: "auto", backgroundColor: "#0F52BA", color: "white", fontWeight: "700" }} variant="success" onClick={handleShow}>Add Project</Button>{' '}
                                        </div>
                                    }
                                    <br />
                                    <Modal style={{ marginTop: "18vh" }} show={show} onHide={handleClose} animation={false}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Add another Project</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="d-flex justify-content-center">
                                                <div style={{ width: "80%" }} >
                                                    <input placeholder="Project Name" style={{ width: "100%" }} onChange={(e) => setProjectName(e.target.value)}></input>
                                                    <br /><br />

                                                    <input placeholder="Project Manager" style={{ width: "100%" }} onChange={(e) => setProjectManager(e.target.value)}></input>
                                                    <br /><br />

                                                    <label >Start Date:</label> &nbsp;
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <input style={{ marginLeft: "auto" }} type="date" defaultValue={
                                                        // moment(new Date).format("YYYY-MM-DD")
                                                        new Date

                                                    } onSelect={(e) => {
                                                        // setProjectStartDate(moment(new Date(e.target.value)).format("dddd, MMMM Do YYYY"))
                                                        setProjectStartDate(new Date(e.target.value))
                                                    }}                                                    
                                                    />
                                                    <br /><br />

                                                    <label >Estimated End Date:</label> &nbsp;
                                                    <input style={{ marginLeft: "auto" }} type="date" defaultValue={
                                                        // moment(new Date).format("YYYY-MM-DD")
                                                        new Date
                                                    }
                                                        onSelect={(e) => {
                                                            // setProjectEndDate(moment(new Date(e.target.value)).format("dddd, MMMM Do YYYY"))
                                                            setProjectEndDate(new Date(e.target.value))

                                                        }}
                                                    />
                                                    <br /><br />

                                                    <input placeholder="Allocated Working Days" type="number" style={{ width: "100%" }} onChange={(e) => setAllocatedWorkingDays(e.target.value)}></input>
                                                    <br /><br />

                                                    <textarea placeholder="Description" style={{ width: "100%" }} onChange={(e) => setProjectDescription(e.target.value)}></textarea>
                                                </div>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button style={{ marginLeft: "auto", backgroundColor: "gray", color: "white", fontWeight: "700" }} variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            &nbsp; &nbsp;
                                            <Button style={{ backgroundColor: "#0F52BA", color: "white", fontWeight: "700" }} variant="primary" onClick={() => {

                                                if (projectName == "") {

                                                    NotificationManager.error("Project name is required")

                                                }
                                                else {

                                                    try {

                                                        axios.post(`${originURL}/projects/addproject`, {
                                                            projectname: projectName,
                                                            description: projectDescription,
                                                            dateCreated: moment(new Date).format("dddd, MMMM Do YYYY"),
                                                            projectStartDate: projectStartDate,
                                                            projectEndDate: projectEndDate,
                                                            allocatedWorkingDays: allocatedWorkingDays,
                                                            supervisor: `${JSON.parse(localStorage.getItem("timesheet_user437")).details._id}`
                                                        })

                                                        handleClose()
                                                        setUpdate(!update)

                                                        NotificationManager.success("Project added successfully")

                                                    } catch (err) {
                                                        console.log(err)
                                                    }

                                                }
                                            }}>

                                                Add Project
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
                                        {stableSort(projects, getComparator(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((b, index) => {
                                                const labelId = `enhanced-table-checkbox-${index}`;
                                                return (
                                                    (b.projectname
                                                        .toLowerCase()
                                                        .includes(filteredRequestedProperties.toLowerCase()) ||
                                                        b.description.toLowerCase().includes(
                                                            filteredRequestedProperties.toLowerCase()
                                                        ) ||
                                                        b.updatedAt
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
                                count={projects.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Box>
                </Container>
                <NotificationContainer />
            </div>
    );
};

export default Projects