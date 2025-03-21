import { Link } from "react-router-dom"
import { useContext, useState } from "react";
import axios from "axios"
import { AuthContext } from "../../context/authContext"
axios.defaults.withCredentials = true;
const logout = async(e, userLogout, setLoggedOutMessage) => {
    e.preventDefault()
    const res = await axios.post("http://localhost:8080/logout");
    console.log(res.data.message)
    userLogout()
    setLoggedOutMessage(true)
}

const MainNavBar = () => {
    const { isAuthenticated, userLogout } = useContext(AuthContext)
    const [loggedOutMessage, setLoggedOutMessage ] = useState(false)
    return(
        <>
            <nav className="main__nav">
                {loggedOutMessage && (
                    <div className="logged__out">Successfully Logged Out</div>
                )}
                <Link to="/" className="link__home">TheyWroteIt</Link>
                <ul className="nav__link__container">
                    <li><Link>Blogs</Link></li>
                    <li><Link>Dashboard</Link></li>
                    <li><Link>Settings</Link></li>
                    <li>
                        {isAuthenticated? <form onSubmit={(e) => logout(e, userLogout, setLoggedOutMessage)}><button>Log Out</button></form> : <Link to={"/login"}>Log In</Link>}
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default MainNavBar