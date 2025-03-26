import { useContext, useEffect, useState } from "react"
import MainNavBar from "../components/MainNavBar"

import axios from "axios"
import LogoutPage from "./LogoutPage";
import ChangeCredentials from "./ChangeCredentials";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

const handleLogout = (setChangeFlag, setLogoutFlag) => {
    setChangeFlag(false)
    setLogoutFlag(true)
}

const handleChange = (setChangeFlag, setLogoutFlag) => {
    setChangeFlag(true)
    setLogoutFlag(false)
}

const SettingsPage = () => {
    const [changeFlag, setChangeFlag] = useState(true)
    const [logoutFlag, setLogoutFlag] = useState(false)
    const navigate = useNavigate()
    return(
        <>
            <main className="settings__page">
                <aside>
                    <ul className="settings__list">
                        <li><button onClick={() => navigate("/")}>Back</button></li>
                        <li><button onClick={(e) => handleChange(setChangeFlag, setLogoutFlag)}>Change Credentials</button></li>
                        <li><button onClick={(e) => handleLogout(setChangeFlag, setLogoutFlag)}>Log Out</button></li>
                    </ul>
                </aside>
                {logoutFlag && (
                    <LogoutPage />
                )}
                {changeFlag && (
                    <ChangeCredentials />
                )}
            </main>
        </>
    )
}

export default SettingsPage