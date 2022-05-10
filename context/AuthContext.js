import { useReducer } from "react";
import { useState } from "react";
import { createContext, FC } from "react";
import reducer from "../reducer/Authreducer";
import serverApi from "../utils/serverApi";
import Router from 'next/router'

const AuthContext = createContext()
const initialState = {
    userId: '',
	email: '',
	role: '',
    message: ''
}

const AuthProvider = ({children}) =>{
    const [state, dispatch] = useReducer(reducer, initialState)
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [userId, setUserid] = useState('')

    const login = async (inputEmail, inputPassword) =>{
        dispatch({type: 'LOGIN'}) 
        try{
            const res =   await serverApi.post('/login',{email: inputEmail, password: inputPassword})
            .catch((error)=>{
                dispatch({type: 'ERROR'})
                alert(error.response.data.message)
            })
           
            if(res.status === 200){
            
              setUserid(res.data.userId)
              setEmail(res.data.email)
              setRole(res.data.role)
              Router.push('/')
              alert(res.data.message)
            }
      
    
     
            dispatch({type: 'LOGIN', payload: res.data})
            
          }catch(error){
         
           
          }
    
        }
    

    return (
        <AuthContext.Provider value={{email, role, userId, login}}>
          {children}
        </AuthContext.Provider>
      );
    };
    
    export const useAuthContext = () => {
      return useContext(AuthContext);
    };
    
    export { AuthContext, AuthProvider };