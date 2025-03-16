import InputBlock from "../components/InputBlock"
import { Link } from "react-router-dom"
const SignupPage = () => {
    return (
        <>
            <main className="validation__main">
                <form onSubmit={null} className="auth__form revert__padding">
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
                    <button type="submit" className="auth__button">Log In</button>
                    <div className="auth__redirect">
                        <Link to="/">Sign In</Link>
                        <Link to="blogs">Continue as Guest</Link>   
                    </div>
                </form>
            </main>
        </>
    )
}

export default SignupPage