'use client'

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useResetPasswordMutation } from '@renderer/redux/features/auth/auth.api'

// Zod Validation Schema
const resetSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

type ResetPasswordType = z.infer<typeof resetSchema>

const ResetPasswordModal: React.FC = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  const [resetPassword] = useResetPasswordMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(resetSchema)
  })

  useEffect(() => {
    // Get email and resetToken from localStorage
    const storedEmail = localStorage.getItem('resetEmail')
    const resetToken = localStorage.getItem('resetToken')

    if (!storedEmail || !resetToken) {
      toast.error('Session expired. Please request a new reset link.')
      navigate('/auth/forgot-password')
      return
    }

    setEmail(storedEmail)
  }, [navigate])

  const onSubmit = async (data: ResetPasswordType) => {
    setLoading(true)
    try {
      const resetToken = localStorage.getItem('resetToken')

      if (!resetToken) {
        throw new Error('Missing reset token')
      }

      const result = await resetPassword({
        resetToken,
        password: data.password
      }).unwrap()

      if (result) {
        toast.success('Password reset successfully!')

        // Clean up localStorage
        localStorage.removeItem('resetToken')
        localStorage.removeItem('resetEmail')

        reset()

        // Navigate to login page
        navigate('/auth/login')
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#113146] flex justify-center items-center px-4">
      <div className="w-full max-w-xl bg-[#03141f] p-6 relative shadow-lg">
        {/* Close Button */}
        <button
          onClick={() => navigate('/auth/login')}
          className="absolute top-3 right-3 text-2xl font-bold hover:text-gray-700"
        >
          ×
        </button>

        {/* Header */}
        <h2 className="text-xl lg:text-2xl font-bold text-accent-orange text-center mb-1">
          Reset Password
        </h2>
        <p className="text-sm text-gray-600 text-center mb-2">
          Enter your new password to change the old one.
        </p>
        {email && (
          <p className="text-xs text-gray-500 text-center mb-5">
            Resetting password for: <span className="font-semibold">{email}</span>
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Password */}
          <div>
            <label className="font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 6 characters"
                className="w-full rounded-none mt-2 pr-10 text-gray-500 bg-[#EDEFF0] border-none py-3 px-4 outline-none"
                {...register('password')}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="font-medium">Re-enter Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Re-enter password"
              className="w-full rounded-none mt-2 bg-[#EDEFF0] text-gray-800 border-none py-3 px-4 outline-none"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-brick-red hover:bg-[#7c2d22] text-white px-6 py-2 rounded-none border text-sm border-[#62180F] w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Resetting...' : 'Continue'}
          </button>

          {/* Back to Login */}
          <p className="text-sm text-center">
            <span
              onClick={() => navigate('/auth/login')}
              className="text-brick-red font-semibold cursor-pointer hover:underline"
            >
              Back to Login
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordModal
