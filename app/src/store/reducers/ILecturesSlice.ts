import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILecture, ILectures } from "../../models/ILecture";
import { DataService } from "../../services/dataService";

const initialState : ILectures = {
    value : []
}

export const ILecturesSlice = createSlice({
    name : "lectures",
    initialState,
    reducers : {
        setLecturesData : (state, action : PayloadAction<ILecture>) => {
			state.value.push(action.payload)
		},
		clearLecturesData : (state, action : PayloadAction<[]>) => {
			state.value = action.payload
		}
	},
    extraReducers(builder) {
        builder.addMatcher(
            DataService.endpoints.getLecturesByDate.matchFulfilled,
            (state, action : PayloadAction<Array<ILecture>>) => {
                state.value = action.payload
            }
        )
    }
})

export const {
    setLecturesData,
    clearLecturesData
} = ILecturesSlice.actions