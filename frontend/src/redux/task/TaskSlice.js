import { createSlice } from "@reduxjs/toolkit";

const initialState={
    tasks:[],
    loading:false,
    error:false
}

const TaskSlice=createSlice({
    name:'task',
    initialState,
    reducers:{
        FetchTaskStart:(state,action)=>{
           state.loading=true
        },
        FetchTask:(state,action)=>{
            state.tasks=action.payload,
            state.loading=false,
            state.error=false
        },
        FetchTaskFailure:(state,action)=>{
            state.loading=false,
            state.error=true
        },
        addNewTask:(state,action)=>{
           state.tasks.push(action.payload)
        }
    }
})

export const {FetchTask,FetchTaskStart,FetchTaskFailure,addNewTask}=TaskSlice.actions
export default TaskSlice.reducer