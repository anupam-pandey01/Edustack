import React, { useState } from 'react'
import "./OtpVerification.css"
import { MdOutlineMail } from "react-icons/md";
import { otpVerification } from '../../services/otpVerification';
import { handleError, handleSuccess } from '../../utils/handler';
import { useAuth } from '../../AuthContext';
import { validateOtpInput } from '../../utils/validators';

const OtpVerification = () => {
    const [verificationCode, setVerificationCode] = useState("")
    const { setCurrentUser, setIsLoggedIn } = useAuth();

    async function handleSubmit(e){
        e.preventDefault();

        const validationError = validateOtpInput(verificationCode);
        if (validationError) {
            handleError(validationError);
            return;
        }

        try{
            const { data } = await otpVerification(verificationCode);
            setCurrentUser(data.userId);
            setIsLoggedIn(true);
            handleSuccess(data.message)
        }catch(err){
            const msg = err.response?.data?.message || "Login failed"
            handleError(msg);
        }        
    }

  return (
    <div className='otp-verification'>
        <div className="opt-verfication-container">
            <div className="otp-header">
                <p className='email-icon'><MdOutlineMail size={44} style={{ background: "#5ba1f1", fill: "white", borderRadius: "50%", padding: "4px"}}/></p>
                <h1>Enter Verification Code</h1>
                <p>Verification Code is sended to your email address</p>
            </div>
            
            <div className='otp-intup-section'>
                <input
                  type="text"
                  value={verificationCode}
                  maxLength={6}
                //   placeholder='Enter Verification Code'
                  onChange={(e)=> setVerificationCode(e.target.value)}
                />
                <button onClick={handleSubmit}>Verify Email</button>
            </div>
        </div>
    </div>
  )
}

export default OtpVerification