import React, {createContext, useState, useEffect, useContext} from 'react';
import api from './services/api';
import { clearAccessToken, setAccessToken } from './services/tokenService';
import { handleSuccess } from './utils/handler';

const AuthContext = createContext();

export const useAuth = ()=>{
    return useContext(AuthContext);
}

export const AuthProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setIsLoading] = useState(true);

    const checkAuth = async() => {
        try{
            const res = await api.post("/refresh-token");

            setAccessToken(res.data.accessToken);
            setCurrentUser(res.data.userId)
            setIsLoggedIn(true);
        }catch(err){
            clearAccessToken();
            setIsLoggedIn(false);
            setCurrentUser(null);
        }finally{
            setIsLoading(false)
        }
        
    }

    useEffect(()=>{
        checkAuth()
    }, [])

    const logout = async () => {
        try {
            const res = await api.post("/logout"); // clears cookie backend
            handleSuccess(res.data.message)
        } catch (err) {
            console.log("Logout error:", err);
        }

        clearAccessToken();
        setIsLoggedIn(false);
        setCurrentUser(null);
    };

    const value = {
        currentUser, 
        setCurrentUser,
        isLoggedIn, 
        setIsLoggedIn,
        logout, 
        loading
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}