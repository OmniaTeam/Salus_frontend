import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EEventCategories } from "../../models/EEventCategories";
import { ILector } from "../../models/ILector";

const initialState : ILector = {
    id: 0,
    fio: "nothing",
    subjectName: EEventCategories.all,
    rating: 0
}

export const ILectorSlice = createSlice({
    name : "lector",
    initialState,
    reducers : {
        setLectorId : (state, action : PayloadAction<number>) => {
            state.id = action.payload
        },
        setLectorFio : (state, action : PayloadAction<string>) => {
            state.fio = action.payload
        },
        setLectorSubjectName : (state, action : PayloadAction<EEventCategories>) => {
            state.subjectName = action.payload
        },
        setLectorRating : (state, action : PayloadAction<number>) => {
            state.rating = action.payload
        }
    }
})

export const {
    setLectorId,
    setLectorFio,
    setLectorSubjectName,
    setLectorRating
} = ILectorSlice.actions