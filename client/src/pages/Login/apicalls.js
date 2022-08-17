import axios from "axios";
import originURL from "../../url";


const url =`${originURL}/auth/login`

export const loginCall = async(userCredientials,dispatch) =>{
    dispatch({type:"LOGIN_START"});
    
    try{
         const response = await axios.post(url,userCredientials)
         dispatch({type:"LOGIN_SUCCESS",payload:response.data})
        
    }catch(error){

     dispatch({type:"LOGIN_FAILURE",payload:error})
    }
}
