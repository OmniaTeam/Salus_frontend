import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { AuthService } from "../services/authService";
import { DataService } from "../services/dataService";
import { IUserSlice } from "./reducers/IUserSlice";

const rootReducer = combineReducers({
	[AuthService.reducerPath] : AuthService.reducer,
	user : IUserSlice.reducer,
	// [DataService.reducerPath] : DataService.reducer
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