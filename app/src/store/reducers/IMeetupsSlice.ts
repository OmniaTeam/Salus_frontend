import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMeetup, IMeetups } from "../../models/IMeetup";

const initialState : IMeetups = {
    value : []
}

export const IMeetupsSlice = createSlice({
    name : "meetups",
    initialState,
    reducers : {
        setMeetupsData : (state, action : PayloadAction<IMeetup>) => {
			state.value.push(action.payload)
		},
		clearMeetupsData : (state, action : PayloadAction<[]>) => {
			state.value = action.payload
		}
	}
})

export const {
    setMeetupsData,
    clearMeetupsData
} = IMeetupsSlice.actions