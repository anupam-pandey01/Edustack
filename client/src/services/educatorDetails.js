import { handleError } from "../utils/handler";
import api from "./api"

export const educatorDetails = async (userId)=>{
    try{
        const res = await api.get(`/educator/${userId}`);

        return res
    }catch(err){
        console.error("Error during educatorDetails", err.message);
        handleError(err.response?.data?.message);
    }
}