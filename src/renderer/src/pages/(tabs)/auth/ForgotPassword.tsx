'use client'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForgotPasswordMutation } from '@renderer/redux/features/auth/auth.api'

// ✅ Zod Schema
const forgotSchema = z.object({
  email: z.string().email('Invalid email address')
})

type ForgotSchemaType = z.infer<typeof forgotSchema>

const ForgotPasswordModal: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [forgotPassword] = useForgotPasswordMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ForgotSchemaType>({
    resolver: zodResolver(forgotSchema)
  })

  const onSubmit = async (data: ForgotSchemaType) => {
    setLoading(true)
    try {
      const result = await forgotPassword(data).unwrap()

      if (result) {
        // Store email and resetToken for password reset
        localStorage.setItem('resetEmail', data.email)
        if (result.resetToken) {
          localStorage.setItem('resetToken', result.resetToken)
        }

        toast.success('Reset link sent successfully!')
        reset()

        // Navigate to reset password page
        navigate('/auth/reset-password')
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to send reset link')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#113146] flex justify-center items-center px-4">
      {/* Modal Box */}
      <div className="w-full max-w-xl bg-[#FAFDFF] p-6 shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={() => navigate('/auth/login')}
          className="absolute top-3 right-3 text-2xl font-bold hover:text-gray-700"
        >
          ×
        </button>

        {/* Header */}
        <h2 className="text-xl lg:text-2xl font-bold text-accent-orange text-center mb-1">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          Enter your email to send the reset link.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-none bg-[#EDEFF0] border-none shadow-none py-3 px-4 outline-none"
              {...register('email')}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-brick-red hover:bg-[#7c2d22] text-white px-6 py-2 text-sm rounded-none border border-[#62180F] w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Continue'}
          </button>

          {/* Back to Login */}
          <p className="text-sm text-center">
            Remember your password?{' '}
            <span
              onClick={() => navigate('/auth/login')}
              className="text-brick-red font-semibold cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordModal
