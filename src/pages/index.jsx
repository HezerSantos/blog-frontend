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



const getUser = async(isAuthenticated, userLogin) => {
    try{
        const res = await axios.get("http://localhost:8080/")
        console.log(res)
        userLogin()
    } catch(e) {
        // console.error(e)
    }
}

const getBlogs = async(setAllBlogs, setBlogLoading) => {
    try{
        const res = await axios.get("http://localhost:8080/blogs")
        const blogs = res.data.blogs

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
                    author = "Jason Williams"
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
                    {/* <BlogCard 
                        image = {dogImage}
                        header ="First Experience With Mocha"
                        text = "Becoming a first-time Pomeranian owner has been a mix of adorable moments and unexpected challenges. From learning about their high energy to navigating grooming routines, this post explores the reality of life with a fluffy ball of personality. I'll share my personal experiences, tips, and the lessons I’ve learned along the way, as well as how my Pomeranian has brought joy (and a little chaos) into my life. Whether you’re considering adopting one or just curious about these charming dogs, this post will give you an honest look at what it’s really like to welcome a Pomeranian into your home."
                        author = "Jason Williams"
                    />
                    <BlogCard 
                        image = {steak}
                        header ="The Secret to a Good Steak"
                        text = "The secret to a perfect steak lies in a few key steps: choosing the right cut, seasoning, and mastering the cooking method. In this post, I’ll share the tips and techniques I’ve learned to bring out the best flavor and tenderness. From searing to resting, these simple tricks will help you elevate your steak game to restaurant-quality at home."
                        author = "Jason Williams"
                    />
                    <BlogCard 
                        image = {ball}
                        header ="Is the NBA Failing?"
                        text = "The NBA has long been a dominant force in global sports, but recent years have sparked debates about whether the league is facing a decline. From growing concerns about player empowerment, frequent injuries, and a lack of competitive balance, to the changing dynamics of viewership and fan engagement, this post takes a closer look at the NBA’s current challenges. I’ll explore whether these issues are a temporary setback or signs of deeper problems within the league. Is the NBA failing, or is it just evolving?"
                        author = "Jason Williams"
                    /> */}
                </section>
                <div className="next__container">
                    <button>
                        Next Page
                    </button>
                    <p>1 of 100</p>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default HomePage