import InputBlock from "../components/InputBlock"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import LoadingScreen from "../components/LoadingScreen";
import axios from "axios"
axios.defaults.withCredentials = true;

const signUp = async(e, navigate, setIsLoading, setErrors) => {
    e.preventDefault()
    try{
        setIsLoading(true)
        const res = await axios.post("http://localhost:8080/signup" ,{
            username: e.target.username.value,
            password: e.target.password.value,
            confirmPassword: e.target.confirmPassword.value
        })
        console.log(res)
        navigate("/login")
    } catch(e){
        setIsLoading(false)
        setErrors(Array.from(e.response.data.errors))
    }
}

const handleInput = (e, setInput) => {
    setInput(e.target.value)
}


const SignupPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername ] = useState("")
    const [password, setPassword ] = useState("")
    const [confirmPassword, setConfirmPassword ] = useState("")
    const [ errors, setErrors ] = useState([])
    const [usernameError, setUsernameError] = useState(false)
    const [ passwordError, setPasswordError ] = useState(false)

    useEffect(() => {
        const usernameError = errors.some((error) => error.path === "username");
        setUsernameError(usernameError)
        const passwordError = errors.some((error) => error.path === "password");
        const confirmPasswordError = errors.some(
          (error) => error.path === "confirmPassword"
        );
        setPasswordError(passwordError || confirmPasswordError)
    }, [errors])
    const navigate = useNavigate()
    return (
        <>
            <main className="validation__main">
                <form onSubmit={(e) => signUp(e, navigate, setIsLoading, setErrors)} className="auth__form revert__padding">
                    { !isLoading && (
                        <>
                            <InputBlock 
                                id={"signup__username"}
                                label={"Username: "}
                                className={"auth__input"}
                                name={"username"}
                                placeholder={"e.g Superman"}
                                value={username}
                                handleEvent={(e) => handleInput(e, setUsername)}
                                errorBorder = {usernameError ? usernameError : ""}
                            />
                            {errors.length > 0 && (
                                errors.map((error, index) => {
                                    if (error.path === "username"){
                                        // setUsernameError(true)
                                        return <div key={index} className="error">{error.msg}*</div>
                                    }
                                })
                            )}
                            <InputBlock 
                                id={"signup__password"}
                                label={"Password: "}
                                className={"auth__input"}
                                name={"password"}
                                placeholder={"e.g Kryptonite1234"}
                                value={password}
                                handleEvent={(e) => handleInput(e, setPassword)}
                                errorBorder = {passwordError ? passwordError : ""}
                            />
                            {errors.length > 0 && (
                                errors.map((error, index) => {
                                    if (error.path === "password"){
                                        () => setPasswordError(prev => true)
                                        return <div key={index} className="error">{error.msg}*</div>
                                    }
                                })
                            )}
                            <InputBlock 
                                id={"signup__confirm__password"}
                                label={"Confirm Password: "}
                                className={"auth__input"}
                                name={"confirmPassword"}
                                placeholder={"e.g Kryptonite1234"}
                                value={confirmPassword}
                                handleEvent={(e) => handleInput(e, setConfirmPassword)}
                                errorBorder = {passwordError ? passwordError : ""}
                            />
                            {errors.length > 0 && (
                                errors.map((error, index) => {
                                    if (error.path === "confirmPassword"){
                                        () => setPasswordError(prev => true)
                                        return <div key={index} className="error">{error.msg}*</div>
                                    }
                                })
                            )}
                            <button type="submit" className="auth__button">Sign Up</button>
                            <div className="auth__redirect">
                                <Link to="/login">Already a User?</Link>
                                <Link to="/">Continue as Guest</Link>   
                            </div>
                        </>
                    )}
                    {isLoading && (
                        <LoadingScreen className={"loading__circle"}/>
                    )}
                </form>
            </main>
        </>
    )
}

export default SignupPage
