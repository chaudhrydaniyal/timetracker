import React,{useState} from "react";

const Number=()=>{
    const [User, setUser] = useState ({
        name:"",
        email:"",
        password:"",
        number:""
    })
    const handleChange=(e)=>{
        setUser((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    console.log("user",User)
    return(
        <>
        <form>
            <input type="text" name="name" onChange={handleChange}></input>
            <input type="text" name="email" onChange={handleChange}></input>
            <input type="text" name="password" onChange={handleChange}></input>
            <input type="text"  name="number" onChange={handleChange}></input>

        </form>
        </>
    )
}
export default Number
