import React, { useCallback, useState,useEffect } from "react"
import {useSelector} from 'react-redux'
import Card from '../Components/Card'
function Task(){
    const {currentuser} =useSelector((state)=>state.user)
    const [tasks,setTasks]=useState([]);
    const fetchTask=useCallback(async()=>{
       const res= await fetch('/api/v1/task/getAllTask',{
          method:'GET',
          headers:{
            'Content-Type':'application/json'
          },
        })
        if(!res.ok)
          {
            throw new Error("Failed to fetch data")
          }
        const data=await res.json();
        setTasks(data)
     
    },[currentuser])
    useEffect(()=>{
        if(!currentuser) return
        fetchTask();
    },[currentuser])
    return(
        <>
          <div className="p-6 text-lg">
          <h1>Welcome {currentuser.username}</h1>
          <hr/>
          <div className="mx-auto w-1/2 text-center">
             <h1>Your Task</h1>
             {(tasks.map((task,index)=>(
                <Card task={task} index={index+1} key={task._id}/>
             )))}
          </div>
          </div>
        </>
    )
}

export default Task