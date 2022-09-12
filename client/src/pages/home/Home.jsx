import React from "react"
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
import "./home.css";
import Widget from "./../../Components/widget/Widget";
import RangeBarChart from "../../Components/chart/Chart";
import RangeBarChartAdvanced from "../../Components/chart2/Chart2";
// import Featured from "../../components/featured/Featured";
// import Chart from "../../components/chart/Chart";
// import Table from "../../components/table/Table";


const Dashboard = () => {
  return (
    <div
      className="content-wrapper"
      style={{ backgroundColor: "#f7f7f7", paddingTop: "50px", paddingLeft: "30px", paddingRight: "30px" }}
    >
      {/* <Sidebar /> */}
      <div className="homeContainer">
        {/* <Navbar /> */}
        <div className="widgets d-flex">
          <Widget type="user"/>
          <Widget type="project" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <br />
        <br />

        <div className="charts" style={{ backgroundColor: "white", borderRadius: "10px", paddingTop: "20px" }}>
          {/* <Featured /> */}
          {/* <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} /> */}

          <div className="d-flex justify-content-center">

            <h4 style={{ color: "#a0a0a0", fontWeight: "600" }}>Projects Timeline</h4>

          </div>
          <RangeBarChart></RangeBarChart>


        </div>

        <br />
        <br />

        <div className="charts" style={{ backgroundColor: "white", borderRadius: "10px", paddingTop: "20px" }}>
          {/* <Featured /> */}
          {/* <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} /> */}
          <div className="d-flex justify-content-center">

            <h4 style={{ color: "#a0a0a0", fontWeight: "600" }}>Summary</h4>

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
