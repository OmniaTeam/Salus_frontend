import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMeetup } from "../models/IMeetup";
import { ISubject } from "../models/ISubject";
import { ILecture } from "../models/ILecture";
import { ILector } from "../models/ILector";

export const DataService = createApi({
	reducerPath : "data-service",
	baseQuery : fetchBaseQuery({
		baseUrl : "https://salus.the-omnia.ru/api/v3"
	}),

	endpoints : (build) => ({
		getLecturesByDate : build.query<ILecture[], string>({
			query : (data) => ({
				url : `/meet/lecture/all?date=${data.slice(0, 10)}`,
				headers : {
					"Content-Type": "application/json",
				},
				method: "GET"
			})
		}),
		getLecture : build.query<ILecture, number>({
			query : ( meetId ) => ({
				url : `/meet/${meetId}`,
				headers : {
					"Content-Type": "application/json",
				},
				method: "GET"
			})
		}),
		updateLecture : build.mutation<any, ILecture>({
			query : ( lecture ) => ({
				url : ``,
				headers : {
					"Content-Type": "application/json",
				},
				method: "POST",
				redirect: "follow",
				body: JSON.stringify(lecture)
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
		getSubjects : build.query<ISubject[], any>({
			query : () => ({
				url : "/subject/all",
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
		}),
		getLectors : build.query<ILector[], any>({
			query : () => ({
				url : '/speaker/all',
				headers : {
					"Content-Type": "application/json",
				},
				method: "GET"
			})
		})
	})
})

export const {
	useGetLectureQuery,
	useGetLecturesByDateQuery,
	useUpdateLectureMutation,
	useGetMeetupsByDateQuery,
	useGetWorkerMeetupsQuery,
	useGetSubjectsQuery,
	useGetSubjectByIdQuery,
	useGetLectorsQuery
} = DataService;