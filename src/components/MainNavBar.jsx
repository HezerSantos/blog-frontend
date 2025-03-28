import { Link, useNavigate } from "react-router-dom"
import { useContext, useRef, useState } from "react";
import axios from "axios"
import { AuthContext } from "../../context/authContext"
axios.defaults.withCredentials = true;
import { GiHamburgerMenu } from "react-icons/gi";

const handleAside = (asideRef) => {
    asideRef.current.classList.toggle("show")
}


const MainNavBar = ({sideNav, bFlag, dFlag}) => {
    const { isAuthenticated, userLogout } = useContext(AuthContext)
    const [loggedOutMessage, setLoggedOutMessage ] = useState(false)
    const asideRef = useRef(null)
    const navigate = useNavigate()
    return(
        <>
            <nav ref={asideRef} className="main__side show">
                <Link to="/" className="link__home">TheyWroteIt</Link>
                <ul className="nav__link__container nav__side">
                    <li><Link to="/blogs" className={bFlag? 'select' : ''}>Blogs</Link></li>
                    <li><Link to="/dashboard" className={dFlag? 'select' : ''}>Dashboard</Link></li>
                    {isAuthenticated? (
                        <li>
                            <Link to="/settings">Settings</Link>
                        </li>

                    ) : (
                        <li>
                            <Link to={"/login"}>Log In</Link>
                        </li>
                    )}
                    {sideNav && (
                        <>
                            <li className="dash__container">
                                <div className="dash__link__button">
                                    <Link to={"/dashboard/create-blog"}>
                                        Create +
                                    </Link>
                                </div>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <div className="side__button__container">
                <button onClick={() => handleAside(asideRef)}><GiHamburgerMenu width={"5rem"}/></button>      
            </div>
            <nav className="main__nav">
                {loggedOutMessage && (
                    <div className="logged__out">Successfully Logged Out</div>
                )}
                <Link to="/" className="link__home">TheyWroteIt</Link>
                <ul className="nav__link__container">
                    <li><Link to="/blogs" className={bFlag? 'select' : ''}>Blogs</Link></li>
                    <li><Link to="/dashboard" className={dFlag? 'select' : ''}>Dashboard</Link></li>
                    {isAuthenticated? (
                        <>
                            <li>
                                <Link to={"/dashboard/create-blog"}>
                                    Create
                                </Link>
                            </li>
                            <li>
                                <Link to="/settings">Settings</Link>
                            </li>
                        </>

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