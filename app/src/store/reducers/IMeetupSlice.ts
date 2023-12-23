import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMeetup } from "../../models/IMeetup";

const initialState: IMeetup = {
    id: 0,
    meetupName: "nothing",
    workerName: "nothing",
    date: "00-00-0000",
    time: "00-00",
    link: "nothing"
} 

export const IMeetupSlice = createSlice({
    name : 'meetup',
    initialState,
    reducers : {
        setMeetupId : (state, action : PayloadAction<number>) => {
            state.id = action.payload
        },
        setMeetupName : (state, action : PayloadAction<string>) => {
            state.meetupName = action.payload
        },
        setWorkerName : (state, action : PayloadAction<string>) => {
            state.workerName = action.payload
        },
        setMeetupDate : (state, action : PayloadAction<string>) => {
            state.date = action.payload
        },
        setMeetupTime : (state, action : PayloadAction<string>) => {
            state.time = action.payload
        },
        setMeetupLink : (state, action : PayloadAction<string>) => {
            state.link = action.payload
        }
    }
})

export const {
    setMeetupId,
    setMeetupName,
    setWorkerName,
    setMeetupDate,
    setMeetupTime,
    setMeetupLink
} = IMeetupSlice.actions