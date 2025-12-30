import React, {createContext, useState, useEffect, useContext} from 'react';
import { useLocation } from 'react-router';

const AuthContext = createContext();

export const useAuth = ()=>{
    return useContext(AuthContext);
}

export const AuthProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem("token");
        if(userId && token){
            setCurrentUser(userId);
            setIsLoggedIn(true)
        }
        
    }, []);

    const value = {
        currentUser, 
        setCurrentUser,
        isLoggedIn, 
        setIsLoggedIn,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}