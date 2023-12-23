import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../models/IUser.ts";

export const AuthService = createApi({
	reducerPath : "auth-service",
	baseQuery : fetchBaseQuery({
		baseUrl : "https://salus.the-omnia.ru/api/v3"
	}),
	endpoints : (build) => ({
		getUser : build.query<IUser, any>({
			query : () => ({
				url : "/user",
				headers : {
					"Content-Type": "application/json",
				},
				method: "GET"
			})
		})
	})
})

export const {
	useGetUserQuery
} = AuthService;