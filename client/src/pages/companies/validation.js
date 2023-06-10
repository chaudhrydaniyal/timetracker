import * as Yup from 'yup'

 const validationSchema=Yup.object({
    companyName:Yup.string().min(5).required("Please enter your Company Name "),
    shortName:Yup.string().min(2).required("Please enter your Company Short name"),
    contactName:Yup.string().required('Please enter Contact name'),
    email:Yup.string().email().required("Please enter email"),
    phoneNo:Yup.string().min(10).max(11).required("Please enter phone no between 10 to 11 numbers")
})

const departmentValidation=Yup.object({
    department:Yup.string().required("Please enter department")

})
const userValidation=Yup.object({
    fullname:Yup.string().min(2).required("Please enter name"),
    username:Yup.string().required("UserName required"),
    password:Yup.string().min(6).required("Password must be 6 characters"),
    // confirm_password:Yup.string().oneOf([Yup.ref("password"),null],"Password must be matched"),

})
export {validationSchema,departmentValidation,userValidation}