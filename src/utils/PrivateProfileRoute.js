import { useContext } from "react";
import React from 'react'
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import AuthContext from "../context/AuthContext";



const PrivateProfileRoute = () => {
    
    let {user} = useContext(AuthContext)
    if (user){
    return <ProfilePage></ProfilePage>}
    else{
        return <LoginPage></LoginPage>
    }
} 

export default PrivateProfileRoute