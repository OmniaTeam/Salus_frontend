import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILecture } from "../../models/ILecture";

const initialState : ILecture = {
    meet_id: 0,
    meet_name: "nothing",
    subject: 0,
    speaker_name: "nothing",
    date: "00-00-0000",
    platform: "nothing",
    link: "nothing"
}

export const ILectureSlice = createSlice({
    name : 'lecture',
    initialState,
    reducers : {
        setLectureId : (state, action : PayloadAction<number>) => {
            state.meet_id = action.payload
        },
        setLectureTopic : (state, action : PayloadAction<string>) => {
            state.meet_name = action.payload
        },
        setLectureCategory : (state, action : PayloadAction<number>) => {
            state.subject = action.payload
        },
        setLectorName : (state, action : PayloadAction<string>) => {
            state.speaker_name = action.payload
        },
        setLectureDate : (state, action : PayloadAction<string>) => {
            state.date = action.payload
        },
        setLecturePlatform : (state, action : PayloadAction<string>) => {
            state.platform = action.payload
        },
        setLectureLink : (state, action : PayloadAction<string>) => {
            state.link = action.payload
        }
    }
})

export const {
    setLectureId,
    setLectureTopic,
    setLectorName,
    setLectureCategory,
    setLectureDate,
    setLecturePlatform,
    setLectureLink
} = ILectureSlice.actions