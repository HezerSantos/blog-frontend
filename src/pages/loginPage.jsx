import InputBlock from "../components/InputBlock"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios"
axios.defaults.withCredentials = true;

import LoadingScreen from "../components/LoadingScreen";

const login = async(e, navigate, setError, setLoginError, setIsLoading) => {
    e.preventDefault()
    try {
        setIsLoading(true)
        const res = await axios.post("http://localhost:8080/login", {
            username: e.target.username.value,
            password: e.target.password.value
        })
        console.log(res)
        navigate("/")
    } catch (e) {
        console.error(e)
        setError(e.response.data.error)
        setLoginError(true)
        setIsLoading(false)
    }
}

const handleInput = (e, setInput) => {
    setInput(e.target.value)
}

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [ error, setError ] = useState(false)
    const [ loginError, setLoginError ] = useState(false)
    const [username, setUsername ] = useState("")
    const [password, setPassword ] = useState("")
    const navigate = useNavigate()
    return (
        <>
            <form onSubmit={(e) => login(e, navigate, setError, setLoginError, setIsLoading)} className="validation__main">
                {!isLoading && (
                    <div className="auth__form">
                    <InputBlock 
                        id={"login__username"}
                        label={"Username: "}
                        className={"auth__input"}
                        name={"username"}
                        placeholder={"e.g Superman"}
                        handleEvent={(e) => handleInput(e, setUsername)}
                        errorBorder={loginError}
                    />
                    <InputBlock 
                        id={"login__password"}
                        label={"Password: "}
                        className={"auth__input"}
                        name={"password"}
                        placeholder={"e.g Kryptonite1234"}
                        handleEvent={(e) => handleInput(e, setPassword)}
                        errorBorder={loginError}
                    />
                    {error && (
                        <div className="error">{error}*</div>
                    )}
                    <button type="submit" className="auth__button">Log In</button>
                    <div className="auth__redirect">
                        <Link to="/signup">Create an Account</Link>
                        <Link to="/">Continue as Guest</Link>   
                    </div>
                </div>
                )}
                {isLoading && (
                    <div className="auth__form">
                        <LoadingScreen />
                    </div>
                )}
            </form>
        </>
    )
}

export default LoginPage