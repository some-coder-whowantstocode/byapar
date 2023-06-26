import { createSlice } from "@reduxjs/toolkit";

export const ishoverd = createSlice({
    name:'hoverd',
    initialState:{
        value:false
    },
    reducers:{
        change:(state,actions)=>{
           state.value = actions.payload
            // console.log(actions)
        }
    }
})

export const {change} = ishoverd.actions

export default ishoverd.reducer