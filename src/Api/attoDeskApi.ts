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
    "company",
    "department",
    "coursing",
    "tax",
    "product",
    "printer"
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
    createDepartment: builder.mutation<IApiResponse, Object>({
      query: (request) => {
        return {
          url: '/department',
          method: 'POST',
          body: JSON.stringify(request),
        };
      },
      invalidatesTags: ['department'],
    }),
    createCoursing: builder.mutation<IApiResponse, Object>({
      query: (request) => {
        return {
          url: '/coursing',
          method: 'POST',
          body: JSON.stringify(request),
        };
      },
      invalidatesTags: ['coursing'],
    }),
    createTax: builder.mutation<IApiResponse, Object>({
      query: (request) => {
        return {
          url: '/tax',
          method: 'POST',
          body: JSON.stringify(request),
        };
      },
      invalidatesTags: ['tax'],
    }),
    getDepartment: builder.query<IApiResponse, void>({
      query: () => {
        return {
          url: '/department/getAll',
          method: 'POST',
        };
      },
      providesTags: ['department', "Category"],
      keepUnusedDataFor: 0,
    }),
    getCoursing: builder.query<IApiResponse, void>({
      query: () => {
        return {
          url: '/coursing/getAll',
          method: 'POST',
        };
      },
      providesTags: ['coursing', "Category"],
      keepUnusedDataFor: 0,
    }),
    getTax: builder.query<IApiResponse, void>({
      query: () => {
        return {
          url: '/tax/getAll',
          method: 'POST',
        };
      },
      providesTags: ['tax', "Category"],
      keepUnusedDataFor: 0,
    }),
    createProductBrand: builder.mutation<IApiResponse, Object>({
      query: (request) => {
        return {
          url: '/product/brand',
          method: 'POST',
          body: JSON.stringify(request),
        };
      },
      invalidatesTags: ['product'],
    }),
    createProductTag: builder.mutation<IApiResponse, Object>({
      query: (request) => {
        return {
          url: '/product/tags',
          method: 'POST',
          body: JSON.stringify(request),
        };
      },
      invalidatesTags: ['product'],
    }),
    createProductCategory: builder.mutation<IApiResponse, Object>({
      query: (request) => {
        return {
          url: '/product/category',
          method: 'POST',
          body: JSON.stringify(request),
        };
      },
      invalidatesTags: ['product'],
    }),
    createProduct: builder.mutation<IApiResponse, Object>({
      query: (request) => {
        return {
          url: '/product',
          method: 'POST',
          body: JSON.stringify(request),
        };
      },
      invalidatesTags: ['product'],
    }),
    createPrinter: builder.mutation<IApiResponse, Object>({
      query: (request) => {
        return {
          url: '/printer',
          method: 'POST',
          body: JSON.stringify(request),
        };
      },
      invalidatesTags: ['printer'],
    }),
    getCategory: builder.query<IApiResponse, void>({
      query: () => {
        return {
          url: '/category/getAll',
          method: 'POST',
        };
      },
      providesTags: ['product', "Category"],
      keepUnusedDataFor: 0,
    }),
    getProductCategory: builder.query<IApiResponse, void>({
      query: () => {
        return {
          url: '/product/category/getAll',
          method: 'POST',
        };
      },
      providesTags: ['product'],
      keepUnusedDataFor: 0,
    }),
    getProductBrand: builder.query<IApiResponse, void>({
      query: () => {
        return {
          url: '/product/brand/getAll',
          method: 'POST',
        };
      },
      providesTags: ['product'],
      keepUnusedDataFor: 0,
    }),
    getProductTag: builder.query<IApiResponse, void>({
      query: () => {
        return {
          url: '/product/tags/getAll',
          method: 'POST',
        };
      },
      providesTags: ['product'],
      keepUnusedDataFor: 0,
    }),
    getPrinter: builder.query<IApiResponse, void>({
      query: () => {
        return {
          url: '/printer/getAll',
          method: 'POST',
        };
      },
      providesTags: ['product'],
      keepUnusedDataFor: 0,
    }),
    deleteCoursing: builder.mutation<IApiResponse, string>({
      query: (Id) => {
        // return {
        //   url: `/coursing/delete?Id=${Id}`,
        //   method: 'DELETE',
        // };
        return {
          url: `/coursing/${Id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['coursing'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useLoginMutation,
  useCreateCategoryMutation,
  useCreateCompanyMutation,
  useCreateDepartmentMutation,
  useCreateCoursingMutation,
  useCreateTaxMutation,
  useGetDepartmentQuery,
  useGetCoursingQuery,
  useGetTaxQuery,
  useCreateProductBrandMutation,
  useCreateProductTagMutation,
  useCreateProductCategoryMutation,
  useCreateProductMutation,
  useCreatePrinterMutation,
  useGetCategoryQuery,
  useGetProductCategoryQuery,
  useGetProductBrandQuery,
  useGetProductTagQuery,
  useGetPrinterQuery,
  useDeleteCoursingMutation
} = attoDeskApi;
