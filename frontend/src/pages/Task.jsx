import React from "react"
import {useSelector} from 'react-redux'
function Task(){
    const {currentuser} =useSelector((state)=>state.user)
    console.log(currentuser)
    return(
        <>
          <div className="p-6 text-lg">
          <h1>Welcome {currentuser.username}</h1>
          <hr/>
          </div>
        </>
    )
}

export default Task