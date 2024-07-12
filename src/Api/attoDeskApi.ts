import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import { IApiResponse, ICategoryPayload, IProductPayload, ISearchIsActivePayload, ISearchPayload, IUser } from "./Interface/api.interface";
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
    "category",
    "company",
    "department",
    "coursing",
    "tax",
    "product",
    "printer",
    "productBrand",
    "productTag",
    'productCategory',
    'modifier'
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
      invalidatesTags: ['category'],
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
      invalidatesTags: ['tax', 'product', 'category'],
    }),
    
    createProductBrand: builder.mutation<IApiResponse, Object>({
      query: (request) => {
        return {
          url: '/product/brand',
          method: 'POST',
          body: JSON.stringify(request),
        };
      },
      invalidatesTags: ['productBrand','product'],
    }),
    createProductTag: builder.mutation<IApiResponse, Object>({
      query: (request) => {
        return {
          url: '/product/tags',
          method: 'POST',
          body: JSON.stringify(request),
        };
      },
      invalidatesTags: ['productTag','product'],
    }),
    createProductCategory: builder.mutation<IApiResponse, Object>({
      query: (request) => {
        return {
          url: '/product/category',
          method: 'POST',
          body: JSON.stringify(request),
        };
      },
      invalidatesTags: ['productCategory', 'product'],
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
      invalidatesTags: ['printer', 'product'],
    }),
    getCategory: builder.query<IApiResponse, void>({
      query: () => {
        return {
          url: '/category/getAll',
          method: 'POST',
        };
      },
      providesTags: ['product', "category"],
      keepUnusedDataFor: 0,
    }),
    getAddCategory: builder.query<IApiResponse, ICategoryPayload>({
      query: (request) => {
        return {
          url: '/category/getAll',
          method: "POST",
          body: request,
        };
      },
      providesTags: ['product', "category"],
      keepUnusedDataFor: 0,
    }),
    deleteCoursing: builder.mutation<IApiResponse, string>({
      query: (Id) => {
        return {
          url: `/coursing/${Id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['coursing'],
    }),
    deleteDepartment: builder.mutation<IApiResponse, string>({
      query: (Id) => {
        return {
          url: `/department/${Id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['department'],
    }),
    deletePrinter: builder.mutation<IApiResponse, string>({
      query: (Id) => {
        return {
          url: `/printer/${Id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['printer'],
    }),
    deleteProductBrand: builder.mutation<IApiResponse, string>({
      query: (Id) => {
        return {
          url: `/product/brand/${Id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['productBrand'],
    }),
    deleteProductTag: builder.mutation<IApiResponse, string>({
      query: (Id) => {
        return {
          url: `/product/tags/${Id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['productTag'],
    }),
    deleteTax: builder.mutation<IApiResponse, string>({
      query: (Id) => {
        return {
          url: `/tax/${Id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['tax'],
    }),
    deleteProductCategory: builder.mutation<IApiResponse, string>({
      query: (Id) => {
        return {
          url: `/product/category/${Id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['productCategory'],
    }),
    deleteCategory: builder.mutation<IApiResponse, string>({
      query: (Id) => {
        return {
          url: `/category/${Id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['category'],
    }),
    getProduct: builder.query<IApiResponse, IProductPayload>({
      query: (request) => {
        return {
          url: '/product/getAll',
          method: "POST",
          body: request,
        };
      },
      providesTags: ['productTag', 'product'],
      keepUnusedDataFor: 0,
    }),
    createGetAllProduct: builder.mutation<IApiResponse, Object>({
      query: (request) => {
        return {
          url: '/product/getAll',
          method: 'POST',
          body: JSON.stringify(request),
        };
      },
      invalidatesTags: ['productTag', 'product'],
    }),
    deleteProduct: builder.mutation<IApiResponse, string>({
      query: (Id) => {
        return {
          url: `/product/${Id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['product'],
    }),
    getLastProductId: builder.query<IApiResponse, void>({
      query: () => {
        return {
          url: '/product/last-id',
          method: 'GET',
        };
      },
      providesTags: ['product' ],
      keepUnusedDataFor: 0,
    }),
    createModifier: builder.mutation<IApiResponse, Object>({
      query: (request) => {
        return {
          url: '/modifier',
          method: 'POST',
          body: JSON.stringify(request),
        };
      },
      invalidatesTags: ['modifier'],
    }),
    getAllModifier: builder.query<IApiResponse, ISearchPayload>({
      query: (request) => {
        return {
          url: '/modifier/getAll',
          method: "POST",
          body: request,
        };
      },
      providesTags: ['modifier'],
      keepUnusedDataFor: 0,
    }),
    deleteModifier: builder.mutation<IApiResponse, string>({
      query: (Id) => {
        return {
          url: `/modifier/${Id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['modifier'],
    }),
    getDepartment: builder.query<IApiResponse, ISearchPayload>({
      query: (request) => {
        return {
          url: '/department/getAll',
          method: "POST",
          body: request,
        };
      },
      providesTags:['department', "category"],
      keepUnusedDataFor: 0,
    }),
    getTax: builder.query<IApiResponse, ISearchPayload>({
      query: (request) => {
        return {
          url: '/tax/getAll',
          method: "POST",
          body: request,
        };
      },
      providesTags:['tax', "category", 'product'],
      keepUnusedDataFor: 0,
    }),
    getCoursing: builder.query<IApiResponse, ISearchPayload>({
      query: (request) => {
        return {
          url: '/coursing/getAll',
          method: "POST",
          body: request,
        };
      },
      providesTags:['coursing', "category"],
      keepUnusedDataFor: 0,
    }),
    getPrinter: builder.query<IApiResponse, ISearchPayload>({
      query: (request) => {
        return {
          url: '/printer/getAll',
          method: "POST",
          body: request,
        };
      },
      providesTags:['printer', 'product' ],
      keepUnusedDataFor: 0,
    }),
    getProductTag: builder.query<IApiResponse, ISearchIsActivePayload>({
      query: (request) => {
        return {
          url: '/product/tags/getAll',
          method: "POST",
          body: request,
        };
      },
      providesTags:['productTag', 'product'],
      keepUnusedDataFor: 0,
    }),
    getProductBrand: builder.query<IApiResponse, ISearchIsActivePayload>({
      query: (request) => {
        return {
          url: '/product/brand/getAll',
          method: "POST",
          body: request,
        };
      },
      providesTags:['productBrand','product'],
      keepUnusedDataFor: 0,
    }),
    getProductCategory: builder.query<IApiResponse, ISearchIsActivePayload>({
      query: (request) => {
        return {
          url: '/product/category/getAll',
          method: "POST",
          body: request,
        };
      },
      providesTags:['productCategory','product'],
      keepUnusedDataFor: 0,
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
  useCreateProductBrandMutation,
  useCreateProductTagMutation,
  useCreateProductCategoryMutation,
  useCreateProductMutation,
  useCreatePrinterMutation,
  useGetCategoryQuery,
  useGetAddCategoryQuery,
  useDeleteCoursingMutation,
  useDeleteDepartmentMutation,
  useDeletePrinterMutation,
  useDeleteProductBrandMutation,
  useDeleteProductTagMutation,
  useDeleteTaxMutation,
  useDeleteProductCategoryMutation,
  useDeleteCategoryMutation,
  useGetProductQuery,
  useCreateGetAllProductMutation,
  useDeleteProductMutation,
  useGetLastProductIdQuery,
  useCreateModifierMutation,
  useGetAllModifierQuery,
  useDeleteModifierMutation,
  useGetTaxQuery,
  useGetCoursingQuery,
  useGetPrinterQuery,
  useGetProductTagQuery,
  useGetProductBrandQuery,
  useGetProductCategoryQuery,
} = attoDeskApi;
