import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EEventCategories } from "../../models/EEventCategories";
import { ILecture } from "../../models/ILecture";

const initialState : ILecture = {
    meet_id: 0,
    meet_name: "nothing",
    subject: EEventCategories.all,
    speaker_name: "nothing",
    date: "00-00-0000",
    time: "00-00",
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
        setLectureCategory : (state, action : PayloadAction<EEventCategories>) => {
            state.subject = action.payload
        },
        setLectorName : (state, action : PayloadAction<string>) => {
            state.speaker_name = action.payload
        },
        setLectureDate : (state, action : PayloadAction<string>) => {
            state.date = action.payload
        },
        setLectureTime : (state, action : PayloadAction<string>) => {
            state.time = action.payload
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
    setLectureTime,
    setLecturePlatform,
    setLectureLink
} = ILectureSlice.actions