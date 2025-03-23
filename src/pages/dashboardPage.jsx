import { useContext, useEffect, useState } from "react"
import MainNavBar from "../components/MainNavBar"
import Footer from "../components/Footer"
import { AuthContext } from "../../context/authContext"
import axios from "axios"
import LoadingScreen from "../components/LoadingScreen"
import SideNav from "../components/SideNav"
import { Link } from "react-router-dom"
import BlogCard from "../components/BlogCard"
import dogImage from '../assets/images/dog.jpg';
import steak from '../assets/images/steak.jpg'

axios.defaults.withCredentials = true;

const getDashboard = async(userLogin, userLogout, setUser, setIsLoading) => {
    try{
        const res = await axios.get("http://localhost:8080/dashboard")
        console.log(res)
        setUser(res.data.user)
        setIsLoading(true)
        userLogin()
    } catch (e){
        // console.error(e)
        setIsLoading(false)
        setUser(null)
        userLogout()
    }
} 


const DashboardPage =() => {
    const { isAuthenticated, userLogin, userLogout } = useContext(AuthContext)
    const [isLoading, setIsLoading ] = useState(false)
    const [user, setUser ] = useState(null)
    const [notLoading, setNotLoading ] = useState(false)
    useEffect(() => {
        getDashboard(userLogin, userLogout, setUser, setIsLoading)
    }, [])
    useEffect(() => {
        const timer = setTimeout(() => {
            setNotLoading(true)
        }, 3000)
    }, [])
    return(
        <>
            <MainNavBar/>
            {isAuthenticated ? (
                isLoading ? (
                    <main className="dashboard__container">
                        <SideNav />
                        <section className="user__content">
                            <div className="published">
                                <div className="wrapper">
                                    <BlogCard
                                        image = {dogImage}
                                        header ="First Experience With Mocha"
                                        text = "Becoming a first-time Pomeranian owner has been a mix of adorable moments and unexpected challenges. From learning about their high energy to navigating grooming routines, this post explores the reality of life with a fluffy ball of personality. I'll share my personal experiences, tips, and the lessons I’ve learned along the way, as well as how my Pomeranian has brought joy (and a little chaos) into my life. Whether you’re considering adopting one or just curious about these charming dogs, this post will give you an honest look at what it’s really like to welcome a Pomeranian into your home."
                                        author = "Jason Williams"
                                    />
                                </div>
                                <div className="wrapper">
                                    <BlogCard 
                                        image = {steak}
                                        header ="The Secret to a Good Steak"
                                        text = "The secret to a perfect steak lies in a few key steps: choosing the right cut, seasoning, and mastering the cooking method. In this post, I’ll share the tips and techniques I’ve learned to bring out the best flavor and tenderness. From searing to resting, these simple tricks will help you elevate your steak game to restaurant-quality at home."
                                        author = "Jason Williams"
                                    />
                                </div>
                            </div>
                        </section>
                    </main>
                ) : (
                    <main className="loading__container">
                        <LoadingScreen className={"loading__circle loading__dash"}/>
                    </main>
                )
            ) : (
                <main className="loading__container">
                    {!notLoading? (
                        <LoadingScreen className={"loading__circle loading__dash"}/>
                    ): (
                        <h1>Please <Link to={"/login"}>Log in</Link></h1>
                    )}
                </main>
            )}
            <Footer />

        </>
    )
}

export default DashboardPage