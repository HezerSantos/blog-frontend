import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import { useEffect, useContext } from "react";
import axios from "axios"
axios.defaults.withCredentials = true;

const logout = async(userLogout, navigate) => {
    const res = await axios.post("http://localhost:8080/logout");
    console.log(res.data.message)
    userLogout()
    navigate("/")
}

const getUser = async(userLogin) => {
    try{
        const res = await axios.get("http://localhost:8080/")
        console.log(res)
        console.log("User Reauthenticated")
        userLogin()
    } catch(e) {
        console.error(e)
    }
}

const LogoutPage = () => {
    const { isAuthenticated, userLogin, userLogout } = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        getUser(userLogin)
    }, [])

    return(
        <>
        <div>
            <h1>Are you sure you want to log out?</h1>
            <Link to="/" className="log__out" >Back</Link>
            <button onClick={() => logout(userLogout, navigate)} className="log__out">Logout</button>
        </div>
        </>
    )
}

export default LogoutPage