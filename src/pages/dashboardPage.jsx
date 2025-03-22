import { useContext, useEffect, useState } from "react"
import MainNavBar from "../components/MainNavBar"
import Footer from "../components/Footer"
import { AuthContext } from "../../context/authContext"
import axios from "axios"
import LoadingScreen from "../components/LoadingScreen"
axios.defaults.withCredentials = true;

const getDashboard = async(userLogin, userLogout, setUser, setIsLoading) => {
    try{
        const res = await axios.get("http://localhost:8080/dashboard")
        console.log(res)
        setUser(res.data.user)
        userLogin()
        setIsLoading(true)
    } catch (e){
        console.error(e)
        setUser(null)
        userLogout()
    }
} 


const DashboardPage =() => {
    const { isAuthenticated, userLogin, userLogout } = useContext(AuthContext)
    const [isLoading, setIsLoading ] = useState(false)
    const [user, setUser ] = useState()
    useEffect(() => {
        getDashboard(userLogin, userLogout, setUser, setIsLoading)
    }, [])
    return(
        <>
            <MainNavBar />
            {isAuthenticated ? (
                isLoading ? (
                    <main>
                        <h1>{user.username}</h1>
                    </main>
                ) : (
                    <main className="loading__container">
                        <LoadingScreen className={"loading__circle loading__dash"}/>
                    </main>
                )
            ) : (
                <h1>Please Log in</h1>
            )}

        </>
    )
}

export default DashboardPage