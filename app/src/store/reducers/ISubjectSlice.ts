import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISubject } from "../../models/ISubject";

const initialState : ISubject = {
    id: 0,
    name: "nothing"
}

export const ISubjectSlice = createSlice({
    name : 'subject',
    initialState,
    reducers : {
        setSubjectId : (state, action : PayloadAction<number>) => {
            state.id = action.payload
        },
        setSubjectName : (state, action : PayloadAction<string>) => {
            state.name = action.payload
        }
    }
})

export const {
    setSubjectId,
    setSubjectName
} = ISubjectSlice.actions