import { baseAPI } from '@renderer/redux/api/baseApi'
export const userApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    // -------- register --------
    register: build.mutation({
      query: (data: { email: string; password: string }) => ({
        url: '/auth/register',
        method: 'POST',
        body: data
      })
    }),

    // --------- login ---------
    login: build.mutation({
      query: (data: { email: string; password: string }) => ({
        url: '/auth/login',
        method: 'POST',
        body: data
      })
    }),
// --------- verify otp ---------
  verifyOTP: build.mutation({
      query: (data) => ({
        url: "/auth/signup-verify-otp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),
// --------- forgot password ---------
    forgotPassword: build.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),


  }),

  })

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyOTPMutation,
  useForgotPasswordMutation,
} = userApi

