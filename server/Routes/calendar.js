const express = require("express")
const Calendar = require("../Models/Calendar")
const router = express.Router();
require("../Connection/connection");

//Adding a Calendar
router.post('/addcalendar', async(req,res)=>{
   try{
        const calendar = new Calendar({
            calendarname:req.body.calendarname,
            
        })
        const saveCalendar = await calendar.save();
        res.status(200).json(saveCalendar);
          
   }catch(error){
    console.log(error)
    res.status(500).json(error);
   }

})

//Deleting existing Calendar

router.delete('/:id',async(req,res)=>{

    try{
        const checkCalendar = await Calendar.findById(req.params.id)
        try{
            await Calendar.findByIdAndDelete(req.params.id)
            res.status(200).json("Calendar has been deleted...");
        }catch(error){
            console.log(error)
            res.status(500).json(err);
        }

    }catch(error){
        res.status(404).json("User not found!");
    }

})

//Update Calendar
router.put('/:id',async(req,res)=>{
    try{
        //finding calendar you want to edit 
        const calendar = await Calendar.findById(req.params.id)
        try{
              const updateCal = await Calendar.findByIdAndUpdate(req.params.id,{
                $set:req.body,

              },{new:true});
              res.status(200).json(updateCal)
              

        }catch(error){
             res.status.json(error)
        }

    }catch(error){
        res.status(500).json(error)

    }
})

//get All calendars
router.get("/",async(req,res)=>{

    try{
          const calendar =await Calendar.find();
           res.status(200).json(calendar)

    }catch(error){
        res.status(500).json(error)
    }

})

//get a specific Calendar
router.get("/:id",async(req,res)=>{
    try{
         const cal = await Calendar.findById(req.params.id)
          res.status(200).json(cal)

    }catch(error){
       res.status(500).json(error);
    }

})

module.exports = router;