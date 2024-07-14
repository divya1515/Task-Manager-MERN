import React, { useState } from 'react'
import Button from '../Components/Button'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
function AddNewTask(){
    const [desc,setdesc]=useState();
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const {currentuser}=useSelector((state)=>state.user)
    const handleChange=(e)=>{
        console.log(currentuser);
        setdesc(e.taget.value)
    }
    const Add=(e)=>{
        e.preventDefault();
        
    }
    const Cancel=(e)=>{
       e.preventDefault();
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
                 <Button text="Add Task" className="bg-sky-600 text-white" onClick={Add}/>
                 <Button text="Cancel" className="bg-red-600 text-white" onClick={Cancel}/>
             </div>
             </div>
        </div>
        </>
    )
}

export default AddNewTask