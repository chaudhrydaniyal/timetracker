import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./table.css"
import avatar from '../All Employees/avatar.png'
import { Link } from 'react-router-dom';

const Table = ({ data }) => {
    
     const PP = "http://192.168.5.24:5000/images/";
    
    
    const columns = [
        { field: "id", headerName: "Sr#", width: 120 },
        {
         field: "Employees", headerName: "Employees", width: 300,renderCell:(params)=>{
            return(<>
                       <div className="userListUser">
                            {/* {params}  */}
                                 {/* {params.row.RenderCell && <img src={PP + params.row.}/>} */}
                               { console.log(params)}
                                 {params.row.profilepic ? <img src={PP + params.row.profilepic} className="userListImg"/>: <img src={avatar} className="userListImg"/>}
                                  {params.row.Employees}
                       </div>
                 
                  </>)

         } 
        },
        { field: "Email", headerName: "Email", width: 220 },
        { field: "Designation", headerName: "Designation", width: 220 },
        { field: "Department", headerName: "Department", width: 210 },
        { field: "JoiningDate", headerName: "Joining Date", width: 200 },
        {
            field:"RenderCell",headerName:"See Deatils",width:200, renderCell:(params)=>{
                return(<>
                            <div>
                                <Link to={`/employee/${params.row.identity}`}>Details</Link>
                            </div>
                      
                       </>)
            }
        }

    ]
   
    const rows = data.map((row) => ({
        
        id: row.emp_id,
        Employees: row.firstname + row.lastname ,
        profilepic:row.profilepic,
        Email: row.email ? row.email :"N/A",
        Designation: row.designation,
        Department: row.department,
        JoiningDate:row.joiningdate,
        identity:row._id
       
    }))
    return (
        <>

            <div className='userList' style={{width:"100%",height:"500px"}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    
                />

            </div>
        </>
    )
}

export default Table