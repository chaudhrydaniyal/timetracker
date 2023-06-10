import React, { Component } from 'react'
// import "datatables.net"
// import "datatables.net-dt"
// import"datatables.net-responsive-bs4"
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "datatables.net-dt/js/dataTables.dataTables"
// import "datatables.net-dt/css/jquery.dataTables.min.css"

import $ from 'jquery'

import { tablerow } from './tabledata'


export default class Table extends Component {
 
  render() {
   
    // $(document).ready(function () {
    //   $('#table_id').DataTable();
    // });

    return (
      <div>
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>DataTables</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ol>
                </div>
              </div>
            </div>{/* /.container-fluid */}
          </section>
          {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header  " style={{backgroundColor:"#ff9b44"}}>
                      <h3 className="card-title" style={{color:"white"}}>Employees Attendance</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                      <div className='table-responsive'>
                        <table id="table_id" className="table table-bordered table-hover responsive">
                          <thead>
                            <tr>
                              <td>Emp id</td>
                              <td>Employee</td>
                              <td>Status</td>
                              <td>Attendance</td>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              tablerow.map((n) => {
                                return (<>
                                  <tr key={n.id}>
                                    <td>{n.id}</td>
                                    <td>{n.name}</td>
                                    <td>{n.status ? <i class="fa-solid fa-check" style={{ color: "greenYellow" }}></i> : <i class="fa-solid fa-xmark" style={{ color: "orangered" }}></i>}</td>
                                    <td>{n.Attendance}</td>
                                  </tr>
                                </>)
                              })
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div></section></div>
      </div>
    )
  }
}
