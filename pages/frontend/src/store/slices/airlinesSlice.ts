import {createSlice} from "@reduxjs/toolkit";

type T_AirlinesSlice = {
    airline_name: string
}

const initialState:T_AirlinesSlice = {
    airline_name: "",
}


const airlinesSlice = createSlice({
    name: 'airlines',
    initialState: initialState,
    reducers: {
        updateAirlineName: (state, action) => {
            state.airline_name = action.payload
        }
    }
})

export const { updateAirlineName} = airlinesSlice.actions;

export default airlinesSlice.reducer