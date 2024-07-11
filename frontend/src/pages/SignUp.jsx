import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
function SignUp() {
    const [formData,setformData]=useState({
        username:'',
        email:'',
        password:""
    })
    const navigate=useNavigate()
    const [error,seterror]=useState(false)
    const [errmsg,seterrmsg]=useState()
    const [success,setsuccess]=useState("")
    const handleChange=(e)=>{
        setformData((prev)=>({
             ...prev,
             [e.target.id]:e.target.value
        }))
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
        seterror(false)
        setsuccess("")
        const res=await fetch('/api/v1/users/register',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(formData)
        })
        const data=await res.json();
        if(!res.ok)
        {
            seterror(true);
            seterrmsg(data.message)
            setsuccess("");
        }
        else
        {
            setsuccess(data.message);
            seterror(false);
            seterrmsg("");

        }
        navigate('/sign-in')
    }catch(error){
        seterror(true);
         seterrmsg("Something went wrong")
         setsuccess("");
    }
    }
    useEffect(()=>{
        setformData({
            username: '',
            email: '',
            password: ''
        })
    },[errmsg,success])
    return (
        <>
            <div className='p-3 max-w-lg mx-auto'>
                <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Username'
                        id='username'
                        value={formData.username}
                        className='bg-slate-100 p-3 rounded-lg'
                        onChange={handleChange}
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        id='email'
                        value={formData.email}
                        className='bg-slate-100 p-3 rounded-lg'
onChange={handleChange}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        id='password'
                        value={formData.password}
                        className='bg-slate-100 p-3 rounded-lg'
onChange={handleChange}
                    />
                    <button

                        className='bg-cyan-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                        SignUp
                    </button>

                </form>
                <div className='flex gap-2 mt-5'>
                    <p>Have an account?</p>
                    <Link to='/sign-in'>
                        <span className='text-cyan-800'>Sign in</span>
                    </Link>
                </div>
                {error && <div className='text-red-700 text-lg py-4'>{errmsg}</div>}
                {success && <div className='text-green-700 text-lg py-4'>{success}</div>}

            </div>
        </>
    )
}

export default SignUp