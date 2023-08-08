// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiBaseUrl = 'http://localhost:3001/api/v1';

// Define a service using a base URL and expected endpoints
export const bankApi = createApi({
    reducerPath: 'bankApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiBaseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token; // Access token from Redux store
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
        return headers;
        },
    }),
    // Add headers to be sent with each request
    endpoints: (builder) => ({
        auth: builder.mutation({
            query: (credentials) => ({
                url: '/user/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        getProfile: builder.mutation({
            query: () => ({
                url: '/user/profile',
                method: 'POST',
            }),
        }),
        updateUsername: builder.mutation({
            query: (newUsername) => ({
                url: '/user/profile',
                method: 'PUT',
                body: { userName: newUsername },
            }),
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAuthMutation, useGetProfileMutation, useUpdateUsernameMutation } = bankApi