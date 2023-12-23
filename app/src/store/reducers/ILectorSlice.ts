import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EEventCategories } from "../../models/EEventCategories";
import { ILector } from "../../models/ILector";

const initialState : ILector = {
    id: 0,
    lectorName: "nothing",
    lectorCategory: EEventCategories.all,
    rating: 0
}

export const ILectorSlice = createSlice({
    name : "lector",
    initialState,
    reducers : {
        setLectorId : (state, action : PayloadAction<number>) => {
            state.id = action.payload
        },
        setLectorName : (state, action : PayloadAction<string>) => {
            state.lectorName = action.payload
        },
        setLectorCategory : (state, action : PayloadAction<EEventCategories>) => {
            state.lectorCategory = action.payload
        },
        setLectorRating : (state, action : PayloadAction<number>) => {
            state.rating = action.payload
        }
    }
})

export const {
    setLectorId,
    setLectorName,
    setLectorCategory,
    setLectorRating
} = ILectorSlice.actions