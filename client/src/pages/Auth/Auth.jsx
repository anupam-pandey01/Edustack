import React, { useState } from 'react'
import "./Auth.css"
import { useNavigate } from "react-router"
import signupHandleSubmit from '../../utils/signupHandle';
import loginHandleSubmit from '../../utils/loginHandle';
import { useAuth } from '../../AuthContext';
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from '../../utils/handler';


const Auth = () => {
  const [authState, setAuthState] = useState("Sign up");
  const [authData, setAuthData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student"
  });

  const { setCurrentUser, setIsLoggedIn } = useAuth();

  const navigate = useNavigate();
  
  // Function for handle the input of signup and login input
  function handleChange(e){
    e.preventDefault();
    const { name, value } = e.target;
    const copyAuthData = { ...authData };
    copyAuthData[name] = value;
    setAuthData(copyAuthData);
  }

  // Function for form submit
  async function handleSubmit(e){
    // Sign up state
    if(authState === "Sign up"){
      const {success, message, token, userId} = await signupHandleSubmit(e, authData);
      if(success){
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        setIsLoggedIn(true);
        setTimeout(()=>{
          handleSuccess(message);
        }, 2000)
        navigate("/");
      }else{
        handleError(message);
        console.log(message);
      }
    }

    // Login State
    if(authState === "Login"){
      const {success, message, token, userId} = await loginHandleSubmit(e, authData); 
      if(success){
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        setIsLoggedIn(true);
        handleSuccess(message);
        setTimeout(()=>{
          navigate("/");
          window.location.reload();
        }, 2000)
        
      }else{
        handleError(message);
        console.log(message);
      }
    }
  }

  return (
    <div className='auth-form'>
      <form onSubmit={handleSubmit}>
        <p className='head'>{authState}</p>
        
        {authState === "Sign up"?
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input type="text" name='username' placeholder='Enter the username' id='username' value={ authData.username } onChange={handleChange}/>
          </div>: <></>
        }
        
        <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" name='email' placeholder='Enter your email' id='email' onChange={handleChange} value={ authData.email }/>
        </div>
        <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" name='password' placeholder='Enter password' id='password' onChange={handleChange} value={ authData.password }/>
        </div>
        <button type='submit'>{authState}</button>
        {authState === "Sign up"?
          <p className='form-footer'>Already have account <span onClick={()=>setAuthState("Login")}>Login</span></p>:
          <p className='form-footer'>Create new account <span onClick={()=>setAuthState("Sign up")}>Sign up</span></p>
        }  
      </form>
    </div>
  )
}

export default Auth
