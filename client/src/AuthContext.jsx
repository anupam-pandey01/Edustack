import React, {createContext, useState, useEffect, useContext} from 'react';

const AuthContext = createContext();

export const useAuth = ()=>{
    return useContext(AuthContext);
}

export const AuthProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mobileMenu, setmobileMenu] = useState(true);

    // useEffect(()=>{
    //     const userId = localStorage.getItem('userId');
    //     const token = localStorage.getItem("token")
    //     if(userId && token){
    //         setCurrentUser(userId);
    //         setIsLoggedIn(true)
    //     }
    // }, []);

    const value = {
        currentUser, 
        setCurrentUser,
        isLoggedIn, 
        setIsLoggedIn,
        mobileMenu, 
        setmobileMenu
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}