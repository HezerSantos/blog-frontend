import { useContext, useEffect, useState } from "react"
import MainNavBar from "../components/MainNavBar"
import Footer from "../components/Footer"
import { AuthContext } from "../../context/authContext"
import axios from "axios"
import LoadingScreen from "../components/LoadingScreen"
import SideNav from "../components/SideNav"
import { Link, useNavigate } from "react-router-dom"
import InputBlock from "../components/InputBlock"
axios.defaults.withCredentials = true;


const getUser = async(userLogin, setIsLoading) => {
    try{
        const res = await axios.get("http://localhost:8080/")
        // console.log(res)
        console.log("User Reauthenticated")
        userLogin()
        setIsLoading(false)
    } catch(e) {
        console.error(e)
    }
}

const hanldeBlog = async(e, setErrors, setSubmitLoading, setFileType) => {
    e.preventDefault()
    
    try{
        setFileType("empty")
        const formData = new FormData();
        
        // Add form fields to FormData
        formData.append('title', e.target.title.value);
        formData.append('synopsis', e.target.syn.value);
        formData.append('text', e.target.text.value);
        
        // Add the file - note that we get the file object from files[0]
        const fileInput = e.target.file;
        if (fileInput.files && fileInput.files[0]) {
            formData.append('file', fileInput.files[0]);
        }
        setSubmitLoading(true)
        const res = await axios.post("http://localhost:8080/dashboard/create-blog", 
            formData, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        
        console.log(res)
        window.location.reload()
    } catch (e) {
        console.error(e)
        setSubmitLoading(false)
        if(e.response.data.errors) setErrors(e.response.data.errors)
    }
}

const handleInput = (e, setInput, flag) => {
    if(flag){
        setInput(e.target.files[0].name)
        return
    }
    return setInput(e.target.value)
}


const CreateBlog = () => {
    const [ title, setTitle ] = useState("")
    const [text, setText] = useState("")
    const [syn, setSyn] = useState("")
    const { isAuthenticated, userLogin } = useContext(AuthContext)
    const [isLoading, setIsLoading ] = useState(true)
    const [notLoading, setNotLoading ] = useState(false)
    const [ fileType, setFileType ] = useState("empty")
    const [errors, setErrors] = useState([])
    const [ submitLoading, setSubmitLoading ] = useState(false)
    useEffect(() => {
        getUser(userLogin, setIsLoading)
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
                            <form className="blog__form" onSubmit={(e) => hanldeBlog(e, setErrors, setSubmitLoading, setFileType)}>
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
                                <button type="submit" className="submit__blog">Submit</button>
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

export default CreateBlog