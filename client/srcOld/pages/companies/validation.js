import * as Yup from 'yup'

export const validationSchema=Yup.object({
    companyName:Yup.string().min(5).required("Please enter your companyName "),
    shortName:Yup.string().min(2).required("Please enter your company shortName"),
    contactName:Yup.string().required('Please enter contactName'),
    email:Yup.string().email().required("Please enter email"),
    phoneNo:Yup.string().min(10).max(11).required("Please enter phoneNo between 10 to 11 numbers")
})