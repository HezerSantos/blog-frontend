import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import { useEffect, useContext } from "react";
import axios from "axios"
axios.defaults.withCredentials = true;
import config from '../../config';
const logout = async(userLogout, navigate) => {
    const res = await axios.post(`${config.apiUrl}/logout`);
    console.log(res.data.message)
    userLogout()
    navigate("/")
}

const getUser = async(userLogin) => {
    try{
        const res = await axios.get(`${config.apiUrl}/`)
        // console.log(res)
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
            <div>
                <Link to="/" className="log__out" >Back</Link>
                <button onClick={() => logout(userLogout, navigate)} className="log__out">Logout</button>
            </div>
        </div>
        </>
    )
}

export default LogoutPage