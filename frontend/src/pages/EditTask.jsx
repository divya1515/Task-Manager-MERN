import React, { useState } from 'react'
import Button from '../Components/Button'
import useFetchTask from '../hooks/useFetchTask';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
function EditTask() {
    const { taskId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const task = location.state?.task;
    const [desc, setdesc] = useState(task ? task.description : "");
    const dispatch = useDispatch();
    const fetchTask = useFetchTask(); 
    const handleChange = (e) => {
        setdesc(e.target.value)
    }
    const EditTask = async () => {
        try {
            const res = await fetch(`/api/v1/task/editTask/${taskId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ description: desc })
            })
            if (res.ok) {
                fetchTask()
                navigate('/task');
            }
        } catch (error) {
            alert("Sorry");
            navigate('/task')
        }

    }
    const Cancel = () => {
        setdesc("");
        navigate('/task')
    }
    const ResetTask = () => {
        setdesc(task ? task.description : "");
        navigate('/task')
    }
    return (
        <>
            <div className='flex justify-center'>
                <div className=' border-2 border-gray-200 p-4'>
                    <div className='flex justify-center p-4 '>
                        <h1>Edit Task</h1>
                    </div>
                    <h2 className="pb-4">Description</h2>
                    <textarea
                        placeholder="Write here..."
                        className='w-96 h-40 p-2 border border-gray-300 rounded placeholder-top'
                        value={desc}
                        onChange={handleChange}
                    />
                    <div className='flex space-x-4 pt-6'>
                        <Button text="Update Task" className="bg-sky-600 text-white" onClick={EditTask} />
                        <Button text="Cancel" className="bg-red-600 text-white" onClick={Cancel} />
                        <Button text="Reset" className="bg-sky-800 text-white" onClick={ResetTask} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditTask