
import React from 'react';
// import '../../dist/css/adminlte.min.css'
import logo from '../../Assets/img/AdminLTELogo.png'
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
      {/* <!-- Main Sidebar Container --> */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4  " style={{position:"fixed"}}>
        {/* <!-- Brand Logo --> */}
        <Link to="/" className="brand-link">
          <img src={logo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: .8 }} />
          <span className="brand-text font-weight-light">Attendance System</span>
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
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* <!-- Add icons to the links using the .nav-icon className
               with font-awesome or any other icon font library --> */}
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Dashboard
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/allemployees" className="nav-link">
                  <i className="nav-icon fa-solid fa-user"></i>
                 
                    <p>
                      Employees
                    </p>
                  </Link>
                
              </li>
              <li className="nav-item">
                {/* <a  className="nav-link"> */}
                <Link to={"attendance"} style={{textDecoration:"none"}} className="nav-link">
                <i className="nav-icon fa-solid fa-user"></i>
                  
                
                  <p>
                    Employee Attendance
                  </p>
                 
                   
                  </Link>
                {/* </a> */}
                
              </li>
              <li className="nav-item">
                <Link to="/leaves" className="nav-link">
                  <i className="nav-icon fa-solid fa-user"></i>
                 
                    <p>
                      Employee Leaves
                    </p>
                  </Link>
                
              </li>
              <li className="nav-item">
                <Link to="/calendar" className="nav-link">
                <i className=" nav-icon fa-solid fa-calendar-days"></i>
                 
                    <p>
                     Calandar
                    </p>
                  </Link>
                
              </li>
              <li className="nav-item">
                <Link to="/holidays" className="nav-link">
                  <i className="nav-icon  fa-solid fa-user"></i>
                 
                    <p>
                      Holidays
                    </p>
                  </Link>
                
              </li>
              <li className="nav-item">
                <Link to="/datamanagement" className="nav-link">
                  <i className="nav-icon  fa-solid fa-user"></i>
                 
                    <p>
                      Data Management
                    </p>
                  </Link>
                
              </li>
              
              
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