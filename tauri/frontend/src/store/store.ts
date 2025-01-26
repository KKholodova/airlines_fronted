import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import airlinesReducer from "./slices/airlinesSlice.ts"

export const store = configureStore({
    reducer: {
        airlines: airlinesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;