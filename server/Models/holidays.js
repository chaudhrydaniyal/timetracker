const mongooes = require("mongoose");
const AutoIncrement =  require('mongoose-sequence')(mongooes);
const HolidaySchema = new mongooes.Schema({
    srno:Number,
    title:{
        type:String,
        required:true
    },
    holidaydate:{
        // type:Date.now(),
        type:String,
        required:true                  
    },
    calendarId:{
         type: mongooes.Schema.Types.ObjectId, 
         ref: 'Calendar'
    },
    // status:{
    //     type:Boolean,
    //     required:true
    // }
})
HolidaySchema.plugin(AutoIncrement, {inc_field: 'srno'});

const Holiday = mongooes.model("Holiday",HolidaySchema)
module.exports= Holiday;