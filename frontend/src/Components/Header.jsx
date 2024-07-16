import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/user/UserSlice'
import Button from './Button'

import { IoIosAddCircle } from "react-icons/io";

function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentuser } = useSelector((state) => state.user)

    const handleLogout = async () => {
        const res = await fetch('/api/v1/users/signOut', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        console.log(res)
        dispatch(signOut());
        navigate("/")

    }
    return (
        <>
            <div className="flex justify-between items-center p-6 bg-white text-lg">
                <Link to="/">
                    <h1 className="cursor-pointer uppercase font-bold">TASK MANAGER</h1>
                </Link>
                {currentuser ?
                    <div className='flex items-center space-x-6'>
                        <Link to="/addNewtask">
                            <Button icon={<IoIosAddCircle />} className={`rounded-lg bg-cyan-600 text-white text-base`} text="ADD ITEM" /></Link>
                        <Link to="/sign-out" onClick={handleLogout}>
                            <h1 className='cursor-pointer text-cyan-600 font-medium text-lg'>LOGOUT</h1>
                        </Link>
                    </div>
                    :
                    <Link to="/sign-in">
                        <h1 className="cursor-pointer text-cyan-600 font-bold text-xl">
                            LOGIN
                        </h1>
                    </Link>}
            </div>

        </>
    )
}
export default Header