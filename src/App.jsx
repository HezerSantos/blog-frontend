import { useState, useEffect } from 'react'
import axios from "axios"
import { Link, Outlet, Navigate } from "react-router-dom"
import '../src/assets/styles/App.css'
import AuthProvider from '../context/authContext'
function App() {
    axios.defaults.withCredentials = true;
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    )
}

export default App
