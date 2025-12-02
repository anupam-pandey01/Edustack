import React from 'react'
import { useAuth } from '../AuthContext'
import { Navigate, Outlet, useNavigate } from 'react-router';

const ProtectedRoute = () => {
  const { isLoggedIn }  = useAuth();
  
  return isLoggedIn ? <Outlet/> : <Navigate to="/auth" replace/>
}

export default ProtectedRoute
