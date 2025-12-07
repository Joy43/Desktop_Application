import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

const apiUrl = import.meta.env.VITE_API_URL || ' https://news-portal-backend-scsp.onrender.com'
if (!apiUrl) {
  console.error('VITE_API_URL is not set! Check your .env file.')
}

const baseQueryAPI = fetchBaseQuery({
  baseUrl: apiUrl, 
  credentials: 'include',
  prepareHeaders(headers, { getState }) {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})

export const baseAPI = createApi({
  reducerPath: 'baseAPI',
  baseQuery: baseQueryAPI,
  tagTypes: [
    'category',
    'content',
    'privacy-policy',
    'terms',
    'faq',
    'contributor',
    'users',
    'ad-management',
    'plan',
    'profile',
    'language',
    'bookmark',
    'live',
    'podcast',
    'report',
    'community'
  ],
  endpoints: () => ({})
})
