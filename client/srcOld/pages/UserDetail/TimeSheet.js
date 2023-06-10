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
import { AccordionDetails, Button } from "@mui/material";
import { DataGrid, gridColumnsSelector } from "@mui/x-data-grid";
import { Card } from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import ExportToExcel from "./ExportToExcel";

import Dropdown from "react-bootstrap/Dropdown";

import "./TimeSheet.css";
// import { ExportToExcel } from "./ExportToExcel";

var moment = require("moment"); // require

const TimeSheet = (props) => {
  const {
    _id,
    date,
    title,
    startTime,
    endTime,
    status,
    addedby,
    remarks,
  } = props;
  const item = useLocation();

  const [data, setData] = useState([]);
  const fileName = "Table-Data"; // here enter filename for your excel file

  // useEffect(() => {
  //   const fetchData = () =>{

  //     //  axios.get(`${originURL}/tasks/addtask`).then(r => (setData(r.data.get)(console.log("exceldata22",r.data.get ))))
  //     axios
  //     .get(
  //       `${originURL}/tasks/alltasks/${
  //         JSON.parse(localStorage.getItem("timesheet_user437")).details._id
  //       }`
  //     )
  //     .then((res) => {
  //       setData(res.data.get)
  //       console.log("exceldata22",res.data.get);
  //     });
  //   }
  //   fetchData()
  // }, [])

  const today = new Date("Mon Jan 16 2023 05:00:00 GMT+0500");
  // const numberOfDaysToAdd = 3;
  const currdate = today.setDate(today.getDate());
  const defaultValue = moment(new Date(today));

  const oldDate = new Date(
    "Sun Jan 15 2023 05:00:00 GMT+0500 (Pakistan Standard Time)"
  );
  const numberOfDaysToAdd = 1000;
  const oldate = oldDate.setDate(oldDate.getDate() - numberOfDaysToAdd);
  const oldValue = moment(new Date(oldDate));
  // const propDetail = item.state.item;

  console.log("userdetailpropdetail");

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
    5
  );
  const [projects, setProjects] = useState([]);
  const [assignedProject, setAssignedProject] = useState("");
  const [update, setUpdate] = useState(false);
  const [tasks, setTasks] = useState([]);

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");

  const [modelInput, setModelInput] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [minDate, setMinDate] = useState(oldValue);
  const [maxDate, setMaxDate] = useState(defaultValue);

  {
    console.log("oldValue", oldValue);
  }

  // const [editUsername, setEditUsername] = useState(propDetail.username);
  // const [editFullname, setEditfullname] = useState(propDetail.fullname);
  const [editPassword, setEditPassword] = useState("");
  // const [editRole, setEditRole] = useState(propDetail.role);

  useEffect(() => {
    axios
      .get(`${originURL}/tasks/alltaskscompany/${selectedCompany}`)
      .then((res) => {
        setTasks(res.data.tasks);
      });

    axios.get(`${originURL}/companies/`).then((res) => {
      setCompanies(res.data.companies);
    });
    document.title='TimeSheet'
  }, [update]);
  console.log("name", tasks);

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => {
    return setShow1(false), setModelInput("");
  };
  const handleShow1 = () => setShow1(true);
  const ModelRemarks = (event) => {
    setModelInput(event.target.value);
  };

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
    // {
    //   id: "selectProject",
    //   numeric: false,
    //   disablePadding: false,
    //   label: "Project",
    //   extended: true,
    // },
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
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Name",
      extended: false,
    },

    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "Status",
      extended: false,
    },
    {
      id: "remarks",
      numeric: false,
      disablePadding: false,
      label: "Remarks",
      extended: true,
    },
    {
      id: "delete",
      numeric: true,
      disablePadding: false,
      label: "Delete",
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
              width={headCell.extended === true ? "5%" : "5%"}
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

  const TableRowCustomForTimesheet = (props) => {
    const {
      _id,
      date,
      title,
      selectProject,
      startTime,
      endTime,
      status,
      addedby,
      remarks,
      Delete,
    } = props;

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
          {moment(new Date(date)).format("MM-DD-YYYY")}
        </TableCell>

        <TableCell align="left">{title}</TableCell>
        {/* <TableCell align="left">{selectProject}</TableCell> */}

        {/* <TableCell align="right">{ShortDescription}</TableCell> */}
        <TableCell align="left">{startTime}</TableCell>
        <TableCell align="right">{endTime}</TableCell>
        {/* <TableCell align="right">

                    {Type}

                </TableCell> */}

        <TableCell align="left">{addedby.username}</TableCell>
        <TableCell align="left">{status}</TableCell>
        <TableCell align="left">{remarks}</TableCell>

        <TableCell align="left">
          <Button
            onClick={() => {
              console.log("modelinput", modelInput);
              try {
                axios
                  .put(`${originURL}/tasks/addtask`, {
                    _id: _id,
                    remarks: "",
                  })
                  .then(() => setUpdate(!update));
              } catch (err) {
                console.log(err);
              }
              handleClose1();
            }}
            style={{
              backgroundColor: "transparent",
              color: "red",
              padding: "2px",
            }}
            title="Delete"
          >
            <i class="bi bi-trash"></i>
          </Button>
        </TableCell>
        {/* <TableCell align="left">{Status}</TableCell> */}

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
                setCurrentId(_id);
                handleShow1();
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
              backgroundColor: "#960018",
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
  // const RemarksDelete=()=>{
  //     <Button onClick={async ()=> {
  //         await axios.delete(`${originURL}/tasks/addtask${_id}`).then(() => {
  //             setUpdate(!update);
  //         });
  //     }} style={{ backgroundColor: "transparent", color: "red", padding: "2px" }}
  //         title="Delete"
  //       ><i class="bi bi-trash"></i></Button>

  // }
  // const { _id, date, title, startTime, endTime,status, addedby ,remarks} = props;
  const columnDefs = [
    // column definition configured to use a date filter
    {
      field: "date",
      filter: "agDateColumnFilter",
      // add extra parameters for the date filter
      filterParams: {
        // provide comparator function
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          const dateAsString = cellValue;

          if (dateAsString == null) {
            return 0;
          }

          // In the example application, dates are stored as dd/mm/yyyy
          // We create a Date object for comparison against the filter date
          const dateParts = dateAsString.split("/");
          const year = Number(dateParts[2]);
          const month = Number(dateParts[1]) - 1;
          const day = Number(dateParts[0]);
          const cellDate = new Date(year, month, day);

          // Now that both parameters are Date objects, we can compare
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
          return 0;
        },
      },
    },
  ];
  // const newDate = new Date(minDate,maxDate) ;

  // const timestamp = newDate.getTime()

  const timestamp = (strDate) => {
    const dt = Date.parse(strDate);
    return dt / 1000;
  };

  // const max = Date.parse('2023-01-14');

  return (
    <div
      className="content-wrapper"
      style={{ backgroundColor: "#f7f7f7", paddingTop: "50px", height: "90%" }}
    >
      <Container
        style={{ marginTop: "50px", marginBottom: "80px", height: "90%" }}
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
            <TableContainer>
            
              <div className="d-flex ml-3 mt-3 mb-1">
                <h3
                  className="mr-3"
                  // style={{ marginTop: "0px", marginBottom: "0px" }}
                  data-name="View Employee Timesheet"
                >
                  Timesheet
                </h3>

                <select style={{height:"40px",marginLeft:'5%',width:'30%'}}
                  onClick={(e) => {
                    console.log("dropdown", e.target.value);

                    setSelectedCompany(e.target.value);

                    console.log("selected comapany", selectedCompany);

                    setUpdate(!update);
                  }}
                >
                  {companies.map((c) => (
                    <option value={c._id}>{c.companyName}</option>
                  ))}
                </select>

                <div style={{ display:"flex", height:"40px",marginLeft:'5%'}}>
                  <label style={{ marginTop:"6px"}}>From:&nbsp;&nbsp;</label>
                  <input
                    id="date"
                    type="date"
                    style={{ width: "200%" }}
                    defaultValue={moment(new Date(minDate)).format(
                      "YYYY-MM-DD"
                    )}
                    // defaultValue={oldValue}
                    onChange={(e) => {
                      setMinDate(new Date(e.target.value));
                    }}
                  />
                  {console.log("setMinDate", minDate)}
                </div>
                <div style={{ display:"flex", height:"40px", marginLeft:'5%' }}>
                  <label style={{ marginTop:"6px"}}>To:&nbsp;&nbsp;</label>
                  <input
                    id="date"
                    type="date"
                    style={{ width: "200%" }}
                    defaultValue={moment(new Date(maxDate)).format(
                      "YYYY-MM-DD"
                    )}
                    // defaultValue={defaultValue}
                    onChange={(e) => {
                      setMaxDate(new Date(e.target.value));
                    }}
                  />
                  {console.log("setMinDate", maxDate)}
                </div>

                <div
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    marginTop: "0px",
                    paddingRight: "10px",
                  }}
                >
                   
                <ExportToExcel
                  apiData={
                    tasks &&
                    tasks
                      .filter(
                        //  task => (true)

                        (task) =>
                          timestamp(task.date) * 1000 >= minDate &&
                          timestamp(task.date) * 1000 - 86400000 <= maxDate &&
                          (task.title
                            .toLowerCase()
                            .includes(
                              filteredRequestedProperties.toLowerCase()
                            ) ||
                            task.addedby.username
                              .toLowerCase()
                              .includes(
                                filteredRequestedProperties.toLowerCase()
                              ))
                      )
                      .map((b, index) => {
                        return {
                          Date: b.date,
                          Tasks: b.title,
                          // Project:b.projectname,
                          Description: b.description,
                          Start_Time: b.startTime,
                          End_Time: b.endTime,
                          Name: b.addedby.username,
                          Status: b.status,
                          Remarks: b.remarks,
                        };
                      })
                  }
                  fileName={fileName}
                />
                {/* {console.log('exceldata',tasks
                                          .filter(
                                            //  task => (true)
                      
                                            (task) =>
                                              timestamp(task.date) * 1000 >= minDate &&
                                              ((timestamp(task.date) * 1000)-86400000)  <= maxDate) .map((b, index) => {
                    if( (b.title
                      .toLowerCase()
                      .includes(filteredRequestedProperties.toLowerCase()) ||
                      b.addedby.username.toLowerCase().includes(
                          filteredRequestedProperties.toLowerCase())
                                                )){return b}}) )} */}
          
                 
                </div>
              

                <br />
            
              </div>
              <div style={{ display:'flex',
                      justifyContent:'center',marginTop:'2%'}}>
              <input
                    id="tableSearch"
                    onChange={(e) => {
                      console.log("projects", projects);
                      setFilteredRequestedProperties(e.target.value);
                    }}
                    className="form-control "
                    placeholder="Search"
                    style={{
                      width: "700px",
                      border: "none",
                      backgroundColor: "#f0f0f0",
                      marginRight: "30px",
                     
                      // marginTop: "1.5rem",
                    }}
                  ></input>
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
                  {stableSort(
                    tasks
                      ? tasks.filter(
                          //  task => (true)

                          (task) =>
                            timestamp(task.date) * 1000 >= minDate &&
                            timestamp(task.date) * 1000 - 86400000 <= maxDate
                        )
                      : [],
                    getComparator(order, orderBy)
                  )
                    // .slice(pageForTimesheet * rowsPerPageForTimesheet, pageForTimesheet * rowsPerPageForTimesheet + rowsPerPageForTimesheet)
                    .map((b, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      // console.log("search date",searchDate)
                      return (
                        (b.title
                          .toLowerCase()
                          .includes(
                            filteredRequestedProperties.toLowerCase()
                          ) ||
                          b.addedby.username
                            .toLowerCase()
                            .includes(
                              filteredRequestedProperties.toLowerCase()
                            )) && (
                          // ||

                          // b.date
                          // .toLowerCase()
                          // .includes(filteredRequestedProperties.toLowerCase())
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
                  {/* 
                  {tasks
                    .filter(
                      //  task => (true)

                      (task) =>
                        timestamp(task.date) * 1000 >= minDate &&
                        ((timestamp(task.date) * 1000)-86400000)  <= maxDate
                    )
                    .map((b, index) => {
                      {
                        console.log("timestamp", timestamp(b.date));
                      }
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRowCustomForTimesheet
                          key={`transaction-${b._id}`}
                          {...b}
                          labelId={labelId}
                          index={index}
                          rowsPerPage={rowsPerPageForTimesheet}
                          page={pageForTimesheet}
                        />
                      );
                      // );
                    })} 
                     */}

                  {console.log("task", tasks)}

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
            <Modal
              show={show1}
              onHide={handleClose1}
              style={{ marginTop: "20%" }}
            >
              <Modal.Header closeButton style={{ backgroundColor: "	#ececec" }}>
                <Modal.Title>Remarks</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ backgroundColor: "	#ececec" }}>
                <label>Enter Remarks:</label>
                <input
                  type="text"
                  required
                  style={{
                    width: "90%",
                    borderRadius: "4px",
                    border: "1px",
                    borderColor: "grey",
                  }}
                  value={modelInput}
                  onChange={(event) => {
                    setModelInput(event.target.value);
                  }}
                />
              </Modal.Body>
              <Modal.Footer style={{ backgroundColor: "	#ececec" }}>
                <Button
                  variant="secondary"
                  onClick={handleClose1}
                  style={{
                    backgroundColor: "grey",
                    color: "white",
                    borderRadius: "4px",
                    marginRight: "2%",
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    console.log("modelinput", modelInput);
                    try {
                      axios
                        .put(`${originURL}/tasks/addtask`, {
                          _id: currentId,
                          remarks: modelInput,
                        })
                        .then(() => setUpdate(!update));
                    } catch (err) {
                      console.log(err);
                    }
                    handleClose1();
                  }}
                  style={{
                    backgroundColor: "#0F52BA",
                    color: "white",
                    borderRadius: "4px",
                  }}
                >
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
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

export default TimeSheet;
