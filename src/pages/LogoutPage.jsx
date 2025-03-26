import { Link } from "react-router-dom"

const LogoutPage = () => {
    return(
        <>
        <div>
            <h1>Are you sure you want to log out?</h1>
            <Link to="/" className="log__out" >Back</Link>
            <button className="log__out">Logout</button>
        </div>
        </>
    )
}

export default LogoutPage