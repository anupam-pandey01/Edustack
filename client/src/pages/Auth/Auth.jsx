import React, { useState } from 'react'
import "./Auth.css"
import { useNavigate } from "react-router"
import { useAuth } from '../../AuthContext';
import { handleError, handleSuccess } from '../../utils/handler';
import { login, signup } from '../../services/authService';
import { validateAuthInputs } from '../../utils/validators';


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

  // Function for form submit ( SIGN-UP and LOG-IN STATE )
  async function handleSubmit(e){
    e.preventDefault()

    const validationError = validateAuthInputs(authState, authData);
    if (validationError) {
      handleError(validationError);
      return;
    }

    if(authState === "Sign up"){
      try{
        const { data } = await signup(authData);

        if(data.success){
          navigate("/verify-otp");
          handleSuccess(data.message);
        }
      }catch(err){
        const msg = err.response?.data?.message || "Sign up failed";
        handleError(msg);
      }
    }

    // Login State
    if(authState === "Login"){
      try{  
        const { data } = await login(authData);

        if(data.success){
          setIsLoggedIn(true);
          setCurrentUser(data.userId)
          handleSuccess(data.message);
          setTimeout(()=>{
            navigate("/");
          }, 2000)
        }
      }catch(err){
        const msg = err.response?.data?.message || "Login failed"
        handleError(msg)
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
