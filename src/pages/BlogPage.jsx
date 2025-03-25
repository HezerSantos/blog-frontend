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

const getBlogs = async(setBlogs, setBlogLoading, setShownBlogs) => {
    try{
        const res = await axios.get("http://localhost:8080/blogs")
        let blogs = res.data.blogs

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
        const splitBlogs = blogComponents.slice(0,3)
        setShownBlogs(splitBlogs)
        setBlogs(blogComponents)
        setBlogLoading(false)
    } catch(e){
        console.error(e)
    }
}

const handleNext = (blogCount, setBlogCount, blogs, setShownBlogs, setPrevFlag, setNextFlag) => {
    const exclusive = blogCount + 3
    const splitBlogs = blogs.slice(blogCount, exclusive)

    if (exclusive > 3){
        setPrevFlag(true)
    }
    if (exclusive >= blogs.length) {
        setNextFlag(false)
    }

    window.scrollTo({
        top: 0,
        left: 0,
      });
      
    setShownBlogs(splitBlogs)
    setBlogCount(exclusive)
}

const handlePrev = (blogCount, setBlogCount, blogs, setShownBlogs, setPrevFlag, setNextFlag) => {
    const exclusive = blogCount - 3
    const start = exclusive - 3
    const splitBlogs = blogs.slice(start, exclusive)
    if (start === 0){
        setPrevFlag(false)
        setNextFlag(true)
    }

    if (exclusive <= blogs.length){
        setNextFlag(true)
    }
    window.scrollTo({
        top: 0,
        left: 0,
      });
      
    setShownBlogs(splitBlogs)
    setBlogCount(exclusive)
}

const BlogPage = () => {
    const [blogs, setBlogs ] = useState()
    const [blogLoading, setBlogLoading ] = useState(true)
    const [shownBlogs, setShownBlogs ] = useState()
    const [blogCount, setBlogCount] = useState(3)
    const [nextFlag, setNextFlag ] = useState(true)
    const [prevFlag, setPrevFlag ] = useState(false)
    useEffect(() => {
        getBlogs(setBlogs, setBlogLoading, setShownBlogs)
    }, [])

    
    return(
        <>
            <MainNavBar />
            <main className="blog__page">
                {blogLoading? (
                    <LoadingScreen className={"loading__circle loading__dash"}/>
                ) : (
                    <>
                        {shownBlogs.map(blog => {
                            return (blog)
                        })}
                        <div className="next__container">
                            <div>
                                {prevFlag && (
                                    <button onClick={() => handlePrev(blogCount, setBlogCount, blogs, setShownBlogs, setPrevFlag, setNextFlag) }>
                                        Prev Page
                                    </button>
                                )}
                                {nextFlag && (
                                    <button onClick={() => handleNext(blogCount, setBlogCount, blogs, setShownBlogs, setPrevFlag, setNextFlag)}>
                                        Next Page
                                    </button>
                                )}
                            </div>
                            <p>1 of 100</p>
                        </div>
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}

export default BlogPage