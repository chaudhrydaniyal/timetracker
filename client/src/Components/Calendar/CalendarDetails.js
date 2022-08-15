import React from 'react'
import {useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
const CalendarDetails = () => {
    const location = useLocation()
    const path = location.pathname.split("/")[2]
    console.log(path)
    const [emp, setEmp] = useState({})
    useEffect(() => {
        const fetchEmp = async () => {
            const res = await axios.get('/calendar/' + path)
            console.log(res)
            setEmp(res.data)
        }

        fetchEmp()


    }, [path])
  
  return (
    <>
    
    
    </>
  )
}

export default CalendarDetails