import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMeetup } from "../models/IMeetup";
import { ISubject } from "../models/ISubject";
import { ILectureReq } from "../models/ILecture";

export const DataService = createApi({
	reducerPath : "data-service",
	baseQuery : fetchBaseQuery({
		baseUrl : "https://salus.the-omnia.ru/api/v3"
	}),
	endpoints : (build) => ({
		getLecturesByDate : build.query<ILectureReq[], string>({
			query : (data) => ({
				// 2023-12-23
				url : `/meet/lecture/all?date=${data.slice(0, 10)}T00:00:00`,
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
		}),
		getSubjectById : build.query<ISubject, number>({
			query : ( subjectId ) => ({
				url : `/subject/${subjectId}`,
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
	useGetWorkerMeetupsQuery,
	useGetSubjectByIdQuery
} = DataService;