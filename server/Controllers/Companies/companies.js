
const Companies = require("../../Models/Companies/Companies")
const multer = require ("multer")
const path = require("path")

const getCompany = async (req, res, next) => {

  try {

    const companies = await Companies.find().populate("")//populate("employees projects departments owner");
    companies && res.status(200).json({ message: "success", companies });
 
  } 
  
  catch (error) {
    console.log("err", error)
    next(error)
  }

}







const addcompany = async (req, res, next) => {

  try {

    console.log("called", req.body)

    

    console.log("i am in the company")

    var logoLocation = '';


    const storage =  multer.diskStorage({
      // destination:(req,file,cb)=>{
      //   cb(null, "images");
      // },
    
    
      destination:'./Images/',
    
      filename: (req, file, cb) => {

        logoLocation = Date.now() + path.extname(file.originalname)

        console.log("file in multer", file)
        cb(null, logoLocation);
      },
    })


    console.log("multer", multer({ storage: storage }))


    const upload = multer({ storage: storage }).single('logo');


    await upload(req, res, async (err) => {
      if(err){

        res.render('index', {
          msg: err
        });
        
      } else {
     
        const company = new Companies({
          companyName: req.body.companyName,
          contactName: req.body.contactName,
          address: req.body.address,
          phoneNo: req.body.phoneNo,
          country: req.body.country,
          city: req.body.city,
          postalCode: req.body.postalCode,
          landLineNo: req.body.landLineNo,
          registrationNo: req.body.registrationNo,
          email: req.body.email,
          shortName: req.body.shortName,
          owner: req.body.owner,
          logo: logoLocation
        })

          await company.save()

          res.status(200).json({ message: "successfully created", company })
       
      }
    });  

  } catch (error) {

    next(error)

  }
}





const updatecompany = async (req, res, next) => {


  try {


    var logoLocation = '';


    const storage =  multer.diskStorage({
      // destination:(req,file,cb)=>{
      //   cb(null, "images");
      // },
    
    
      destination:'./Images/',
    
      filename: (req, file, cb) => {

        logoLocation = Date.now() + path.extname(file.originalname)

        console.log("file in multer", file)
        cb(null, logoLocation);
      },
    })


    console.log("multer", multer({ storage: storage }))

    const upload = multer({ storage: storage }).single('logo');

    console.log("called", req.body)

    await upload(req, res, async (err) => {
      if(err){
        res.render('index', {
          msg: err
        });
      } else {
     

    const company = await Companies.findOneAndUpdate({ _id: req.body._id }, ({

      companyName: req.body.companyName,
      contactName: req.body.contactName,
      address: req.body.address,
      phoneNo: req.body.phoneNo,
      country: req.body.country,
      city: req.body.city,
      postalCode: req.body.postalCode,
      landLineNo: req.body.landLineNo,
      registrationNo: req.body.registrationNo,
      email: req.body.email,
      shortName: req.body.shortName,
      owner: req.body.owner,
      logo: logoLocation

    }))
  
    res.status(200).json({ message: "successfully created", company })

  }})


  } catch (error) {

    next(error)
  
  }

}


module.exports = { getCompany, addcompany, updatecompany }