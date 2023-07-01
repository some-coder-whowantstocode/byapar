import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../features/counter/counterSlice";
import price from "../features/counter/price";
import typ from "../features/counter/type";

export default configureStore({
    reducer:{
        hovered:counterSlice,
        amount:price,
        cpt:typ
    },
})