
import React from 'react';
// import '../../dist/css/adminlte.min.css'
import logo from '../../Assets/img/AdminLTELogo.png'
import { Link } from 'react-router-dom';


// import { Context } from "../../Context/Context"
// import { useRef, useContext } from "react";

const Sidebar = () => {




  return (
    <>
      {/* <!-- Main Sidebar Container --> */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4  " style={{ position: "fixed", color: "white" }}>
        {/* <!-- Brand Logo --> */}
        <Link to="/dashboard" className="brand-link mt-1">
          <img src={logo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: .8 }} />
          <span className="brand-text font-weight-light">Timesheet</span>
        </Link>
        {/* <!-- Sidebar --> */}
        <div className="sidebar">
          {/* <!-- Sidebar user (optional) --> */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              {/* <img src="" className="img-circle elevation-2" alt="User Image" /> */}
            </div>
            <div className="info">
              <Link to="/" className="d-block">Sagacious Systems</Link>
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
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-2">

            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

              <li className="nav-item">
                <Link to={"/dashboard"} className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Dashboard
                  </p>
                </Link>
              </li>

              <li className="nav-item">
                {/* <a  className="nav-link"> */}
                <Link to={"/dailytasks"} style={{ textDecoration: "none" }} className="nav-link">
                  <i className="nav-icon fa-solid fa-tasks"></i>
                  <p>
                    Daily Tasks
                  </p>
                </Link>
                {/* </a> */}
              </li>

              <li className="nav-item">
                <Link to="/projects" className="nav-link">
                  <i className=" nav-icon fa-solid fa-file"></i>
                  <p>
                    Projects
                  </p>
                </Link>
              </li>


              {
              
              JSON.parse(localStorage.getItem("timesheet_user437")).isAdmin &&


                <li className="nav-item">
                  <Link to="/users" className="nav-link">
                    <i className="nav-icon  fa-solid fa-user"></i>
                    <p>
                      Users
                    </p>
                  </Link>
                </li>

              }





              {
              
              JSON.parse(localStorage.getItem("timesheet_user437")).isAdmin &&


                <li className="nav-item">
                  <Link to="/assigntasks" className="nav-link">
                    <i className="nav-icon  fa-solid fa-user"></i>
                    <p>
                      Task Assignment
                    </p>
                  </Link>
                </li>
              }




              <li className="nav-item">
                <Link to="/tasksassigned" className="nav-link">
                  <i className="nav-icon  fa-solid fa-user"></i>
                  <p>
                    Assigned Tasks
                  </p>
                </Link>
              </li>

              {
              
              JSON.parse(localStorage.getItem("timesheet_user437")).isAdmin &&
              <li className="nav-item">
                <Link to="/timesheet" className="nav-link">
                  <i className="nav-icon  fa-solid fa-user"></i>
                  <p>
                    TimeSheet
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