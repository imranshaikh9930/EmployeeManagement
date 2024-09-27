import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Login from './Login';
import { useAppContext } from '../context/appContext';

const Protected = () => {
    const info = JSON.parse(localStorage.getItem("info"));

    // console.log(info.token,info.username);
    // const {token} = useAppContext();
    // console.log(token);
  return (
    <div>
          {info ? <Outlet /> : <Navigate to="/login" />} 
    </div>
  )
}

export default Protected