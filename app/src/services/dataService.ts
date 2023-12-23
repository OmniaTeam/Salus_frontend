import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILecture } from "../models/ILecture";
import { IMeetup } from "../models/IMeetup";

export const DataService = createApi({
	reducerPath : "data-service",
	baseQuery : fetchBaseQuery({
		baseUrl : "https://salus.the-omnia.ru/api/v3"
	}),
	endpoints : (build) => ({
		getLecturesByDate : build.query<ILecture[], any>({
			query : () => ({
				url : "/",
				headers : {
					"Content-Type": "application/json",
				},
				method: "GET"
			})
		}),
		getMeetupsByDate : build.query<IMeetup[], any>({
			query : () => ({
				url : "/",
				headers : {
					"Content-Type": "application/json",
				},
				method: "GET"
			})
		}),
		getWorkerMeetups : build.query<IMeetup[], number>({
			query : ( workerId ) => ({
				url : `/${workerId}`,
				headers : {
					"Content-Type": "application/json",
				},
				method: "GET"
			})
		})
	})
})

export const {
	useGetLecturesByDateQuery,
	useGetMeetupsByDateQuery,
	useGetWorkerMeetupsQuery
} = DataService;