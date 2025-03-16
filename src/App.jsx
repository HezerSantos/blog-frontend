import { useState, useEffect } from 'react'
import axios from "axios"
import { Link, Outlet, Navigate } from "react-router-dom"
import '../src/assets/styles/App.css'

function App() {
    axios.defaults.withCredentials = true;
    return (
        <>
            <Outlet />
        </>
    )
}

export default App
