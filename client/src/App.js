import React from "react"
import Sidebar from './Components/Sidebar/Sidebar'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeLeaves from './Components/Pages/EmpLeaves/EmployeeLeaves'
import EmpAttendance from './Components/Pages/EmpAttendance/EmpAttendance';
import EmpHolidays from './Components/Pages/EmpHolidays/EmpHolidays'
import AllEmployees from './Components/Employee Data/All Employees/AllEmployees';
import Calendar from './Components/Calendar/Calendar';
import EmpDetails from "./Components/Employee Data/Emp Detail/EmpDetails";
import CalendarDetails from "./Components/Calendar/CalendarDetails";
import "./index.css"
import DataManagement from "./Components/DATA Management/DataManagement";
import { Navigate } from "react-router-dom";

import { Context } from "./Context/Context";
import { Suspense, useContext } from "react";

import Login from "./pages/Login/Login";
import Projects from "./pages/Projects/Projects";
import Users from "./pages/Users/Users";
import DailyTasks from "./pages/DailyTasks/DailyTasks";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import UserDetail from "./pages/UserDetail/UserDetail";
import TaskDetail from "./pages/TaskDetail/TaskDetail";
import Dashboard from "./pages/home/Home";

function App() {

  const context = useContext(Context)

  return (
    <>
      <BrowserRouter>
        {
          context.user ?
            <>
              <Sidebar />
              <Header />
              <Routes>
                <Route path='/Leaves' element={< EmployeeLeaves />} />
                <Route path='/attendance' element={<EmpAttendance />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/projectdetail" element={<ProjectDetail />} />
                <Route path='/allemployees' element={<AllEmployees />} />
                <Route path='/employee/:id' element={<EmpDetails />} />
                <Route path='/users' element={<Users />}></Route>
                <Route path='/users' element={<Users />}></Route>
                <Route path="/users/userdetail" element={<UserDetail />} />
                <Route path='/dailytasks' element={<DailyTasks />}></Route>
                <Route path="/dailytasks/taskdetail" element={<TaskDetail />} />
                <Route path="/calendar/:id" element={<CalendarDetails />}></Route>
                <Route path="/datamanagement" element={<DataManagement />} />
                <Route path="/dashboard" element={<Dashboard />} />

              </Routes>
              <Footer />
            </>
            :
            <>
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path='/login' element={< Login />} />
              </Routes>
            </>
        }
      </BrowserRouter>
    </>
  );
}

export default App;
