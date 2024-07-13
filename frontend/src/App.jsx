import React from 'react'
import Header from './Components/Header'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Task from './pages/Task'
import PrivateRoute from './Components/PrivateRoute'

function App(){
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
         </Route>
         </Routes>
         </BrowserRouter>
        </>
    )
}
export default App