import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import {
  signInstart,
  signInFailure,
  signInsuccess
} from "../redux/user/UserSlice";
import { useSelector, useDispatch } from 'react-redux'
function SignIn() {
  const [formData, setformData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [errmsg, seterrmsg] = useState()
  const handleChange = (e) => {
    setformData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }
  const { error, loading } = useSelector((state) => state.user)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInstart())
      const res = await fetch('/api/v1/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (!res.ok) {
        dispatch(signInFailure())
        seterrmsg(data.message)
      } else {
        dispatch(signInsuccess(data))
        navigate('/task')
      }

    } catch (err) {
      dispatch(signInFailure());
      seterrmsg("Something went wrong")
    }
  }
  useEffect(() => {
    setformData({
      email: "",
      password: ""
    })
  }, [error])
  return (
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
            disabled={loading}
            className='bg-cyan-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Loading...' : 'SignIn'}
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