import React, { useEffect } from 'react'
import Header from './Components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Task from './pages/Task'
import AddNewTask from './pages/AddNewTask'
import PrivateRoute from './Components/PrivateRoute'
import { signOut, signInsuccess } from './redux/user/UserSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import EditTask from './pages/EditTask'
import useFetchTask from './hooks/useFetchTask'

function App() {
  const dispatch = useDispatch()
  const fetchTask=useFetchTask()
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/v1/users/verify', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include' 
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(signOut());
      } else {
        dispatch(signInsuccess(data));
        fetchTask()
      }
    };  
    checkAuth();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/task" element={<Task />} />
            <Route path="/addNewtask" element={<AddNewTask />} />
            <Route path="/edit/:taskId" element={<EditTask />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App