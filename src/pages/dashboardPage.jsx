import { useContext, useEffect, useState } from "react"
import MainNavBar from "../components/MainNavBar"
import Footer from "../components/Footer"
import { AuthContext } from "../../context/authContext"
import axios from "axios"
import LoadingScreen from "../components/LoadingScreen"
import SideNav from "../components/SideNav"
import { Link } from "react-router-dom"
import BlogCard from "../components/BlogCard"
import DOMPurify from 'dompurify';
import { decode } from 'he'; 

axios.defaults.withCredentials = true;

const getDashboard = async(userLogin, userLogout, setUser, setIsLoading) => {
    try{
        const res = await axios.get("http://localhost:8080/dashboard")
        // console.log(res)
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

const getBlogs = async(setUserBlogs, setLoadBlogs) => {
    
    try{
        const res = await axios.get("http://localhost:8080/dashboard/blogs")
        console.log(res)
        const blogs = res.data.blogs
        const userBlogs = blogs.map(blog => {
            const sanittizedSyn = DOMPurify.sanitize(blog.synopsis)
            const decodedSyn = decode(sanittizedSyn)
            const sanittizedTitle = DOMPurify.sanitize(blog.title)
            const decodedTitle = decode(sanittizedTitle)
            let url=""
            if (blog.image[0]){
                url = blog.image[0].url
            }
            return(
                <div className="wrapper" key={blog.id}>
                    <BlogCard
                        image = {url}
                        header ={decodedTitle}
                        text = {decodedSyn}
                        author = "Jason Williams"
                        id={blog.id}
                    />
                </div>
            )
        })
        setLoadBlogs(false)
        setUserBlogs(userBlogs)
    } catch(e) {
        console.error(e)
    }
}


const DashboardPage =() => {
    const { isAuthenticated, userLogin, userLogout } = useContext(AuthContext)
    const [isLoading, setIsLoading ] = useState(false)
    const [user, setUser ] = useState(null)
    const [notLoading, setNotLoading ] = useState(false)
    const [ userBlogs, setUserBlogs ] = useState()
    const [ loadBlogs, setLoadBlogs ] = useState(true)
    useEffect(() => {
        getDashboard(userLogin, userLogout, setUser, setIsLoading)
        getBlogs(setUserBlogs, setLoadBlogs)
    }, [])
    useEffect(() => {
        const timer = setTimeout(() => {
            setNotLoading(true)
        }, 3000)
    }, [])
    useEffect(() => {
        console.log(userBlogs)
    }, [userBlogs])
    return(
        <>
            <MainNavBar/>
            {isAuthenticated ? (
                isLoading ? (
                    <main className="dashboard__container">
                        <SideNav />
                        <section className="user__content">
                            <div className="published">
                                {loadBlogs? (
                                    <LoadingScreen className={"loading__circle loading__dash__blog"}/>
                                ) : (
                                    userBlogs.map(blog => {
                                        return(
                                            blog
                                        )
                                    })
                                )}
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