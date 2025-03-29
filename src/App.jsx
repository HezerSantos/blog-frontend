import { useState, useEffect } from 'react'
import axios from "axios"
import { Link, Outlet, Navigate } from "react-router-dom"
import '../src/assets/styles/App.css'
import AuthProvider from '../context/authContext'

if (process.env.NODE_ENV === 'development') {
    // Override all console methods
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
    console.info = () => {};
    console.debug = () => {};
  }
  
function App() {
    axios.defaults.withCredentials = true;
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    )
}

export default App
