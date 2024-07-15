import React, { useCallback, useState,useEffect } from "react"
import {useSelector,useDispatch} from 'react-redux'
import {FetchTask,FetchTaskFailure,FetchTaskStart} from '../redux/task/TaskSlice'
import Card from '../Components/Card'
function Task(){
    const {currentuser}=useSelector((state)=>state.user)
     const {tasks}=useSelector((state)=>state.task)
    const dispatch=useDispatch()
    const fetchTask=useCallback(async()=>{
      try{
      dispatch(FetchTaskStart())
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
       dispatch(FetchTask(data))
        }catch(error){
          dispatch(FetchTaskFailure())
        }
     
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
          {tasks.length!==0?
             (
              <>
             <h1>Your Task ({tasks.length})</h1>
             {tasks.map((task,index)=>(
                <Card task={task} index={index+1} key={task._id}/>
             ))}
             </>
            )
             :(
             <h1>No task found</h1>
             )}
          </div>
          </div>
        </>
    )
}

export default Task