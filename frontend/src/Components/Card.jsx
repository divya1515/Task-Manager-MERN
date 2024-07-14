import {React,useState} from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function Card(
    {task,index}
){
    const [showEditTooltip, setShowEditTooltip] = useState(false);
    const [showDeleteTooltip, setShowDeleteTooltip] = useState(false);
    return (
        <>
         <div className="flex justify-between items-center p-4 border border-gray-300 rounded-lg bg-white my-4">
           <div className="flex flex-col">
             <h1 className="text-xl text-gray-900 font-medium">Task #{index}</h1>
             <h2 className="text-gray-600">{task.description}</h2>
           </div>
            <div className="flex flex-row space-x-2">
               <div className="relative">
                    <MdEdit
                        className="text-green-700 text-2xl cursor-pointer hover:text-green-900"
                        onMouseEnter={() => setShowEditTooltip(true)}
                        onMouseLeave={() => setShowEditTooltip(false)}
                    />
                    {showEditTooltip && (
                        <div className="absolute z-10 bottom-full mb-1 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black rounded-lg px-2 py-1">
                            Edit this task
                        </div>
                    )}
                </div>
                <div className="relative">
                    <MdDelete
                        className="text-red-700 text-2xl cursor-pointer hover:text-red-900"
                        onMouseEnter={() => setShowDeleteTooltip(true)}
                        onMouseLeave={() => setShowDeleteTooltip(false)}
                    />
                    {showDeleteTooltip && (
                        <div className="absolute z-10 bottom-full mb-1 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black rounded-lg px-2 py-1">
                            Delete this task
                        </div>
                    )}
                </div>
            </div>
         </div>
        </>
    )
}

export default Card