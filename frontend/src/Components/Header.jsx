import React from 'react'
import { Link } from 'react-router-dom';


function Header() {
    return (
        <>
            <div className="flex justify-between items-center p-6 bg-white text-xl">
                <Link to="/">
                    <h1 className="cursor-pointer uppercase font-medium">TASK MANAGER</h1>
                </Link>
                <Link to="/sign-in">
                    <h1 className="cursor-pointer text-cyan-600 font-bold text-xl">LOGIN</h1>
                </Link>
            </div>

        </>
    )
}
export default Header