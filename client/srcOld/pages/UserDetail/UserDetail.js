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
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import originURL from "../../url";
import { Button } from "@mui/material";
import { Card } from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Accordion from "react-bootstrap/Accordion";

var moment = require("moment"); // require

const UserDetail = () => {
  const item = useLocation();
  const propDetail = item.state.item;

  console.log("userdetailpropdetail", propDetail);

  const [assignedProjects, setAssignedProjects] = useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [
    filteredRequestedProperties,
    setFilteredRequestedProperties,
  ] = useState("");
  const [page, setPage] = React.useState(0);
  const [pageForTimesheet, setPageForTimesheet] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rowsPerPageForTimesheet, setRowsPerPageForTimesheet] = React.useState(
    25
  );
  const [rowsPerPageForTeamMembers, setRowsPerPageForTeamMembers] = React.useState(
    5
  );
  const [projects, setProjects] = useState([]);
  const [assignedProject, setAssignedProject] = useState("");
  const [update, setUpdate] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editUsername, setEditUsername] = useState(propDetail.username);
  const [editFullname, setEditfullname] = useState(propDetail.fullname);
  const [editPassword, setEditPassword] = useState("");
  const [editRole, setEditRole] = useState(propDetail.role);
  const [teamMembers, setTeamMembers] = useState("");
  const [pageForTeamMembers, setPageForTeamMembers] = useState(0);


  useEffect(() => {
    axios.get(`${originURL}/projects/${propDetail._id}`).then((res) => {
      console.log(res.data);
      setAssignedProjects(res.data.finduser);
    });

    axios
      .get(`${originURL}/users/teammembers/${propDetail._id}`)
      .then((res) => {
        console.log("teamMembers", res.data);
        setTeamMembers(res.data.users);
      });

    axios
      .get(
        `${originURL}/projects/allprojects/${
          JSON.parse(localStorage.getItem("timesheet_user437")).details._id
        }`
      )
      .then((res) => {
        setProjects(res.data.get);
      });

    axios.get(`${originURL}/tasks/${propDetail._id}`).then((res) => {
      setTasks(res.data.task);
    });
  }, [update]);

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
      label: "Start",
    },
    {
      id: "endTime",
      numeric: true,
      disablePadding: false,
      label: "End",
    },

    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "Status",
      extended: false,
    },

    {
      id: "accept/reject",
      numeric: true,
      disablePadding: false,
      label: "Accept/Reject",
      extended: false,
    },
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
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - assignedProjects.length)
      : 0;

  const TableRowCustom = (props) => {
    const { _id, projectname, description, updatedAt, role } = props;

    const labelId = props.labelId;
    const index = props.index;

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
        <TableCell align="left"> {description}</TableCell>
        {/* <TableCell align="left">{updatedAt.slice(0, 25)}</TableCell> */}

        <TableCell align="right">
          <Link
            to="/projects/projectdetail"
            state={{
              item: props,
            }}
            style={{ textDecoration: "none" }}
          >
            <Button
              style={{
                backgroundColor: "#0096FF",
                color: "white",
                fontWeight: "500",
                height: "28px",
              }}
              variant="success"
            >
              Details
            </Button>
          </Link>
        </TableCell>
      </TableRow>
    );
  };









  //////////////////////////////////////////////////////////////******************************************************************* */

  const headCellsForTeamMembers = [
    {
      id: "No",
      numeric: false,
      disablePadding: false,
      label: "No",
    },

    {
      id: "fullname",
      numeric: false,
      disablePadding: false,
      label: "FullName",
      extended: true,
    },
    {
      id: "username",
      numeric: false,
      disablePadding: false,
      label: "UserName",
    },
    // {
    //     id: "endTime",
    //     numeric: true,
    //     disablePadding: false,
    //     label: "End",
    // },

    // {
    //     id: "status",
    //     numeric: false,
    //     disablePadding: false,
    //     label: "Status",
    //     extended: false,
    // },

    // {
    //     id: "accept/reject",
    //     numeric: true,
    //     disablePadding: false,
    //     label: "Accept/Reject",
    //     extended: false,
    // },
    // {
    //     id: "Details",
    //     numeric: true,
    //     disablePadding: false,
    //     label: "Details",
    // },
  ];

  function EnhancedTableHeadForTeamMembers(props) {
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
          {headCellsForTeamMembers.map((headCell) => (
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

  const handleRequestSortTeamMembers = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePageTeamMembers = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePageForTeamMembers = (event, newPage) => {
    setPageForTeamMembers(newPage);
  };

  const handleChangeRowsPerPageTeamMembers = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeRowsPerPageForTeamMembers = (event) => {
    setRowsPerPageForTeamMembers(parseInt(event.target.value, 10));
    setPageForTeamMembers(0);
  };

  const handleChangeDenseTeamMembers = (event) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.

  const TableRowCustomForTeamMembers = (props) => {
    const { _id, fullname, username } = props;

    const labelId = props.labelId;
    const index = props.index;

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

        <TableCell align="left">{fullname}</TableCell>
        {/* <TableCell align="right">{ShortDescription}</TableCell> */}
        <TableCell align="left"> {username}</TableCell>
        {/* <TableCell align="left">{updatedAt.slice(0, 25)}</TableCell> */}


      </TableRow>
    );
  };

  ////////////////////////////////////////////////////////////////








  const TableRowCustomForTimesheet = (props) => {
    const { _id, date, title, startTime, endTime, status } = props;

    const labelId = props.labelId;
    const index = props.index;

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
        <TableCell align="left">
          {moment(new Date(date)).format("dddd, MMMM Do YYYY")}
        </TableCell>

        <TableCell align="left">{title}</TableCell>

        {/* <TableCell align="right">{ShortDescription}</TableCell> */}
        <TableCell align="left">{startTime}</TableCell>
        <TableCell align="right">{endTime}</TableCell>
        {/* <TableCell align="right">

                    {Type}

                </TableCell> */}

        <TableCell align="left">{status}</TableCell>

        <TableCell align="right">
          <Button
            onClick={() => {
              try {
                axios
                  .put(`${originURL}/tasks/addtask`, {
                    _id: _id,
                    status: "Approved",
                  })
                  .then(() => setUpdate(!update));
              } catch (err) {
                console.log(err);
              }
            }}
            style={{
              backgroundColor: "#228b22",
              color: "white",
              fontSize: "11px",
              width: "25px",
              height: "15px",
            }}
            variant="success"
          >
            Accept
          </Button>

          <br />
          <Button
            onClick={() => {
              try {
                axios
                  .put(`${originURL}/tasks/addtask`, {
                    _id: _id,
                    status: "Rejected",
                  })
                  .then(() => setUpdate(!update));
              } catch (err) {
                console.log(err);
              }
            }}
            style={{
              backgroundColor: " #960018",
              color: "white",
              fontSize: "11px",
              width: "25px",
              height: "15px",
            }}
            variant="danger"
          >
            Reject
          </Button>
        </TableCell>

        <TableCell align="right">
          <Link
            to="/dailytasks/taskdetail"
            state={{
              item: props,
            }}
            style={{ textDecoration: "none" }}
          >
            <Button
              style={{
                backgroundColor: "#0096FF",
                color: "white",
                fontWeight: "500",
                height: "28px",
              }}
              variant="success"
            >
              Details
            </Button>
          </Link>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <div
        className="content-wrapper"
        style={{ backgroundColor: "#f7f7f7", paddingTop: "50px" }}
      >
        <Container
          style={{ marginTop: "20px", marginBottom: "40px", height: "90%" }}
        >
          <Box sx={{ width: "95%" }}>
            <Paper
              sx={{
                width: "100%",
                mb: 2,
                padding: "30px",
                paddingBottom: "20px",
              }}
            >
              <div style={{ width: "98%" }} className="cardflex ">
                <div style={{ width: "100%" }}>
                  <div
                    style={{ width: "100%" }}
                    className="d-flex align-items-center"
                  >
                    <div style={{ width: "95%" }}>
                      <h3
                        className="px-3 py-2"
                        style={{ paddingBottom: 0, marginBottom: 0 }}
                      >
                        {propDetail.fullname}
                      </h3>
                    </div>
                    <div className="d-flex">
                      <Button
                        style={{
                          marginLeft: "auto",
                          backgroundColor: "rgb(15, 82, 186)",
                          fontWeight: "700",
                          color: "white",
                        }}
                        onClick={() => {
                          setShowEdit(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          fontWeight: "700",
                          marginLeft: "10px",
                        }}
                        variant="primary"
                        onClick={() => {
                          try {
                            axios.put(
                              `${originURL}/auth/register/${propDetail._id}`,
                              {
                                activeUser: false,
                                password: "",
                              }
                            );

                            setUpdate(!update);
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                      >
                        Deactivate
                      </Button>
                    </div>
                  </div>
                  <Modal
                    style={{ marginTop: "20vh" }}
                    show={showEdit}
                    onHide={() => {
                      setShowEdit(false);
                    }}
                    animation={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="d-flex justify-content-center">
                        <div style={{ width: "80%" }}>
                          <label>Full name</label>
                          <input
                            value={editFullname}
                            style={{ width: "100%" }}
                            onChange={(e) => setEditfullname(e.target.value)}
                          ></input>
                          <br />
                          <br />
                          <label>New Username</label>
                          <input
                            value={editUsername}
                            style={{ width: "100%" }}
                            onChange={(e) => setEditUsername(e.target.value)}
                          ></input>
                          <br />
                          <br />
                          <label>New Password</label>
                          <input
                            value={editPassword}
                            style={{ width: "100%" }}
                            onChange={(e) => setEditPassword(e.target.value)}
                          ></input>
                          <br />
                          <br />
                          <label>Role</label>
                          <input
                            value={editRole}
                            style={{ width: "100%" }}
                            onChange={(e) => setEditRole(e.target.value)}
                          ></input>
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
                        onClick={() => {
                          setShowEdit(false);
                        }}
                      >
                        Close
                      </Button>
                      &nbsp;&nbsp;
                      <Button
                        style={{
                          backgroundColor: "#0F52BA",
                          color: "white",
                          fontWeight: "700",
                        }}
                        variant="primary"
                        onClick={() => {
                          try {
                            if (editPassword) {
                              axios.put(
                                `${originURL}/auth/register/${propDetail._id}`,
                                {
                                  fullname: editFullname,
                                  username: editUsername,
                                  password: editPassword,
                                  role: editRole,
                                  activeUser: true,
                                }
                              );

                              propDetail.username = editUsername;
                              propDetail.fullname = editFullname;
                              propDetail.role = editRole;

                              setUpdate(!update);
                              setShowEdit(false);
                              NotificationManager.success(
                                "User updated successfully"
                              );
                            } else {
                              NotificationManager.error(
                                "Please fill the required fields"
                              );
                            }
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                      >
                        Update User
                      </Button>
                    </Modal.Footer>
                  </Modal>

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
                            Role:
                            <span
                              className="ml-2 "
                              style={{
                                fontWeight: "normal",
                              }}
                            >
                              {propDetail.role}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

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
                            Username:
                            <span
                              className="ml-2 "
                              style={{
                                fontWeight: "normal",
                              }}
                            >
                              {propDetail.username}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Team Members</Accordion.Header>
                  <Accordion.Body>
                    <TableContainer>
                      <div className="d-flex ml-3 mt-3 mb-1">
                        <div
                          style={{
                            marginLeft: "0",
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
                              width: "850px",
                              border: "none",
                              backgroundColor: "#f0f0f0",
                              marginRight: "30px",
                              marginTop: "2px",
                            }}
                          ></input>
                        </div>
                        {JSON.parse(localStorage.getItem("timesheet_user437"))
                          .isAdmin && (
                          <div className="d-flex justify-content-between align-items-center ps-3 pe-3">
                            <Button
                              style={{
                                marginLeft: "auto",
                                backgroundColor: "#0F52BA",
                                color: "white",
                                fontWeight: "700",
                              }}
                              variant="success"
                              onClick={handleShow}
                            >
                              Add Team Member
                            </Button>{" "}
                          </div>
                        )}
                        <br />
                        <Modal
                          style={{ marginTop: "30vh" }}
                          show={show}
                          onHide={handleClose}
                          animation={false}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Assign Project</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <br />

                            <div>
                              Select the project from the dropdown below:
                            </div>
                            <br />

                            <div className="d-flex justify-content-center">
                              <select
                                onClick={(e) => {
                                  setAssignedProject(e.target.value);
                                }}
                                style={{ width: "70%" }}
                              >
                                <option value="none" selected disabled hidden>
                                  Select the Project
                                </option>

                                {projects &&
                                  projects.map((p) => (
                                    <option value={`${p._id}`}>
                                      {p.projectname}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <br />
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
                              style={{
                                backgroundColor: "#0F52BA",
                                color: "white",
                                fontWeight: "700",
                              }}
                              variant="primary"
                              onClick={() => {
                                try {
                                  console.log(
                                    "assigned project",
                                    assignedProject
                                  );

                                  if (assignedProject) {
                                    axios.put(
                                      `${originURL}/projects/assignproject/${assignedProject}`,
                                      {
                                        assignTo: propDetail._id,
                                      }
                                    );
                                    handleClose();
                                    setUpdate(!update);
                                    NotificationManager.success(
                                      "Project assigned to user"
                                    );
                                  } else {
                                    NotificationManager.error(
                                      "Please select the project"
                                    );
                                  }
                                } catch (err) {
                                  console.log(err);
                                }
                              }}
                            >
                              Assign Project
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
                        <EnhancedTableHeadForTeamMembers
                          // numSelected={selected.length}
                          order={order}
                          orderBy={orderBy}
                          // onSelectAllClick={handleSelectAllClick}
                          onRequestSort={handleRequestSort}
                          rowCount={5}
                        />
                        <TableBody>
                          {stableSort(
                            teamMembers ? teamMembers : [],
                            getComparator(order, orderBy)
                          )
                            .slice(
                              pageForTeamMembers * rowsPerPageForTeamMembers,
                              pageForTeamMembers * rowsPerPageForTeamMembers + rowsPerPageForTeamMembers
                            )
                            .map((b, index) => {
                              const labelId = `enhanced-table-checkbox-${index}`;
                              return (
                                (b.fullname
                                  .toLowerCase()
                                  .includes(
                                    filteredRequestedProperties.toLowerCase()
                                  ) ||
                                  b.fullname
                                    .toLowerCase()
                                    .includes(
                                      filteredRequestedProperties.toLowerCase()
                                    ) ||
                                  b.username
                                    .toLowerCase()
                                    .includes(
                                      filteredRequestedProperties.toLowerCase()
                                    )) && (
                                  <TableRowCustomForTeamMembers
                                    key={`transaction-${b._id}`}
                                    {...b}
                                    labelId={labelId}
                                    index={index}
                                    rowsPerPage={rowsPerPageForTeamMembers}
                                    page={pageForTeamMembers}
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
                      count={teamMembers.length}
                      rowsPerPage={rowsPerPageForTeamMembers}
                      page={pageForTeamMembers}
                      onPageChange={handleChangePageForTeamMembers}
                      onRowsPerPageChange={
                        handleChangeRowsPerPageForTeamMembers
                      }
                    />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Assigned Projects</Accordion.Header>
                  <Accordion.Body>
                    <TableContainer>
                      <div className="d-flex ml-3 mt-3 mb-1">
                        <div
                          style={{
                            marginLeft: "0",
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
                              width: "850px",
                              border: "none",
                              backgroundColor: "#f0f0f0",
                              marginRight: "30px",
                              marginTop: "2px",
                            }}
                          ></input>
                        </div>
                        {JSON.parse(localStorage.getItem("timesheet_user437"))
                          .isAdmin && (
                          <div className="d-flex justify-content-between align-items-center ps-3 pe-3">
                            <Button
                              style={{
                                marginLeft: "auto",
                                backgroundColor: "#0F52BA",
                                color: "white",
                                fontWeight: "700",
                              }}
                              variant="success"
                              onClick={handleShow}
                            >
                              Assign Project
                            </Button>{" "}
                          </div>
                        )}
                        <br />
                        <Modal
                          style={{ marginTop: "30vh" }}
                          show={show}
                          onHide={handleClose}
                          animation={false}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Assign Project</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <br />

                            <div>
                              Select the project from the dropdown below:
                            </div>
                            <br />

                            <div className="d-flex justify-content-center">
                              <select
                                onClick={(e) => {
                                  setAssignedProject(e.target.value);
                                }}
                                style={{ width: "70%" }}
                              >
                                <option value="none" selected disabled hidden>
                                  Select the Project
                                </option>

                                {projects &&
                                  projects.map((p) => (
                                    <option value={`${p._id}`}>
                                      {p.projectname}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <br />
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
                              style={{
                                backgroundColor: "#0F52BA",
                                color: "white",
                                fontWeight: "700",
                              }}
                              variant="primary"
                              onClick={() => {
                                try {
                                  console.log(
                                    "assigned project",
                                    assignedProject
                                  );

                                  if (assignedProject) {
                                    axios.put(
                                      `${originURL}/projects/assignproject/${assignedProject}`,
                                      {
                                        assignTo: propDetail._id,
                                      }
                                    );
                                    handleClose();
                                    setUpdate(!update);
                                    NotificationManager.success(
                                      "Project assigned to user"
                                    );
                                  } else {
                                    NotificationManager.error(
                                      "Please select the project"
                                    );
                                  }
                                } catch (err) {
                                  console.log(err);
                                }
                              }}
                            >
                              Assign Project
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
                          {stableSort(
                            assignedProjects,
                            getComparator(order, orderBy)
                          )
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((b, index) => {
                              const labelId = `enhanced-table-checkbox-${index}`;
                              return (
                                (b.projectname
                                  .toLowerCase()
                                  .includes(
                                    filteredRequestedProperties.toLowerCase()
                                  ) ||
                                  b.description
                                    .toLowerCase()
                                    .includes(
                                      filteredRequestedProperties.toLowerCase()
                                    ) ||
                                  b.description
                                    .toLowerCase()
                                    .includes(
                                      filteredRequestedProperties.toLowerCase()
                                    )) && (
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
                      count={assignedProjects.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header> Employee Timesheet</Accordion.Header>
                  <Accordion.Body>
                    <TableContainer>
                      <div className="d-flex ml-3 mt-3 mb-1">
                        <div
                          style={{
                            marginLeft: "0",
                            display: "flex",
                            paddingRight: "10px",
                          }}
                        >
                          <input
                            id="tableSearch"
                            onChange={(e) => {
                              console.log("projects", projects);
                              setFilteredRequestedProperties(e.target.value);
                            }}
                            className="form-control "
                            placeholder="Search"
                            style={{
                              width: "800px",
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
                        sx={{ minWidth: 750 }}
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
                          {stableSort(tasks, getComparator(order, orderBy))
                            .slice(
                              pageForTimesheet * rowsPerPageForTimesheet,
                              pageForTimesheet * rowsPerPageForTimesheet +
                                rowsPerPageForTimesheet
                            )
                            .map((b, index) => {
                              const labelId = `enhanced-table-checkbox-${index}`;
                              return (
                                (b.title
                                  .toLowerCase()
                                  .includes(
                                    filteredRequestedProperties.toLowerCase()
                                  ) ||
                                  b.description
                                    .toLowerCase()
                                    .includes(
                                      filteredRequestedProperties.toLowerCase()
                                    ) ||
                                  b.date
                                    .toLowerCase()
                                    .includes(
                                      filteredRequestedProperties.toLowerCase()
                                    )) && (
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
                    <TablePagination
                      rowsPerPageOptions={[25, 50, 100]}
                      component="div"
                      count={tasks.length}
                      rowsPerPage={rowsPerPageForTimesheet}
                      page={pageForTimesheet}
                      onPageChange={handleChangePageForTimesheet}
                      onRowsPerPageChange={handleChangeRowsPerPageForTimesheet}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Paper>
          </Box>
        </Container>
        <NotificationContainer />

        <br />
      </div>
    </>
  );
};

export default UserDetail;
