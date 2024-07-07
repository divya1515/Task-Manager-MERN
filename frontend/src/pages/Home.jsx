import React from "react";
import {Link} from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
function Home(){
    return(
        <>
         <div className="flex flex-col items-center bg-cyan-600 mx-auto  text-white  py-11">
            <h1 className="text-3xl pb-6">Welcome to Task Manager App</h1>
            <Link to="/sign-in" className="flex text-xl py-4 hover:underline cursor-pointer">
             Join Now to manage your task
            <div className="pt-1 px-2"><FaArrowRight/></div> </Link>
         </div>
        </>
    )
}

export default Home