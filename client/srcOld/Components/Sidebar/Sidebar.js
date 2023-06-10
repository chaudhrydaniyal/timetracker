
import React from 'react';
// import '../../dist/css/adminlte.min.css'
import logo from '../../Assets/img/AdminLTELogo.png'
import { Link } from 'react-router-dom';
// import './Sidebar.css'

// import { Context } from "../../Context/Context"
// import { useRef, useContext } from "react";

const Sidebar = () => {




  return (
    <>
      {/* <!-- Main Sidebar Container --> */}
      <aside className="main-sidebar  elevation-4  " style={{ position: "fixed", color: "white",background:'#2a6592	' }}>
        {/* <!-- Brand Logo --> */}
        <Link to="/dashboard" className="brand-link mt-1" style={{textDecoration:"none"}}>
          <img src={logo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: .8 }} />
          <span style={{color:'white'}}>Timesheet</span>
        </Link>
        <hr></hr>
        {/* <!-- Sidebar --> */}
        <div className="sidebar">
          {/* <!-- Sidebar user (optional) --> */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              {/* <img src="" className="img-circle elevation-2" alt="User Image" /> */}
            </div>
            <div className="info">
              <Link to="/" className="d-block" style={{textDecoration:"none", color:"white"}}>Sagacious Systems</Link>
            </div>
          </div>

          {/* <!-- SidebarSearch Form --> */}
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw"></i>
                </button>
              </div>
            </div>
          </div>
          <br />
          <hr></hr>
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-2">

            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

              <li className="nav-item">
                <Link to={"/dashboard"} className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" style={{color:'white'}}></i>
                  <p style={{color:'white'}}>
                    Dashboard
                  </p>
                </Link>
              </li>

              <li className="nav-item">
                {/* <a  className="nav-link"> */}
                <Link to={"/dailytasks"} style={{ textDecoration: "none" }} className="nav-link">
                <i className="nav-icon fa-solid fa-tasks" style={{color:'white'}}></i>
                  
<p style={{color:'white'}}>
                    Daily Tasks
                  </p>

                  
                </Link>
                {/* </a> */}
              </li>

              <li className="nav-item">
                <Link to="/projects" className="nav-link">
                <i className=" nav-icon fa-solid fa-file" style={{color:'white'}}></i>
                <p style={{color:'white'}}>
                    Projects
                  </p>
                </Link>
              </li>
             


              {
              
              JSON.parse(localStorage.getItem("timesheet_user437")).isAdmin &&


                <li className="nav-item">
                  <Link to="/users" className="nav-link">
                    <i className="nav-icon " style={{color:'white'}}> <i class="fa-solid fa-user"></i></i>
                    &nbsp;&nbsp;<p style={{color:'white'}}>
                      Users
                    </p>
                  </Link>
                </li>

              }





              {
              
              JSON.parse(localStorage.getItem("timesheet_user437")).isAdmin &&


                <li className="nav-item">
                  <Link to="/assigntasks" className="nav-link">
                   <i className="nav-icon" style={{color:'white'}}><i class="fa-brands fa-squarespace"></i></i>
                   
                     {/* <i class="fa-solid fa-bars-progress white"></i> */}
                     &nbsp;&nbsp;<p style={{color:'white'}}>
                    Tasks I've assigned
                    </p>
                  </Link>
                </li>
              }




              <li className="nav-item">
                <Link to="/tasksassigned" className="nav-link">
                  <i className="nav-icon" style={{color:'white'}}><i class="fa-solid fa-clipboard"></i></i>
                  &nbsp;&nbsp;<p style={{color:'white'}}>
                    My Priorities
                  </p>
                </Link>
              </li>

              {
              
              JSON.parse(localStorage.getItem("timesheet_user437")).isAdmin &&
              <li className="nav-item">
                <Link to="/timesheet" className="nav-link">
                  <i className="nav-icon" style={{color:'white'}}><i class="fa-solid fa-database"></i></i>
                  &nbsp;&nbsp;<p style={{color:'white'}}>
                    Complete Timesheets
                  </p>
                </Link>
              </li>
}


           
            {
            JSON.parse(localStorage.getItem("timesheet_user437")).isAdmin &&
              <li className="nav-item">
                <Link to="/company" className="nav-link">
                  <i className="nav-icon " style={{color:'white'}}><i class="fa-solid fa-building"></i></i>
                  &nbsp;&nbsp;<p style={{color:'white'}}>
                    Companies
                  </p>
                </Link>
              </li>
}

</ul>

          </nav>
          {/* <!-- /.sidebar-menu --> */}
        </div>
        {/* <!-- /.sidebar --> */}
      </aside>
    </>
  )
}

export default Sidebar;