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
import { useLocation, useParams } from "react-router-dom";
import { visuallyHidden } from "@mui/utils";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import originURL from "../../url";
import { Button } from "@mui/material";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { useLocation } from "react-router-dom";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const url = "companies/";
  const url1 = "/departments/";

  const [
    filteredRequestedProperties,
    setFilteredRequestedProperties,
  ] = useState("");
  // var items = useLocation();
  // console.log("item", items);
  // var companyData = items.state.companies;
  // var setUpdateParent = item.state.upDateParent
  {
    // console.log("companyData", companyData);
  }
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [companyDetails, setCompanyDetails] = useState("");
  const [selectDepartment, setSelectDepartment] = useState("");
  const [departments, setDepartments] = useState("");
  const [designation, setDesignation] = useState("");
  const [update, setUpdate] = useState(false);
  const [show, setShow] = useState(false);
  // const [data, setData] = useState({
  //   _id: url.data.companies._id,

  // });

  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const handlePasswordChange =(evnt)=>{
      setPasswordInput(evnt.target.value);
  }
  const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const item = useLocation();
 
  const propDetail = item.state || {};

  useEffect(() => {
    axios
      .get(
        `${originURL}/users/allusers/`
      )
      .then((res) => {
        setUsers(res.data.users);
      });
    axios.get(`${originURL}/${url}`).then((res) => {
      setCompanyDetails(res.data.companies);
    });
    // axios.get(`${originURL}${url1}`).then((res) => {
    //   setDepartments(res.data.department);
    // });
    document.title='Users'
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
  const getDepartments = async (_id) => {


    try {
      const department = await axios.get(`${originURL}${url1}${_id}`);
      const res = department.data.departments;

      console.log("res",department)

      setDepartments(res);
    } catch (error) {
      console.log(error);
    }
  };

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const headCells = [
    {
      id: "index",
      numeric: false,
      disablePadding: false,
      label: "No.",
    },
    {
      id: "fullname",
      numeric: false,
      disablePadding: false,
      label: "Full Name",
      extended: true,
    },
    {
      id: "username",
      numeric: false,
      disablePadding: false,
      label: "Username",
      extended: true,
    },
    {
      id: "role",
      numeric: false,
      disablePadding: false,
      label: "Role",
      extended: true,
    },
    {
      id: "designation",
      numeric: false,
      disablePadding: false,
      label: "Designation",
      extended: true,
    },
    {
      id: "companies",
      numeric: false,
      disablePadding: false,
      label: "Company",
      extended: true,
    },
    {
      id: "departments",
      numeric: false,
      disablePadding: false,
      label: "Department",
      extended: true,
    },
    {
      id: "actions",
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
      <TableHead style={{}}>
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
                style={{ fontWeight: "700" }}
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const TableRowCustom = (props) => {
    const { _id, username, password, updatedAt, role, fullname,companyName,departments,companies,name,designation } = props;

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

        <TableCell align="left">{username}</TableCell>
        <TableCell align="left"> {role}</TableCell>
        <TableCell align="left"> {designation && designation}</TableCell>
        <TableCell align="left">{companies && companies.companyName}</TableCell>
        <TableCell align="left">{departments && departments.name}</TableCell>
        {/* <TableCell align="right">{ShortDescription}</TableCell> */}
        
        {/* <TableCell align="left">{updatedAt.slice(0, 25)}</TableCell> */}
        <TableCell align="right">
          <Link
            to="/users/userdetail"
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
  
      <div
        className="content-wrapper"
        style={{
          backgroundColor: "#f7f7f7",
          height: "90vh",
          paddingTop: "50px",
        }}
      >
        <Container style={{ marginTop: "50px", marginBottom: "50px" }}>
          <Box >
            <Paper   sx={{ width: "100%", mb: 2 }}>
              <TableContainer style={{padding:"0px"}} >
                <div className="d-flex pt-3 pl-3 pr-3" style={{, borderTopLeftRadius:"5px",  borderTopRightRadius:"5px"  }}>
                  <h3
                    className="mr-5"
                    style={{ marginTop: "0px", marginBottom: "0px" }}
                  >
                    Users
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
                       <span> Add User <i class="fa-solid fa-desktop-arrow-down fa-fade"> <i class="fa-solid fa-user-plus"></i></i></span>
                      </Button>{" "}
                    </div>
                  )}
                    

                  <br />
                  <Modal
                    style={{ marginTop: "3vh" }}
                    show={show}
                    onHide={handleClose}
                    animation={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>&nbsp;&nbsp;&nbsp;Add User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Container>
                        <div>
                          <div>
                            <Row>
                              <Col>
                                <label>Full name:</label>
                                <br></br>
                                <input
                                  placeholder="full name..."
                                  // style={{ width: "100%" }}
                                  onChange={(e) => setFullname(e.target.value)}
                                ></input>
                              </Col>
                              <Col>
                                <label>Username:</label>
                                <br></br>
                                <input
                                  placeholder="username..."
                                  // style={{ width: "100%" }}
                                  onChange={(e) => setUsername(e.target.value)}
                                ></input>
                              </Col>
                            </Row>
                            <Row style={{marginTop:'1%'}}>
                              <Col>
                                {/* <label>Password:</label>
                                <br></br>
                                <input
                                type="password"
                                  placeholder="password..."
                                  // style={{ width: "100%" }}
                                  onChange={(e) => setPassword(e.target.value)}
                                ></input> */}
                                 <div className="row">
                                  <label>Password:</label>
            <div style={{display:'flex'}}>
             
                    <input type={passwordType} onChange={(e)=>setPassword(e.target.value)}  name="password" class="form-control" placeholder="password..." style={{width:'100%'}}/>
         
                     <button onClick={togglePassword} style={{border:'none'}}>
                     { passwordType==="password"? <i className="bi bi-eye-slash"></i> :<i className="bi bi-eye"></i> }
                     </button>
          
                
            </div>
      </div>
                              </Col>

                              <Col>
                                <label>Select Company:</label>
                                <br></br>

                                <select
                                  onChange={(e) => {
                                    setCompany(e.target.value);
                                    getDepartments(e.target.value)
                                    setUpdate(!update);


                                    console.log("departments", departments)
                                  }}
                                 
                                >
                                  <option value="none" selected disabled hidden>
                                    Select  Company...
                                  </option>
                                  
                                  {companyDetails &&
                                    companyDetails.map((d) => (
                                      <option value={`${d._id}`}                                  
                                       

                                        
                                      >
                                        {d.companyName}
                                        
                                      </option>
                                    
                                    ))}
                                </select>
                              </Col>
                            </Row>
                            <Row style={{marginTop:'1%'}}>
                              <Col>
                                <label>Select Department:</label>
                                <br></br>

                                <select
                                  onClick={(e) => {
                                    setSelectDepartment(e.target.value);
                                    setUpdate(!update);
                                  }}
                              
                                >
                                  <option value="none" selected disabled hidden>
                                    Select Department... 
                                  </option>

                                  {departments &&
                                    departments.map((d) => (
                                      <option value={`${d._id}`}>
                                        {d.name}
                                      </option>
                                    ))}
                                </select>
                              </Col>
                              <Col>
                                <label>Designation:</label>
                                <br></br>
                               {/* <select onChange={(e)=>setDesignation(e.target.value)} >
                               <option value="none" selected disabled hidden>
                                    Select Designation
                                  </option>
                               <option>
                                <span>HOD</span>
                               </option>
                               <option>
                                <span>Sr.software engineer</span>
                               </option>
                               <option>
                                <span>Jr.software engineer</span>
                               </option>
                               <option>
                                <span>IT</span>
                               </option>
                               <option>
                                <span>Internee</span>
                               </option>
                               
                              
                               </select> */}
                               <input value={designation} type="test" onChange={(e)=>setDesignation(e.target.value)} placeholder="designation.."/>
                              </Col>
                            </Row>
                            <Row>
                            <Col>
                                <label>Role:</label>
                                <br></br>
                               <select onChange={(e)=>setRole(e.target.value)} >
                               <option value="none" selected disabled hidden>
                                    Select Role
                                  </option>
                               <option>
                                <span>Team Lead</span>
                               </option>
                               <option>
                                <span>Employee</span>
                               </option>
                             
                              
                               </select>
                              
                              </Col>
                            </Row>
                          </div>
                        </div>
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
                        style={{
                          backgroundColor: "#0F52BA",
                          color: "white",
                          fontWeight: "700",
                        }}
                        variant="primary"
                        onClick={async () => {
                          try {
                            const addedUser = await axios.post(
                              `${originURL}/auth/register`,
                              {
                                username: username,
                                fullname: fullname,
                                password: password,
                                designation: designation,
                                role: role,
                                // companyName:company,
                                companies:company,
                                departments:selectDepartment,
                               

                                isAdmin: false,
                              }
                              );
                              {console.log("addeduser",addedUser)}

                            axios.put(
                              `${originURL}/users/addTeamMembers/${
                                JSON.parse(
                                  localStorage.getItem("timesheet_user437")
                                ).details._id
                              }`,
                              {
                                id: addedUser.data.newUser._id,
                              }
                            );

                            handleClose();
                            setUpdate(!update);
                          } catch (err) {
                            console.log(err);
                          }
                          setUsername("")
                          setPassword("")
                          setDesignation("")
                        }}
                      >
                        Add User
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
                    {stableSort(users, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((b, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          (b.username
                            .toLowerCase()
                            .includes(
                              filteredRequestedProperties.toLowerCase()
                            ) 
                          
                            )  && (
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
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </Container>
      </div>
   
  );
};

export default Users;
