import { useState, useEffect, version } from "react"
import InputBlock from "../components/InputBlock"
import axios from "axios"
axios.defaults.withCredentials = true;

const handleInput = (e, setInput) => {
    setInput(e.target.value)
}

const toggleModal = (e, setUpdateFlag) => {
    e.preventDefault()
    setUpdateFlag(prev => !prev)
}

const updateProfile = async(e, username, password, confirmPassword, verify, setUsername, setConfirmPassword, setPassword, setVerify, setErrors, setUpdateFlag) =>{
    e.preventDefault()
    try{
        const res = await axios.put("https://blog-backend-production-6a28.up.railway.app/settings/update-profile", {
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            verify: verify
        })
        // console.log(res)
        setUsername("")
        setPassword("")
        setConfirmPassword("")
        setVerify("")
        setUpdateFlag(false)
    } catch(error){
        console.error(error)
        setErrors(Array.from(error.response.data.errors))
    }
}

const ChangeCredentials = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername ] = useState("")
    const [password, setPassword ] = useState("")
    const [confirmPassword, setConfirmPassword ] = useState("")
    const [ errors, setErrors ] = useState([])
    const [usernameError, setUsernameError] = useState(false)
    const [ passwordError, setPasswordError ] = useState(false)
    const [verifyError, setVerifyError ] = useState(false)
    const [verify, setVerify] = useState("")
    const [updateFlag, setUpdateFlag] = useState(false)
    useEffect(() => {
        const usernameError = errors.some((error) => error.path === "username");
        setUsernameError(usernameError)
        const passwordError = errors.some((error) => error.path === "password");
        const confirmPasswordError = errors.some(
          (error) => error.path === "confirmPassword"
        );
        setPasswordError(passwordError || confirmPasswordError)
        const verifyError = errors.some((error) => error.path === "verify")
        setVerifyError(verifyError)

        if(usernameError || passwordError || confirmPassword){
            verifyError? setUpdateFlag(true) : setUpdateFlag(false)
        }

    }, [errors])

    return (
        <>
            <div>
                <InputBlock 
                    id={"signup__username"}
                    label={"Username: "}
                    className={"change"}
                    name={"username"}
                    placeholder={"e.g Superman"}
                    value={username}
                    handleEvent={(e) => handleInput(e, setUsername)}
                    errorBorder = {usernameError ? usernameError : ""}
                />
                {errors.length > 0 && (
                    errors.map((error, index) => {
                        if (error.path === "username"){
                            return <div key={index} className="error red">{error.msg}*</div>
                        }
                    })
                )}
                <InputBlock 
                    id={"signup__password"}
                    label={"Password: "}
                    className={"change"}
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
                            return <div key={index} className="error red">{error.msg}*</div>
                        }
                    })
                )}
                <InputBlock 
                    id={"signup__confirm__password"}
                    label={"Confirm Password: "}
                    className={"change"}
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
                            return <div key={index} className="error red">{error.msg}*</div>
                        }
                    })
                )}
                <button onClick={(e) => toggleModal(e, setUpdateFlag)} className="change">Update Profile</button>
            </div>
            {updateFlag && (
                <div className="modal">
                    <form onSubmit={(e) => updateProfile(e, username, password, confirmPassword, verify, setUsername, setConfirmPassword, setPassword, setVerify, setErrors, setUpdateFlag)}>
                        <InputBlock 
                            id={"verify"}
                            label={"Reenter old password: "}
                            className={"change"}
                            name={"verify"}
                            placeholder={"old password"}
                            value={verify}
                            handleEvent={(e) => handleInput(e, setVerify)}
                            errorBorder={verifyError? verifyError : ""}
                        />
                        {errors.length > 0 && (
                            errors.map((error, index) => {
                                if (error.path === "verify"){
                                    return <div key={index} className="error red">{error.msg}*</div>
                                }
                            })
                        )}
                        <button type="submit" className="change">Confirm</button>
                        <button onClick={(e) => toggleModal(e, setUpdateFlag)} type="submit" className="back">Back</button>
                    </form>
                </div>
            )}
        </>
    )
}

export default ChangeCredentials