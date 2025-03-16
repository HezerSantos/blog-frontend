import InputBlock from "../components/InputBlock"
import { Link } from "react-router-dom"
const LoginPage = () => {
    return (
        <>
            <main className="validation__main">
                <form onSubmit={null} className="auth__form">
                    <InputBlock 
                        id={"login__username"}
                        label={"Username: "}
                        className={"auth__input"}
                        name={"username"}
                        placeholder={"e.g Superman"}
                    />
                    <InputBlock 
                        id={"login__password"}
                        label={"Password: "}
                        className={"auth__input"}
                        name={"password"}
                        placeholder={"e.g Kryptonite1234"}
                    />
                    <button type="submit" className="auth__button">Log In</button>
                    <div className="auth__redirect">
                        <Link to="signup">Create an Account</Link>
                        <Link to="blogs">Continue as Guest</Link>   
                    </div>
                </form>
            </main>
        </>
    )
}

export default LoginPage