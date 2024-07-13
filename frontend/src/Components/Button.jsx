import react from 'react'

function Button({
    icon,
    className,
    text

}){
    return(
        <>
        <button className={`p-3 flex items-center ${className}`}>
            {icon}
            {text}
            </button>
        </>
    )
}
export default Button