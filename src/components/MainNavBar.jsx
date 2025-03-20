import { Link } from "react-router-dom"

const MainNavBar = () => {
    return(
        <>
            <nav className="main__nav">
                <Link to="/home" className="link__home">TheyWroteIt</Link>
                <ul className="nav__link__container">
                    <li><Link>Blogs</Link></li>
                    <li><Link>Dashboard</Link></li>
                    <li><Link>Settings</Link></li>
                    <li>
                        <Link>Log In</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default MainNavBar