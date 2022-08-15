import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import EcxelImport from './EcxelImport';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import Xlsx from './Xlsx';
import axios from "axios";
import { NotificationManager } from 'react-notifications';


const DataManagement = () => {
   
    
    

    const[data,setData] = useState([])   
    const createRequests = () => {
        console.log(data);
        console.log("table data",table)
      };
    const [show, setShow] = useState()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const url = "/postimport";
     let table =[];
    data.forEach(elem=>{
        table.push(
            {
                firstname:elem[0],
                lastname:elem[1],
                city:elem[2]
            }

        )
    })
    
    // var finalData = JSON.stringify(table);
    // console.log(finalData);
      
  const postData = async() =>{
    try{
    //   const savedata = await axios.post(url,finalData)
     for(let i=0;i<3;i++)
     {
        // const finalData = JSON.stringify(table)
        const savedata = await axios.post(url,table[i]);
       
     }
     
         
    }catch(error){
        console.log(error)
      NotificationManager.error("Error Saving DATA")
    }

  }
   

    return (
        <>

            <div className='content-wrapper' style={{ backgroundColor: '#f7f7f7' }}>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className='row align-items-center'>
                            <div className='col'>
                                <h3 className='page-title'>Holidays</h3>
                                <ul className='breadcrumb' style={{ backgroundColor: '#f7f7f7' }}>
                                    <li className="breadcrumb-item">
                                        <Link to='/' style={{ color: '#1f1f1f' }}>Dashboard</Link>
                                    </li>
                                    <li className='breadcrumb-item active'>
                                        Holidays
                                    </li>
                                </ul>
                                <div className='col-auto float-end ms-auto'>
                                    <a className='btn add-btn ' data-bs-toggle="modal" data-bs-target="#add_calendar" onClick={handleShow} >Import/Export</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='centent'>
                    <div className='container-fluid'>
                        <div className="card">
                            <div className="card-header" style={{backgroundColor:"black"}}>
                                <h3 className="card-title" style={{ color: "white",}}>Import/Export Data</h3>
                            </div>
                            <div className='card-body'>
                                <div className='table-responsive' style={{ height: "500px" }}>
                                    <div className='card'>
                                    <div class="card-header">
                                        <h3>Upload Files</h3>
                                         <div className='card-body '>
                                         <EcxelImport  uploadHandler={setData}/>
                                          
                                         </div>
                                         <div style={{display:"flex",justifyContent:"center"}}>
                                         <button onClick={createRequests} style={{border:'none',backgroundColor:"black",color:'white',padding:"5px",borderRadius:"5px"}}>Create</button>
                                         <div style={{padding:'10px'}}></div>
                                          <button onClick={postData} style={{border:"none",backgroundColor:"green",color:"white",padding:"5px",borderRadius:"5px"}}>Post Indo DB</button>
                                         </div>
                                    </div>

                                    </div>
                                </div>
                                <div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <NotificationContainer />

           <div></div>



        </>
    )
}

export default DataManagement;