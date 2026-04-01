import api from "./api";
import { setAccessToken } from "./tokenService";

export const otpVerification = async ( verificationCode ) =>{

    const res = await api.post("/verify-code", { verificationCode });


    setAccessToken(res.data.accessToken);
    
    return res;
}
