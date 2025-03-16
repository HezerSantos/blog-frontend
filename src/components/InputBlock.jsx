const InputBlock = ({name, id, placeholder, className, label, type=null}) => {
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
                />
            </div>
        </>
    )
}

export default InputBlock