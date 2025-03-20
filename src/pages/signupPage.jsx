import InputBlock from "../components/InputBlock"
import { Link } from "react-router-dom"
import axios from "axios"
axios.defaults.withCredentials = true;

const signUp = async(e) => {
    e.preventDefault()
    try{
        const res = await axios.post("http://localhost:8080/signup" ,{
            username: e.target.username.value,
            password: e.target.password.value,
            confirmPassowrd: e.target.confirmPassword.value
        })
        console.log(res)
    } catch(e){
        console.log(e)
    }
}
const SignupPage = () => {
    return (
        <>
            <main className="validation__main">
                <form onSubmit={signUp} className="auth__form revert__padding">
                    <InputBlock 
                        id={"signup__username"}
                        label={"Username: "}
                        className={"auth__input"}
                        name={"username"}
                        placeholder={"e.g Superman"}
                    />
                    <InputBlock 
                        id={"signup__password"}
                        label={"Password: "}
                        className={"auth__input"}
                        name={"password"}
                        placeholder={"e.g Kryptonite1234"}
                    />
                    <InputBlock 
                        id={"signup__confirm__password"}
                        label={"Confirm Password: "}
                        className={"auth__input"}
                        name={"confirmPassword"}
                        placeholder={"e.g Kryptonite1234"}
                    />
                    <button type="submit" className="auth__button">Sign Up</button>
                    <div className="auth__redirect">
                        <Link to="/">Already a User?</Link>
                        <Link to="/home">Continue as Guest</Link>   
                    </div>
                </form>
            </main>
        </>
    )
}

export default SignupPage