
const Departments = require("./../Models/departments")



const getDepartments = async (req, res, next) => {

  try {
    
    const departments = await Departments.find().populate("")//populate("employees projects departments owner");
    departments && res.status(200).json({ message: "success", departments });

  } catch (error) {
    
    console.log("err", error)
    next(error)

  }

}



const getCompanyDepartments = async (req, res, next) => {
  try {
    
    const departments = await Departments.find({company:req.params.id}).populate("")//populate("employees projects departments owner");
    departments && res.status(200).json({ message: "success", departments });

  } catch (error) {

    console.log("err", error)
    next(error)

  }

}



const addDepartment = async (req, res, next) => {

  try {
    
    console.log("called")

    const department = new Departments({

      name: req.body.name,
      role: req.body.role,
      description: req.body.description,
      company:req.body.company
      // phoneNo: req.body.phoneNo,
      // country: req.body.country,
      // city: req.body.city,
      // postalCode: req.body.postalCode,
      // landLineNo: req.body.landLineNo,
      // registrationNo: req.body.registrationNo,
      // email: req.body.email,
      // shortName: req.body.shortName,
      // owner: req.body.owner

    })

    await department.save()

    res.status(200).json({ message: "successfully created", department })

  } catch (error) {

    next(error)
    
  }
}



const deleteDepartment = async (req, res, next) => {

  try {

    const deleteDepartment = await Departments.deleteOne({ _id: req.params.id });

    deleteDepartment && res.status(200).json({ message: "Sucessfully deleted", deleteDepartment })

  }

  catch (error) {

    console.log("error adding task", error);
    next(error)

  }


}



module.exports = { getDepartments, addDepartment, deleteDepartment, getCompanyDepartments }