import React, { useEffect, useState } from "react"
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
import "./home.css";
import Widget from "./../../Components/widget/Widget";
import RangeBarChart from "../../Components/chart/Chart";
import RangeBarChartAdvanced from "../../Components/chart2/Chart2";
// import Featured from "../../components/featured/Featured";
// import Chart from "../../components/chart/Chart";
// import Table from "../../components/table/Table";
import { formatDistanceToNow, subHours } from 'date-fns';
import { v4 as uuid } from 'uuid';
import originURL from "../../url";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import { Link } from "react-router-dom";
// import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";
// import { Doughnut } from 'react-chartjs-2';
import { CardContent, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import ApexPieChart from "../../Components/chart3/Chart3";
const Dashboard = (props) => {
  const [projects, setProjects] = useState([]);
  const [showMenu, setShowMenu] = useState(false)
  const [show, setShow] = useState(false);
  const [file, setfile] = useState();

  const handleCloseModal = () => setShow(false);
  const handleShow = () => {
    handleClose();
    setShow(true);
  };
  const handleShowMenu = () => {
    setShowMenu(true)
  }
  const handleHideMenu = () => {
    setShowMenu(false)
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
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
    document.title = 'Dashboard'

  }, []);

  const products = [
    {
      id: uuid(),
      name: 'Dropbox',
      imageUrl: '/static/images/products/product_1.png',
      updatedAt: subHours(Date.now(), 2)
    },
    {
      id: uuid(),
      name: 'Medium Corporation',
      imageUrl: '/static/images/products/product_2.png',
      updatedAt: subHours(Date.now(), 2)
    },
    {
      id: uuid(),
      name: 'Slack',
      imageUrl: '/static/images/products/product_3.png',
      updatedAt: subHours(Date.now(), 3)
    },
    {
      id: uuid(),
      name: 'Lyft',
      imageUrl: '/static/images/products/product_4.png',
      updatedAt: subHours(Date.now(), 5)
    },
    {
      id: uuid(),
      name: 'GitHub',
      imageUrl: '/static/images/products/product_5.png',
      updatedAt: subHours(Date.now(), 9)
    }
  ];
  return (
    <div
      className="content-wrapper"
      style={{ backgroundColor: "#f7f7f7", paddingTop: "50px", paddingLeft: "30px", paddingRight: "30px" }}
    >
      {/* <Sidebar /> */}
      <div className="homeContainer">
        {/* <Navbar /> */}
        <div className="widgets d-flex" style={{ marginTop: '2%' }}>
          <Widget type="user" />
          <Widget type="project" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <br />




<div style={{display:"flex", height:"430px"}}>



        <Card {...props} style={{ marginBottom: '30px', width: '50%', marginRight:"10px" }}>
          <CardHeader
            subtitle={`${projects.length} in total`}
            style={{ , color: '#354A54', fontWeight: 'bolder' }}
            title="Latest Projects"
          />
          <Divider />



          <List>
            {projects.slice(0, 5).map((projects, i) => (
              <ListItem
              style={{paddingBottom:"0px", paddingTop:"0px"}}
                divider={i < projects.length - 1}
                key={projects._id}
              >

                <Divider />
                {/* <ListItemAvatar>
            <img
              alt={projects.projectname}
              // src={product.imageUrl}
              style={{
                height: 48,
                width: 48
              }}
            />
          </ListItemAvatar> */}
                <ListItemText
                  primary={projects.projectname}
                // secondary={`Updated ${formatDistanceToNow(projects.updatedAt)}`}
                />
                {/* <hr></hr> */}
                <IconButton
                  edge="end"
                  size="small"
                >
                  {/* <MoreVertIcon>
      
            
       <h5 value={showMenu}></h5>
            </MoreVertIcon> */}
                  {/* <Button onClick={handleShowMenu} defaultValue={showMenu}>
            <i class="fa-solid fa-ellipsis-vertical" >

            </i>
            <menuitem defaultValue={showMenu}>Details</menuitem>
            </Button> */}
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                      style={{ color: "black" }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </div>

                  <Menu
                    id="long-button"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={handleShow}><Link to="/projects/projectdetail">Edit</Link></MenuItem>
                    <MenuItem
                      onClick={() => {
                        // handledelete();
                        // setUpdate(true);
                      }}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                </IconButton>
              </ListItem>
            ))}
          </List>

          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          >
            <Link to='/projects' style={{ textDecoration: 'none' }}>
              <Button
                color="primary"
                endIcon={<ArrowRightIcon />}
                size="small"
                variant="text"

              >

                View all
              </Button>
            </Link>
          </Box>
        </Card>



        <Card {...props} style={{ marginBottom: '30px', height: '400px', width: '50%' }}>
          <CardHeader
            subtitle={`${projects.length} in total`}
            style={{ , color: '#354A54', fontWeight: 'bolder' }}
            title="Tasks by completion status"
          />
          <Divider />

          <div style ={{display:"flex", justifyContent:"center"}}>
        

          <div style={{width:"70%"}}>

          <ApexPieChart></ApexPieChart>

          </div>
          </div>
          {/* <Divider /> */}

        </Card>
      


        </div>




        <div className="charts" style={{ backgroundColor: "white", borderRadius: "10px", paddingTop: "20px" }}>
          {/* <Featured /> */}
          {/* <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} /> */}

          <div className="d-flex justify-content-center">

            <h4 style={{ color: "#354A54", fontWeight: "bolder", }}>Projects Timeline</h4>

          </div>
          <RangeBarChart></RangeBarChart>


        </div>

        <br />


        <div className="charts" style={{ backgroundColor: "white", borderRadius: "10px", paddingTop: "20px" }}>
          {/* <Featured /> */}
          {/* <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} /> */}
          <div className="d-flex justify-content-center">

            <h4 style={{ color: "#354A54", fontWeight: "bolder" }}>Summary</h4>

          </div>
          <RangeBarChartAdvanced></RangeBarChartAdvanced>

        </div>
        <br />
        <br />
        <br />
        <br />




      </div>
    </div>
  );
};

export default Dashboard;
