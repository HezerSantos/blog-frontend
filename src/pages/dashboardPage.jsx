import { useContext, useEffect, useState } from "react"
import MainNavBar from "../components/MainNavBar"
import Footer from "../components/Footer"
import { AuthContext } from "../../context/authContext"
import axios from "axios"
import LoadingScreen from "../components/LoadingScreen"
import SideNav from "../components/SideNav"
import { Link } from "react-router-dom"
import DashBlogCard from "../components/DashBlogCard"
import DOMPurify from 'dompurify';
import { decode } from 'he'; 
import { MdPublish } from "react-icons/md";
import { RiDraftLine } from "react-icons/ri";
import { FaComment } from "react-icons/fa";
axios.defaults.withCredentials = true;
import config from '../../config';
const getDashboard = async(userLogin, userLogout, setUser, setIsLoading) => {
    try{
        const res = await axios.get(`${config.apiUrl}/dashboard`)
        // console.log(res)
        setUser(res.data.user)
        setIsLoading(true)
        userLogin()
        return true
    } catch (e){
        // console.error(e)
        setIsLoading(false)
        setUser(null)
        userLogout()
        return false
    }
} 

const getBlogs = async(setUserBlogs, setLoadBlogs, user) => {
    try{
        const { id } = await axios.get(`${config.apiUrl}/dashboard`)
        const res = await axios.get(`${config.apiUrl}/dashboard/blogs`)
        const blogs = res.data.blogs
        // console.log(blogs)
        const userBlogs = blogs.map(blog => {
            const sanittizedSyn = DOMPurify.sanitize(blog.synopsis)
            const decodedSyn = decode(sanittizedSyn)
            const sanittizedTitle = DOMPurify.sanitize(blog.title)
            const decodedTitle = decode(sanittizedTitle)
            let url=""
            if (blog.image[0]){
                url = blog.image[0].url
            }
            const random = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
            return(
                <div className="wrapper" key={blog.id}>
                    <DashBlogCard
                        image = {`${url}?v=${random}`}
                        header ={decodedTitle}
                        text = {decodedSyn}
                        author = "Me"
                        blogId={blog.id}
                        userId={user.id}
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
        document.title = "TheyWroteIt | Dashboard"
        // const start = async() => {
        //     const res = await getDashboard(userLogin, userLogout, setUser, setIsLoading)
        //     console.log(res)
        //     if(res){
        //         console.log(user)
        //         getBlogs(setUserBlogs, setLoadBlogs, user)
        //     }
        // }
        // start()
        getDashboard(userLogin, userLogout, setUser, setIsLoading)
        // getBlogs(setUserBlogs, setLoadBlogs, user)
    }, [])
    useEffect(() => {
        const timer = setTimeout(() => {
            setNotLoading(true)
        }, 3000)
    }, [])
    useEffect(() => {
        if(user){
            if(user.id){
                getBlogs(setUserBlogs, setLoadBlogs, user)
            }
        }
    }, [user])
    return(
        <>
            <MainNavBar sideNav={true} dFlag={true}/>

            {isAuthenticated ? (
                <main className="dashboard__container">
                    {loadBlogs? (
                        <LoadingScreen className={"loading__dash__blog"}/>
                    ) : (
                        userBlogs.length > 0? (
                            userBlogs.map(blog => {
                                return(
                                    blog
                                )
                            })
                        ) : (
                            <h1>No Blogs Yet</h1>
                        )
                    )}
            </main>
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