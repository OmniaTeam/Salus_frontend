import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILector, ILectors } from "../../models/ILector";

const initialState : ILectors = {
    value : []
}

export const ILectorsSlice = createSlice({
    name : "lectors",
    initialState,
    reducers : {
        setLectorsData : (state, action : PayloadAction<ILector>) => {
			state.value.push(action.payload)
		},
		clearLectorsData : (state, action : PayloadAction<[]>) => {
			state.value = action.payload
		}
    }
})

export const {
    setLectorsData,
    clearLectorsData
} = ILectorsSlice.actions