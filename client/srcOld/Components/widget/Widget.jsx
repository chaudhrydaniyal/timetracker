import React , { Component, useEffect, useState}  from 'react';

import "./widget.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from 'react-router-dom';
import axios from "axios";
import originURL from "../../url";


const Widget = ({ type }) => {

  const [projects,setProjects] = useState([])
  const [users,setUsers] = useState([])
  const [assignedTasks,setAssignedTasks] = useState([])



  useEffect(() => {
    axios.get(`${originURL}/projects/allprojects/${JSON.parse(localStorage.getItem("timesheet_user437")).details._id}`).then((res) => {

      setProjects(res.data.get);

    })

  //   axios.get(`${originURL}/users/allusers`).then((res) => {
  //     setUsers(res.data.users);
  // });

  axios.get(`${originURL}/users/teamMembers/${JSON.parse(localStorage.getItem("timesheet_user437")).details._id}`).then((res) => {
    setUsers(res.data.users);
});


  axios.get(`${originURL}/assigntask/${JSON.parse(localStorage.getItem("timesheet_user437")).details._id}`).then((res) => {
    setAssignedTasks(res.data.task);
});

  }, [])


  let data;

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        linkURL:"/users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "project":
      data = {
        title: "PROJECTS",
        isMoney: false,
        link: "View all projects",
        linkURL:"/projects",

        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "ASSIGNED TASKS",
        isMoney: false,
        link: "View assigned tasks",
        linkURL:"/tasksassigned",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget" style={{backgroundColor:"white", marginRight:"5px"}}>
      <div className="left">
        <span className="title" style={{ color:"#354A54"}}>{data.title}</span>
        <span className="counter">
          {data.title=='USERS' && users.length}
          {data.title=='PROJECTS' && projects.length}

          {data.title=='ASSIGNED TASKS' && assignedTasks.length}

        

          {data.isMoney && `$${amount}`}

        </span>
        <Link to={`${data.linkURL}`} style={{textDecoration:"none", color:"black"}}>
        <span className="link">{data.link}</span>
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
