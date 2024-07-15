import React, { useState } from 'react'
import Button from '../Components/Button'
import { useNavigate } from 'react-router-dom';
import { addNewTask } from '../redux/task/TaskSlice';
import { useDispatch, useSelector } from 'react-redux';
function AddNewTask(){
    const [desc,setdesc]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const {currentuser}=useSelector((state)=>state.user)
    const handleChange=(e)=>{
        setdesc(e.target.value)
    }
    const AddTask=async()=>{
        try{
        const res=await fetch('/api/v1/task/addTask',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({description:desc})
        })
        const data=await res.json();
        console.log(res)
        if(res.ok){
        dispatch(addNewTask(data.data))
        navigate('/task');
        }
    }catch(error){
     alert("Sorry");
     navigate('/task')
    }

    }
    const Cancel=(e)=>{
       setdesc("");
       navigate('/task')
    }
    return(
        <>
        <div className='flex justify-center'>
            <div className=' border-2 border-gray-200 p-4'>
             <div className='flex justify-center p-4 '>
             <h1>Add New Task</h1>
             </div>
             <h2 className="pb-4">Description</h2>
             <textarea
             placeholder="Write here..."
             className='w-96 h-40 p-2 border border-gray-300 rounded placeholder-top'
             value={desc}
             onChange={handleChange}
             />
             <div className='flex space-x-4 pt-6'>
                 <Button text="Add Task" className="bg-sky-600 text-white" onClick={AddTask}/>
                 <Button text="Cancel" className="bg-red-600 text-white" onClick={Cancel}/>
             </div>
             </div>
        </div>
        </>
    )
}

export default AddNewTask