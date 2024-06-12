import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import { IApiResponse, IUser } from "./Interface/api.interface";
;

/**
 * Holds all the API callbacks
 * @returns RTK Implementation for backend
 */

export const attoDeskApi = createApi({
  reducerPath: "attoDeskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set(
        "Authorization",
        `Bearer ${localStorage.getItem("token") || ""}`
      );
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "Category",
    "company"
  ],
  endpoints: (builder) => ({  
    getUser: builder.query<IApiResponse, void>({
      query: (request) => {
        return {
          url: '/user/userInfo',
          method: 'POST',
          body: request,
        };
      },
      keepUnusedDataFor: 1,
      providesTags: ['User'],
    }),
    login: builder.mutation<IApiResponse, IUser>({
      query: (request) => {
        return {
          url: "/login",
          method: "POST",
          body: JSON.stringify(request),
        };
      },
    }),
    createCategory: builder.mutation<IApiResponse, Object>({
      query: (request) => {
        return {
          url: '/category',
          method: 'POST',
          body: JSON.stringify(request),
        };
      },
      invalidatesTags: ['Category'],
    }),
    createCompany: builder.mutation<IApiResponse, Object>({
      query: (request) => {
        return {
          url: '/company',
          method: 'POST',
          body: JSON.stringify(request),
        };
      },
      invalidatesTags: ['company'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useLoginMutation,
  useCreateCategoryMutation,
  useCreateCompanyMutation
} = attoDeskApi;
