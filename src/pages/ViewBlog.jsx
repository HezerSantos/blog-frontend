import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../context/authContext"
import MainNavBar from "../components/MainNavBar"
import Footer from "../components/Footer"
import LoadingScreen from "../components/LoadingScreen"
import DOMPurify from 'dompurify';
import { decode } from 'he'; 

const getBlogById = async(id, setBlog, setIsLoading, setTitle, setSyn, setImage, setText) => {
    try{
        const res = await axios.get(`https://blog-backend-production-6a28.up.railway.app/blogs/${id}`)
        const blog = res.data.blog

        const title = blog.title
        const text = blog.passage[0].text
        const syn = blog.synopsis
        const sanittizedTitle = DOMPurify.sanitize(title)
        const decodedTitle = decode(sanittizedTitle)
        const sanittizedText = DOMPurify.sanitize(text)
        const decodedText = decode(sanittizedText)
        const sanittizedSyn = DOMPurify.sanitize(syn)
        const decodedSyn = decode(sanittizedSyn)

        blog.title = decodedTitle
        blog.synopsis = decodedSyn
        blog.passage[0].text = decodedText

        let url=""
        if (blog.image[0]){
            url = blog.image[0].url
        }
        setImage(url)
        setBlog(blog)
        setIsLoading(false)
        // console.log(res)
    } catch(e) {
        console.error(e)
    }
}

const getUser = async(userLogin) => {
    try{
        const res = await axios.get("https://blog-backend-production-6a28.up.railway.app/")
        // console.log(res)
        console.log("User Reauthenticated")
        userLogin()
    } catch(e) {
        console.error(e)
    }
}

const ViewBlog = () => {
    const { id: blogId } = useParams()
    const [ blog, setBlog ] = useState(null)
    const { isAuthenticated, userLogin } = useContext(AuthContext)
    const [isLoading, setIsLoading ] = useState(true)
    const [ title, setTitle ] = useState("")
    const [ syn, setSyn ]= useState("")
    const [ image, setImage ] = useState()
    const [ text, setText ] = useState("")
    
    useEffect(() => {
        getUser(userLogin)
        getBlogById(blogId, setBlog, setIsLoading, setTitle, setSyn, setImage, setText)
    }, [])
    return(
        <>
            <MainNavBar />
            <main className="blog__show">
                {!isLoading? (
                    <>
                        <h1 className="blog__header page">{blog.title}</h1>
                        <p className="sblog__text">{blog.synopsis}</p>
                        <img src={image} className="sblog__image" alt="" />
                        <p className="sblog__text">{blog.passage[0].text}</p>
                        <Link to="/" className="go__home">Go Home</Link>
                    </>
                ) : (
                    <>
                        <LoadingScreen className={"loading__circle loading__create"}/>
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}

export default ViewBlog