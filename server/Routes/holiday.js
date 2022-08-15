const express = require("express");
const router = express.Router();
const Holiday = require('../Models/holidays')
const Calendar = require("../Models/Calendar")


//posting holiday route

router.post('/addholiday',async(req,res)=>{
      try
      {
       const holiday =  new Holiday({
              title:req.body.title,
              holidaydate:req.body.holidaydate,
              calendarId:req.body.calendarId
             
       })
       //saving holiday
       const save  = await holiday.save();
       res.status(200).json(save);
      }
      catch(error)
      {
        console.log(error)
        res.status(500).json(error);
      }
})

//getting holiday with associated calendar

router.get("/detail",async(req,res)=>{

  //we use find method to find the doc and populate method to execute the 
  // data assosiated with this table
  try{
    console.log("getting All documents");
   const detail = await Holiday.find({}).populate("calendarId").exec();
   res.status(200).json(detail);

  }catch(error){
      console.log(error);
      res.status(500).json(error);
  }


})





module.exports = router;