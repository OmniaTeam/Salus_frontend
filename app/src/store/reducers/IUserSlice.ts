import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { EUserRole } from "../../models/EUserRole.ts";

const initialState : IUser = {
	id: 0,
	fio: "nothing",
	login : "nothing",
	role : EUserRole.none
}

export const IUserSlice = createSlice({
	name : "user",
	initialState,
	reducers : {
		setId : (state, action : PayloadAction<number>) => {
			state.id = action.payload
		},
        setName : (state, action : PayloadAction<string>) => {
			state.fio = action.payload
		},
		setLogin : (state, action : PayloadAction<string>) => {
			state.login = action.payload
		},
		setRole : (state, action : PayloadAction<EUserRole>) => {
			state.role = action.payload
		}
	}
})

export const {
	setName,
	setLogin,
	setRole,
	setId
} = IUserSlice.actions