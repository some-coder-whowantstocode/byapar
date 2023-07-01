import { createSlice } from "@reduxjs/toolkit";

export const price  = createSlice({
    name:'amount',
    initialState:{
        value:{
            max:999999999
        }
    },
    reducers:{
        changeamount:(state,actions)=>{
            state.value.max = actions.payload.max;
            // console.log(actions) 
        }
    }
})


export const {changeamount} = price.actions;

export default price.reducer;
