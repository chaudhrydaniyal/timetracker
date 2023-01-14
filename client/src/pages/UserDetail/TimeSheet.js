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
import { AccordionDetails, Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { Card } from "react-bootstrap";
import { NotificationContainer, NotificationManager } from 'react-notifications';

var moment = require("moment"); // require


const TimeSheet = (props) => {
    const item = useLocation();
    // const propDetail = item.state.item;

    console.log("userdetailpropdetail",)

    const [assignedProjects, setAssignedProjects] = useState([]);
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("name");
    const [filteredRequestedProperties, setFilteredRequestedProperties] = useState("");
    const [page, setPage] = React.useState(0);
    const [pageForTimesheet, setPageForTimesheet] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rowsPerPageForTimesheet, setRowsPerPageForTimesheet] = React.useState(5);
    const [projects, setProjects] = useState([])
    const [assignedProject, setAssignedProject] = useState("")
    const [update, setUpdate] = useState(false);
    const [tasks, setTasks] = useState([]);
    // const [editUsername, setEditUsername] = useState(propDetail.username);
    // const [editFullname, setEditfullname] = useState(propDetail.fullname);
    const [editPassword, setEditPassword] = useState("");
    // const [editRole, setEditRole] = useState(propDetail.role);


    useEffect(() => {


        axios.get(`${originURL}/tasks/alltasks/${JSON.parse(localStorage.getItem("timesheet_user437")).details._id}`).then((res) => {
            setTasks(res.data.get);
        });

    }, [update]);
    console.log("name", tasks)



    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


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
            id: "index",
            numeric: false,
            disablePadding: false,
            label: "No.",
        },
        {
            id: "projectname",
            numeric: false,
            disablePadding: false,
            label: "Project Name",
            extended: true,
        },
        {
            id: "description",
            numeric: false,
            disablePadding: false,
            label: "Description",
            extended: true,
        },
        {
            id: "Actions",
            numeric: true,
            disablePadding: false,
            label: "Actions",
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

    const headCellsForTimesheet = [
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
            id: "name",
            numeric: false,
            disablePadding: false,
            label: "Name",
            extended: false,
        },

        // {
        //     id: "accept/reject",
        //     numeric: true,
        //     disablePadding: false,
        //     label: "Accept/Reject",
        //     extended: false,
        // },
        {
            id: "Details",
            numeric: true,
            disablePadding: false,
            label: "Details",
        },
    ];


    function EnhancedTableHeadForTimesheet(props) {
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
                    {headCellsForTimesheet.map((headCell) => (
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

    const handleChangePageForTimesheet = (event, newPage) => {

        setPageForTimesheet(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeRowsPerPageForTimesheet = (event) => {
        setRowsPerPageForTimesheet(parseInt(event.target.value, 10));
        setPageForTimesheet(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };


    // Avoid a layout jump when reaching the last page with empty rows.

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - assignedProjects.length) : 0;

    const TableRowCustom = (props) => {
        const { _id, projectname, description, updatedAt, role } = props;

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
                <TableCell align="left">  {description}</TableCell>
                {/* <TableCell align="left">{updatedAt.slice(0, 25)}</TableCell> */}

                <TableCell align="right">
                    <Link
                        to="/projects/projectdetail"
                        state={{
                            item: props
                        }}
                        style={{ textDecoration: "none" }}
                    >
                        <Button style={{ backgroundColor: "#0096FF", color: "white", fontWeight: "500", height: "28px" }} variant="success">Details</Button>
                    </Link>
                </TableCell>
            </TableRow>
        );
    };


    const TableRowCustomForTimesheet = (props) => {
        const { _id, date, title, startTime, endTime, addedby } = props;

        const labelId = props.labelId;
        const index = props.index

        const rowsPerPage = props.rowsPerPage;
        const page = props.page;

        // const status = "Paid";
        // const statusVariant =
        //     status === "Paid"
        //         ? "white"
        //         : status === "Due"
        //             ? "warning"
        //             : status === "Canceled"
        //                 ? "danger"
        //                 : "primary";

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
                {/* <TableCell align="right">

                    {Type}

                </TableCell> */}


                <TableCell align="left">{addedby.username}</TableCell>

                {/* <TableCell align="right">

                    <Button
                        onClick={() => {
                            try {
                                axios.put(`${originURL}/tasks/addtask`, {

                                    _id: _id,
                                    status: "Approved"

                                }).then(() => setUpdate(!update))

                            } catch (err) {
                                console.log(err)
                            }
                        }}
                        style={{ backgroundColor: "#228b22", color: "white", fontSize: "11px", width: "25px", height: "15px" }} variant="success">Accept</Button>

                    <br />
                    <Button onClick={() => {
                        try {
                            axios.put(`${originURL}/tasks/addtask`, {

                                _id: _id,
                                status: "Rejected"

                            }).then(() => setUpdate(!update))


                        } catch (err) {
                            console.log(err)
                        }
                    }}

                        style={{ backgroundColor: " #960018", color: "white", fontSize: "11px", width: "25px", height: "15px" }} variant="danger">Reject</Button>

                </TableCell> */}



                <TableCell align="right">
                    <Link
                        to="/dailytasks/taskdetail"
                        state={{
                            item: props
                        }}
                        style={{ textDecoration: "none" }}

                    >
                        <Button style={{ backgroundColor: "#0096FF", color: "white", fontWeight: "500", height: "28px" }} variant="success">Details</Button>
                    </Link>
                </TableCell>
            </TableRow>
        );
    };

    return (

        <div className='content-wrapper' style={{ backgroundColor: '#f7f7f7', paddingTop: "50px", height: '90%' }}>
            <Container style={{ marginTop: "20px", marginBottom: "80px", height: "90%" }}>
                <Box>

                    <Paper sx={{ width: "100%", mb: 2, padding: "30px", paddingBottom: "20px" }}>

                        <TableContainer >
                            <div className="d-flex ml-3 mt-3 mb-1">
                                <h3
                                    className="mr-5"
                                    style={{ marginTop: "0px", marginBottom: "0px" }}
                                >
                                    View Employee Timesheet
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
                                            console.log("projects", projects)
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

                                <br />

                            </div>
                            <Table
                                sx={{ minWidth: 750, maxHeight: 250 }}
                                aria-labelledby="tableTitle"
                                size={false ? "small" : "medium"}
                            >
                                {" "}

                                <EnhancedTableHeadForTimesheet
                                    // numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    // onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={5}
                                />
                                <TableBody>
                                    {
                                        stableSort(tasks, getComparator(order, orderBy))
                                            // .slice(pageForTimesheet * rowsPerPageForTimesheet, pageForTimesheet * rowsPerPageForTimesheet + rowsPerPageForTimesheet)
                                            .map((b, index) => {
                                                const labelId = `enhanced-table-checkbox-${index}`;
                                                return (
                                                    (b.title
                                                        .toLowerCase()
                                                        .includes(filteredRequestedProperties.toLowerCase()) ||
                                                        b.addedby.username.toLowerCase().includes(
                                                            filteredRequestedProperties.toLowerCase()
                                                        ) ||
                                                        b.date
                                                            .toLowerCase()
                                                            .includes(filteredRequestedProperties.toLowerCase())) && (
                                                        <TableRowCustomForTimesheet
                                                            key={`transaction-${b._id}`}
                                                            {...b}
                                                            labelId={labelId}
                                                            index={index}
                                                            rowsPerPage={rowsPerPageForTimesheet}
                                                            page={pageForTimesheet}
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


                        {/* <TablePagination
                                // rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={tasks.length}
                                rowsPerPage={tasks.length}
                                page={pageForTimesheet}
                                onPageChange={handleChangePageForTimesheet}
                                onRowsPerPageChange={handleChangeRowsPerPageForTimesheet}
                            /> */}
                        {/* </Paper> */}
                    </Paper>
                </Box>


            </Container>

            <NotificationContainer />
        </div>






    );
};

export default TimeSheet