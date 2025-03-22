import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react";
import axios from "axios"
import { AuthContext } from "../../context/authContext"
axios.defaults.withCredentials = true;
const logout = async(e, userLogout, setLoggedOutMessage, navigate) => {
    e.preventDefault()
    const res = await axios.post("http://localhost:8080/logout");
    console.log(res.data.message)
    userLogout()
    setLoggedOutMessage(true)
    navigate("/")
}

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
                    <li><Link>Blogs</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link>Settings</Link></li>
                    <li>
                        {isAuthenticated? <form onSubmit={(e) => logout(e, userLogout, setLoggedOutMessage, navigate)}><button>Log Out</button></form> : <Link to={"/login"}>Log In</Link>}
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default MainNavBar