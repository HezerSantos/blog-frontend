import { useContext, useEffect, useRef, useState } from "react"
import MainNavBar from "../components/MainNavBar"

import axios from "axios"
import LogoutPage from "./LogoutPage";
import ChangeCredentials from "./ChangeCredentials";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;
import { GiHamburgerMenu } from "react-icons/gi";
const handleLogout = (setChangeFlag, setLogoutFlag) => {
    setChangeFlag(false)
    setLogoutFlag(true)
}

const handleChange = (setChangeFlag, setLogoutFlag) => {
    setChangeFlag(true)
    setLogoutFlag(false)
}

const handleAside = (asideRef) => {
    asideRef.current.classList.toggle("show")
}

const SettingsPage = () => {
    const [changeFlag, setChangeFlag] = useState(true)
    const [logoutFlag, setLogoutFlag] = useState(false)
    const asideRef = useRef(null)
    const navigate = useNavigate()
    useEffect(() => {
        document.title = "TheyWroteIt | Settings"
        const handleResize = () => {
            if(window.innerWidth >= 800){
                asideRef.current.classList?.remove("show")
            }
        };
    
        // Add the resize event listener when the component mounts
        window.addEventListener('resize', handleResize);
    
        // Cleanup the event listener when the component unmounts
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return(
        <>
            <div className="top__nav">
                    <button onClick={() => handleAside(asideRef)}><GiHamburgerMenu width={"5rem"}/></button>      
            </div>
            <main className="settings__page">
                <aside ref={asideRef} className="side__settings">
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