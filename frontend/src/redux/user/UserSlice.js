import { createSlice } from "@reduxjs/toolkit"

const initialState={
    currentuser:null,
    loading:false,
    error:false
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInstart:(state)=>{
            state.loading=true;
        },
        signInsuccess:(state,action)=>{
            state.currentuser=action.payload,
            state.loading=false,
            state.error=false
        },
        signInFailure:(state,action)=>{
           state.loading=false,
           state.error=true
        }
    }
})

export const {signInstart,signInsuccess,signInFailure}=userSlice.actions
export default userSlice.reducer