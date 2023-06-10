const emailSender = require("../Utils/EmailConfig/emailConfig");
const ExportToExcel = require("../Utils/ExportToExcel/ExportToExcel");





const sendTimesheet = async (req, res, next) => {
    try {

        console.log("req.body", req.body)

        if (req.body){

        await ExportToExcel(req.body)

        console.log("sendemail")
        emailSender([{email:"Hassan.Ali@sagacious.systems", body: req.body}])
   
        }
    } catch (error) {
        next(error)
    }
}




module.exports = {

    sendTimesheet

};