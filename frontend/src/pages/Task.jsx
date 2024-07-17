import React, { useCallback, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { FetchTask, FetchTaskFailure, FetchTaskStart } from '../redux/task/TaskSlice'
import Card from '../Components/Card'
import { useLocation } from "react-router-dom"
function Task() {
  const { currentuser } = useSelector((state) => state.user)
  const { tasks, loading, error } = useSelector((state) => state.task);
  const dispatch = useDispatch()
  const location = useLocation()
  
  return (
      <div className="p-6 text-lg">
        <h1>Welcome {currentuser.username}</h1>
        <hr />
        <div className="mx-auto w-1/2 text-center">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching tasks</p>
        ) : Array.isArray(tasks) && tasks.length > 0 ? (
          <>
            <h1>Your Tasks ({tasks.length})</h1>
            {tasks.map((task, index) => (
              <Card task={task} index={index + 1} key={task._id} />
            ))}
          </>
        ) : (
          <h1>No tasks found</h1>
        )}
      </div>
    </div>
  );
};

export default Task;