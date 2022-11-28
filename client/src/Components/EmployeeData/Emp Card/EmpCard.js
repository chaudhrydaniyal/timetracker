import React from 'react'
import { Button, Card } from 'react-bootstrap';
import pp from '../All Employees/avatar.png'
import avatar from "../../../Assets/DataTables img/2.jpg"
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link,useLocation } from 'react-router-dom';
import axios from 'axios';


const EmpCard = ({ data }) => {
  
    const PP = "http://192.168.5.24:5000/images/";
  
  





   //more option button code
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const applyImgStyle = {
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    marginTop: "2px",

  }
  const cardImg = {
    display: "flex",
    justifyContent: "center",

  }
  const cardDetail = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
  

  return (
    // {PP+d.profile.pic}{
 

    <>



      <Card>


      <div style={{display:"flex",justifyContent:"end"}}><IconButton aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick} style={{color:"black"}}>
             <MoreVertIcon />
        </IconButton></div>

       
        <Menu
          id="long-button"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose}>Edit</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
         
        </Menu>
          {/* <MoreVertIcon style={{ marginLeft: "auto", marginTop: "5px" }} /> */}
          <div style={cardImg}>
          {/* //         {/* PP+d.profilepic */}
          {data.profilepic ? <Card.Img variant="top" src={PP + data.profilepic} style={applyImgStyle} /> : <Card.Img variant='top' src={pp} style={applyImgStyle} />}
        </div>

        <Card.Body>
          <div style={cardDetail}>
            {/* {data.firstname} */}
            <div><h4>{data.firstname}</h4></div>
            {/* {d.designation} */}
            <div className='small text-muted'>{data.designation}</div>
            <div>
              <Link to={`/employee/${data._id}`}><button style={{ border: "none", borderRadius: "5px", backgroundColor: "#ff9b44", color: "#fff", marginTop: "5px" }}>See Details</button></Link>
            </div>
          </div>

        </Card.Body>
     
       
      </Card>





    </>
  )
}

export default EmpCard;