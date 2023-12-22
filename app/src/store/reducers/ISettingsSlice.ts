import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISettings } from "../../models/ISettings.ts";
import { EEventCategories } from "../../models/EEventCategories.ts";

const initialState : ISettings = {
	categories : EEventCategories.all
}

export const ISettingsSlice = createSlice({
	name : "settings",
	initialState,
	reducers : {
		setCategory : (state, action : PayloadAction<EEventCategories>) => {
			state.categories = action.payload
		}
	}
})

export const {
	setCategory
} = ISettingsSlice.actions