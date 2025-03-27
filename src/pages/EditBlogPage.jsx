import { useContext, useEffect, useState } from "react"
import MainNavBar from "../components/MainNavBar"
import Footer from "../components/Footer"
import { AuthContext } from "../../context/authContext"
import axios from "axios"
import LoadingScreen from "../components/LoadingScreen"
import SideNav from "../components/SideNav"
import { Link, useNavigate, useParams } from "react-router-dom"
import InputBlock from "../components/InputBlock"
import DOMPurify from 'dompurify';
import { decode } from 'he'; 
axios.defaults.withCredentials = true;


const getUser = async(userLogin, setIsLoading) => {
    try{
        const res = await axios.get("http://localhost:8080/")
        // console.log(res)
        console.log("User Reauthenticated")
        userLogin()
    } catch(e) {
        console.error(e)
    }
}

const hanldeBlog = async(e, setErrors, setSubmitLoading, setFileType, blogId, userId) => {
    e.preventDefault()
    
    try{
        
        
        const formData = new FormData();

        // Add form fields to FormData
        formData.append('title', e.target.title.value);
        formData.append('synopsis', e.target.syn.value);
        formData.append('text', e.target.text.value);
        
        // Add the file - note that we get the file object from files[0]
        const fileInput = e.target.file;
        if (fileInput.files && fileInput.files[0]) {
            setFileType("empty")
            formData.append('file', fileInput.files[0]);
        }

        // setSubmitLoading(true)
        const res = await axios.put(`http://localhost:8080/blogs/${blogId}/users/${userId}/update`, 
            formData, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        // window.location.reload()
        console.log(res)
    } catch (e) {
        console.error(e)
        setSubmitLoading(false)
        // if(e.response.data.errors) setErrors(e.response.data.errors)
    }
}

const getBlog = async(setIsLoading, blogId, userId, setTitle, setText, setSyn, navigate) => {
    try{
        const res = await axios.get(`http://localhost:8080/blogs/${blogId}/users/${userId}/edit`)
        const title = res.data.blog.title
        const text = res.data.blog.passage[0].text
        const syn = res.data.blog.synopsis

        const sanittizedSyn = DOMPurify.sanitize(syn)
        const decodedSyn = decode(sanittizedSyn)
        const sanittizedTitle = DOMPurify.sanitize(title)
        const decodedTitle = decode(sanittizedTitle)
        const sanitizedText = DOMPurify.sanitize(text)
        const decodedText = decode(sanitizedText)
        setTitle(decodedTitle)
        setText(decodedText)
        setSyn(decodedSyn)
        setIsLoading(false)
    } catch(e){
        console.error(e)
        navigate("/")
    }
        
} 

const handleInput = (e, setInput, flag) => {
    if(flag){
        setInput(e.target.files[0].name)
        return
    }
    return setInput(e.target.value)
}


const EditBlogPage = () => {
    const { blogId, userId } = useParams()
    const [ title, setTitle ] = useState("")
    const [text, setText] = useState("")
    const [syn, setSyn] = useState("")
    const { isAuthenticated, userLogin } = useContext(AuthContext)
    const [isLoading, setIsLoading ] = useState(true)
    const [notLoading, setNotLoading ] = useState(false)
    const [ fileType, setFileType ] = useState("Add to change")
    const [errors, setErrors] = useState([])
    const [ submitLoading, setSubmitLoading ] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        getUser(userLogin, setIsLoading)
        getBlog(setIsLoading, blogId, userId, setTitle, setText, setSyn, navigate)
    }, [])
    useEffect(() => {
        const timer = setTimeout(() => {
            setNotLoading(true)
        }, 3000)
    }, [])
    useEffect(() => {
        if(errors.length > 0){
            errors.forEach(error => {
                if (error.path === ""){
                    setFileType(`${error.msg}*`)
                }
            })
        }
    }, [errors])
    return(
        <>
            <MainNavBar />
            <main className="blog__creation__container">
                {isAuthenticated? (
                    isLoading? (
                        <LoadingScreen className={"loading__circle loading__create"}/>
                    ) : (
                        !submitLoading? (
                            <form className="blog__form" onSubmit={(e) => hanldeBlog(e, setErrors, setSubmitLoading, setFileType, blogId, userId)}>
                                <InputBlock 
                                    name = "title"
                                    id = "iblog__title"
                                    placeholder = "My First Time With Mocha"
                                    className = "iblog__title"
                                    label = "Title: "
                                    type = "text"
                                    value = {title}
                                    handleEvent = { (e) => handleInput(e, setTitle, false)}
                                    maxLength = {30}
                                />
                                <div className="iblog__text__container">
                                    <label htmlFor="iblog__syn" className="liblog__syn">Text: </label>
                                    <textarea onChange={(e) => handleInput(e, setSyn, false)} required maxLength="610" name="syn" id="iblog__syn" className="iblog__syn" placeholder="Synopsis:" value={syn}></textarea>
                                </div>
                                <label htmlFor="iblog__image" className="iblog__image"></label>
                                <p>File: {fileType}</p>
                                <input onChange={(e) => handleInput(e, setFileType, true)} hidden type="file" id="iblog__image" name="file"/>
                                <div className="iblog__text__container">
                                    <label htmlFor="iblog__text" className="liblog__text">Text: </label>
                                    <textarea onChange={(e) => handleInput(e, setText, false)} name="text" id="iblog__text" className="iblog__text" placeholder="Blog Text Here" value={text}></textarea>
                                </div>
                                <button type="submit" className="submit__blog">Update</button>
                            </form>
                        ) : (
                            <LoadingScreen className={"loading__circle loading__create"}/>
                        )
                    )
                ) : (
                    <>
                        {!notLoading? (
                            <LoadingScreen className={"loading__circle loading__create"}/>
                        ): (
                            <h1>Please <Link to={"/login"}>Log in</Link></h1>
                        )}
                    </>
                )}
                </main>
            <Footer />
        </>
    )
}

export default EditBlogPage