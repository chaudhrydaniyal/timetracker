
const Companies = require("../../Models/Companies/Companies")

 const getCompany = async(req,res,next)=>{
  try{
    const companies = await Companies.find().populate("employees projects departments owner");
  companies && res.status(200).json({message:"success",companies});
  }catch(error){
    next(error)
  }

}

 const addcompany = async(req,res,next) =>{
  console.log("i am in the company")
    try{

      console.log("called",req.body)

          const company = new Companies({
            companyName:req.body.companyName,
            contactName:req.body.contactName,
            address:req.body.address,
            phoneNo:req.body.phoneNo,
            country:req.body.country,
            city:req.body.city,
            postalCode:req.body.postalCode,
            landLineNo:req.body.landLineNo,
            registrationNo:req.body.registrationNo,
            email:req.body.email,
            shortName:req.body.shortName,
            owner:req.body.owner
            
          })

          await company.save()

         res.status(200).json({message:"successfully created",company})

    }catch(error){

      console.log("error",error)
      
    next(error)
    }
}



module.exports = {getCompany,addcompany}