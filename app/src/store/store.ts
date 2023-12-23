import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { AuthService } from "../services/authService";
import { DataService } from "../services/dataService";
import { IUserSlice } from "./reducers/IUserSlice";
import { ISettingsSlice } from "./reducers/ISettingsSlice";
import { ILectureSlice } from "./reducers/ILectureSlice";
import { ILecturesSlice } from "./reducers/ILecturesSlice";
import { IMeetupSlice } from "./reducers/IMeetupSlice";
import { IMeetupsSlice } from "./reducers/IMeetupsSlice";

const rootReducer = combineReducers({
	[AuthService.reducerPath] : AuthService.reducer,
	user : IUserSlice.reducer,
	settings : ISettingsSlice.reducer,
	[DataService.reducerPath] : DataService.reducer,
	lecture : ILectureSlice.reducer,
	lectures : ILecturesSlice.reducer,
	meetup : IMeetupSlice.reducer,
	meetups : IMeetupsSlice.reducer
})

export const setupStore = () => configureStore({
	reducer : rootReducer,
	middleware : (getDefaultMiddleware) => {
		return getDefaultMiddleware().prepend(AuthService.middleware).prepend(DataService.middleware)
	}
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']