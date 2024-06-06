import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import { IApiResponse, IUser } from "./Interface/api.interface";
;

/**
 * Holds all the API callbacks
 * @returns RTK Implementation for backend
 */

export const attoDeskApi = createApi({
  reducerPath: "posApi",
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
    "UserManagement",
    "dashboard",
    "Driver",
    "user",
    "Vehicle",
  ],
  endpoints: (builder) => ({  
    login: builder.mutation<IApiResponse, IUser>({
      query: (request) => {
        return {
          url: "/login/authenticate",
          method: "POST",
          body: JSON.stringify(request),
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
} = attoDeskApi;
