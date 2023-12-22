import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DataService = createApi({
	reducerPath : "auth-service",
	baseQuery : fetchBaseQuery({
		baseUrl : "https://involutio.the-omnia.ru/api/v3"
	}),
	endpoints : (/*build*/) => ({})
})

export const {} = DataService;