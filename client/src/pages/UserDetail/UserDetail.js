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


// import { Dropdown, ButtonGroup, Button } from "@themesberg/react-bootstrap";

// import { Card } from "@themesberg/react-bootstrap";

import { useEffect, useState } from "react";

import axios from "axios";
import { Container } from "react-bootstrap";
import originURL from "../../url";
import { Button } from "@mui/material";

const UserDetail = () => {

    const item = useLocation();

    console.log("testvalue", item);
  
    const propDetail = item.state.item;
  
    const [coordinates, setCoordinates] = useState([])

    return (
        <>

            <div className='content-wrapper' style={{ backgroundColor: '#f7f7f7' , paddingTop:"50px"  }}>

                <Container style={{ marginTop: "20px", marginBottom: "50px" }}>

                    <Box sx={{ width: "95%" }}>
                        <Paper className="p-4" sx={{ width: "100%", mb: 2 }}>
                       {JSON.stringify(propDetail)}

                        </Paper>
                    </Box>
                </Container>
            </div>
        </>
    );
};

export default UserDetail