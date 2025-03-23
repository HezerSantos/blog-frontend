import { useState } from "react"
const InputBlock = ({name, id, placeholder, className, label, type=null, value, handleEvent, errorBorder, maxLength}) => {
    return (
        <>
            <div className="input__block">
                <label htmlFor={id} className={className}>
                    {label}
                </label>
                <input 
                    type={type? type : "text"} 
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    className={className}
                    onChange={handleEvent}
                    value={value}
                    style={errorBorder ? {border: "2px solid red"} : {}}
                    maxLength={maxLength}
                    required
                />
            </div>
        </>
    )
}

export default InputBlock