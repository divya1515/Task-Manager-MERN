import React, { useEffect } from 'react'
import Header from './Components/Header'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Task from './pages/Task'
import AddNewTask from './pages/AddNewTask'
import PrivateRoute from './Components/PrivateRoute'
import {signOut,signInsuccess} from './redux/user/UserSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function App(){
    const dispatch=useDispatch()
    useEffect(async()=>{
         const res=await fetch('/api/v1/users/verify',{
            method:'GET',
            headers:{
                 'Content-Type':'application/json'
            }
         })
       const data=await res.json();
       if(!res.ok)
       {
         dispatch(signOut())
       }
       else{
         dispatch(signInsuccess(data))     
       }
    },[])
    return (
        <>
         <BrowserRouter>
         <Header/>
         <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/sign-in" element={<SignIn/>}/>
         <Route path="/sign-up" element={<SignUp/>}/>
         <Route element={<PrivateRoute/>}>
             <Route path="/task" element={<Task/>}/>
             <Route path="/addNewtask" element={<AddNewTask/>}/>
         </Route>
         </Routes>
         </BrowserRouter>
        </>
    )
}
export default App