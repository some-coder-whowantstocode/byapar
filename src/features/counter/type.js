import { createSlice } from "@reduxjs/toolkit";


export const producttype = createSlice({
    name:'cpt',
    initialState:{
        value:''
    },
    reducers:{
        changetype:(state,actions)=>{
            state.value = actions.payload
            console.log(state.value)
        }
    }
})


export const {changetype} = producttype.actions;

export default producttype.reducer;