import { Link } from "react-router-dom"
import axios from "axios"
axios.defaults.withCredentials = true;
const logout = async() => {
    await axios.post("http://localhost:8080/logout");
}

const MainNavBar = ({isLoggedIn}) => {
    return(
        <>
            <nav className="main__nav">
                <Link to="/home" className="link__home">TheyWroteIt</Link>
                <ul className="nav__link__container">
                    <li><Link>Blogs</Link></li>
                    <li><Link>Dashboard</Link></li>
                    <li><Link>Settings</Link></li>
                    <li>
                        {isLoggedIn? <Link>Log Out</Link> : <Link to={"/login"}>Log In</Link>}
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default MainNavBar