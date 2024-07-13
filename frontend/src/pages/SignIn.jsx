import React,{useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import { Navigate } from "react-router-dom";
function SignIn(){
    const [formData,setformData]=useState({
      email:"",
      password:""
    })
    const navigate=useNavigate();
    const [error,seterror]=useState(false)
    const [user,setuser]=useState({})
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
           const res=await fetch('/api/v1/users/signin',{
             method:'POST',
             headers:{
              'Content-Type':'application/json'
             },
             body: JSON.stringify(formData)
           })
           const data=await res.json()
           console.log(data)
           if(!res.ok){
            seterror(true);
            seterrmsg(data.message)
            setsuccess("");
           }else{
            setsuccess(true);
            seterror(false);
            seterrmsg("");
            setuser(data)
            navigate('/')
           }

          }catch(err){
        seterror(true);
        seterrmsg("Something went wrong")
        setsuccess("");
       }
    }
    useEffect(()=>{
      setformData({
        email:"",
        password:""
      })
    },[error,success])
    return(
        <>
        <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Email'
            id='email'
            className='bg-slate-100 p-3 rounded-lg'
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            id='password'
            className='bg-slate-100 p-3 rounded-lg'
            value={formData.password}
            onChange={handleChange}
          />
          <button
            className='bg-cyan-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
           SignIn
          </button>
        </form>
        <div className='flex gap-2 mt-5'>
          <p>Dont Have an account?</p>
          <Link to='/sign-up'>
            <span className='text-cyan-800'>Sign up</span>
          </Link>
        </div>
        {error && <div className='text-red-700 text-lg py-4'>{errmsg}</div>}
      </div>
        </>
    )
}

export default SignIn