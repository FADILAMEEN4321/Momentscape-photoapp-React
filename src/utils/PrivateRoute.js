import { useContext } from "react";

import React from 'react'
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import AuthContext from "../context/AuthContext";

const PrivateRoute = () => {
       
    let {user} = useContext(AuthContext)
    if (user){
    return <HomePage></HomePage>}
    else{
        return <LoginPage></LoginPage>
    }
} 

export default PrivateRoute