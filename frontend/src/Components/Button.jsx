import react from 'react'

function Button({
    icon,
    className,
    text,
    onClick

}){
    return(
        <>
        <button className={`p-3 flex items-center ${className}`} onClick={onClick}>
            {icon}
            {text}
            </button>
        </>
    )
}
export default Button