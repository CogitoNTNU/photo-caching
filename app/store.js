import { configureStore } from "@reduxjs/toolkit";
import camReducer from './slices/camSlice';

export const store = configureStore({
    reducer: {
        cam: camReducer
    }
})