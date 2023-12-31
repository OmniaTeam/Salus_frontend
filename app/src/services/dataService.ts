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
				url : `/meet/update`,
				headers : {
					"Content-Type": "application/json",
				},
				method: "POST",
				redirect: "follow",
				body: JSON.stringify(lecture)
			})
		}),
		addNewLecture : build.mutation<any, ILecture>({
			query : ( lecture ) => ({
				url : `/admin/meet/create`,
				headers : {
					"Content-Type": "application/json",
				},
				method: "POST",
				redirect: "follow",
				body: JSON.stringify(lecture)
			})
		}),
		deleteLecture : build.query<any, number>({
			query : ( meetId ) => ({
				url : `/meet/${meetId}/delete`,
				headers : {
					"Content-Type": "application/json",
				},
				method: "GET"
			})
		}),
		getMeetupsByDate : build.query<{
			meet_id: number,
			meet_name: string,
			meet_desc: string,
			speaker_name: string,
			subject: string,
			date: string,
			platform: string,
			link: string
		}[], {speakerId : number, date : string}>({
			query : ( arg ) => ({
				url : `/speaker/${arg.speakerId}/meets/${arg.date}`,
				headers : {
					"Content-Type": "application/json",
				},
				method: "GET"
			})
		}),
		getWorker : build.query<{
			id : number,
			specialization : string,
			userId : number
		}, number>({
			query : ( userId ) => ({
				url : `worker/${userId}`,
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
		postSignUp : build.mutation<any, {
			workerId: number,
			body : {
				name : string,
				date : string,
				speakerId : number,
				meetRange : number
			}
		}>({
			query : ( args ) => ({
				url : `/worker/${args.workerId}/signup`,
				headers : {
					"Content-Type": "application/json",
				},
				method: "POST",
				redirect: "follow",
				body: JSON.stringify(args.body)
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
		}),
		getLector : build.query<{
			id : number,
			fio : string,
			subjectName : string,
			rating : number,
			userId : number,
			email : string
		}, number>({
			query : ( speakerId ) => ({
				url : `speaker/${speakerId}`,
				headers : {
					"Content-Type": "application/json",
				},
				method: "GET"
			})
		}),
		getMetrics : build.query<{name : string, value : number}[], number>({
			query : ( workerId ) => ({
				url : `/metrics/${workerId}`,
				headers : {
					"Content-Type": "application/json",
				},
				method: "GET"
			})
		}),
		getUserMeets : build.query<any, number>({
			query : ( userId ) => ({
				url : `/worker/${userId}/allmeet`,
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
	useAddNewLectureMutation,
	useDeleteLectureQuery,
	useGetMeetupsByDateQuery,
	useGetWorkerMeetupsQuery,
	useGetSubjectsQuery,
	useGetSubjectByIdQuery,
	useGetLectorsQuery,
	useGetLectorQuery,
	useGetMetricsQuery,
	useGetWorkerQuery,
	usePostSignUpMutation
} = DataService;