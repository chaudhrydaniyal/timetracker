import React from "react"
import Sidebar from './Components/Sidebar/Sidebar'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeLeaves from './Components/Pages/EmpLeaves/EmployeeLeaves'
import EmpAttendance from './Components/Pages/EmpAttendance/EmpAttendance';
// import EmpHolidays from './Components/Pages/EmpHolidays/EmpHolidays'
import AllEmployees from './Components/EmployeeData/All Employees/AllEmployees';
// import Calendar from './Components/Calendar/Calendar';
// import EmpDetails from "./Components/EmployeeData/EmpDetail/EmpDetails";
import CalendarDetails from "./Components/Calendar/CalendarDetails";
import "./index.css"
import DataManagement from "./Components/DATA Management/DataManagement";
import { Navigate } from "react-router-dom";
// import { Context } from "./Context/Context";
// import {  useContext } from "react";
import Login from "./pages/Login/Login";
import Projects from "./pages/Projects/Projects";
import Users from "./pages/Users/Users";
import DailyTasks from "./pages/DailyTasks/DailyTasks";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import UserDetail from "./pages/UserDetail/UserDetail";
import TaskDetail from "./pages/TaskDetail/TaskDetail";
import Dashboard from "./pages/home/Home";
import AssignTasks from "./pages/AssignTasks/AssignTasks";
import TasksAssigned from "./pages/TasksAssigned/TasksAssigned";
import AssignedTaskDetail from "./pages/TaskDetail/assignedTaskDetail";
import { useEffect } from "react";
import TimeSheet from "./pages/UserDetail/TimeSheet";
import Company from "./pages/companies/Company";
// import Number from "./test";
import CompanyDetails from "./pages/companies/CompanyDetails";
function App() {


  const [auth, setAuth] = React.useState(false);

   
  useEffect(() => {

    setAuth(JSON.parse(localStorage.getItem('timesheet_user437')))    



  }, []);

  return (
    <>
      <BrowserRouter>
        {
          auth ?
            <>

<Header setAuth={setAuth} />
              <Sidebar />
              <Routes >
                <Route path='/Leaves' element={< EmployeeLeaves />} />
                <Route path='/attendance' element={<EmpAttendance />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/projectdetail" element={<ProjectDetail />} />
                <Route path='/allemployees' element={<AllEmployees />} />
                {/* <Route path='/employee/:id' element={<EmpDetails />} /> */}
                <Route path='/users' element={<Users />}></Route>
                <Route path='/users' element={<Users />}></Route>
                <Route path="/users/userdetail" element={<UserDetail />} />
                <Route path='/dailytasks' element={<DailyTasks />}></Route>
                <Route path='/assigntasks' element={<AssignTasks />}></Route>
                <Route path='/tasksassigned' element={<TasksAssigned />}></Route>
                <Route path='/tasksassigned/detail' element={<AssignedTaskDetail />}></Route>
                <Route path="/dailytasks/taskdetail" element={<TaskDetail />} />
                <Route path="/calendar/:id" element={<CalendarDetails />}></Route>
                <Route path="/datamanagement" element={<DataManagement />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/timesheet" element={<TimeSheet/>}/>
                <Route path="/company" element={<Company/>}/>
                {/* <Route path='/Number' element={<Number/>}></Route> */}
                <Route path="/companyDetails" element={<CompanyDetails/>}/>
              </Routes>
              <Footer />
            </>
            :
            <div  style={{backgroundColor: '#f7f7f7'}}>
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path='/login' element={< Login setAuth={setAuth} />} />
              </Routes>
            </div>
        }
      </BrowserRouter>
    </>
  );
}

export default App;
