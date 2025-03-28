import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import MainNavBar from "../components/MainNavBar"
import Footer from "../components/Footer"

import BlogCard from "../components/BlogCard"

import { AuthContext } from "../../context/authContext"
import axios from "axios"
import DOMPurify from 'dompurify';
import { decode } from 'he'; 
import LoadingScreen from "../components/LoadingScreen";
axios.defaults.withCredentials = true;
import config from '../../config';


const getUser = async(isAuthenticated, userLogin) => {
    try{
        const res = await axios.get(`${config.apiUrl}/`)
        // console.log(res)
        userLogin()
    } catch(e) {
        // console.error(e)
    }
}

const getBlogs = async(setAllBlogs, setBlogLoading) => {
    try{
        const res = await axios.get(`${config.apiUrl}/blogs`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        let blogs = res.data.blogs
        blogs = blogs.slice(0,3)
        let users = res.data.users
        const map = new Map(users.map(item => [item.id, item.username]));
        console.log(map)
        const blogComponents = blogs.map(blog => {
            const sanittizedSyn = DOMPurify.sanitize(blog.synopsis)
            const decodedSyn = decode(sanittizedSyn)
            const sanittizedTitle = DOMPurify.sanitize(blog.title)
            const decodedTitle = decode(sanittizedTitle)
            let url=""
            if (blog.image[0]){
                url = blog.image[0].url
            }
            return(
                <BlogCard 
                    key={blog.id}
                    image = {url}
                    header ={decodedTitle}
                    text = {decodedSyn}
                    author = {map.get(blog.userId)}
                    id={blog.id}
                />
            )
        })
        setAllBlogs(blogComponents)
        setBlogLoading(false)
    } catch(e){
        console.error(e)
    }
}

const HomePage = () => {
    const { isAuthenticated, userLogin } = useContext(AuthContext)
    const [allBlogs, setAllBlogs] = useState()
    const [blogLoading, setBlogLoading ] = useState(true)
    useEffect(() => {
        document.title = "TheyWroteIt"
        getUser(isAuthenticated, userLogin)
        getBlogs(setAllBlogs, setBlogLoading)
    }, [])
    // useEffect(() => {
    //     console.log(allBlogs)
    // }, [allBlogs])

    return(
        <>
            <MainNavBar />
            <header className="home__header">
                <div className="header__text">
                    <h1>The Words</h1>
                    <h1>They Left Behind</h1>
                </div>
                <div className="hero__image"></div>
            </header>
            <main className="home__main">
                <div className="trending__header">
                    <h1>TOP TRENDING</h1>
                </div>
                <section className="blog__container">
                    {blogLoading ? (
                        <LoadingScreen className={"loading__circle loading__dash"}/>
                    ) : (
                        allBlogs.map(blog => {
                            return(
                                blog
                            )
                        })
                    )}
                </section>
            </main>
            <Footer />
        </>
    )
}

export default HomePage