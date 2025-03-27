import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react";
import axios from "axios"
import { AuthContext } from "../../context/authContext"
axios.defaults.withCredentials = true;


const MainNavBar = () => {
    const { isAuthenticated, userLogout } = useContext(AuthContext)
    const [loggedOutMessage, setLoggedOutMessage ] = useState(false)
    const navigate = useNavigate()
    return(
        <>
            <nav className="main__nav">
                {loggedOutMessage && (
                    <div className="logged__out">Successfully Logged Out</div>
                )}
                <Link to="/" className="link__home">TheyWroteIt</Link>
                <ul className="nav__link__container">
                    <li><Link to="/blogs">Blogs</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    {isAuthenticated? (
                        <li>
                            <Link to="/settings">Settings</Link>
                        </li>

                    ) : (
                        <li>
                            <Link to={"/login"}>Log In</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </>
    )
}

export default MainNavBar