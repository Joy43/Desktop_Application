import React, { useState } from 'react'
import signUpImg from '../../../assets/images/auth/newslogin.jpg'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'

import SocialLogin from './SocialLogin'

import { useRegisterMutation } from '@renderer/redux/features/auth/auth.api'
import VerifyOtpModal from './VerifyOtpModel'

type SignUpSchemaType = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

type SignUpProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSwitchToSignIn: () => void
}

const SignUp: React.FC<SignUpProps> = ({ open, onOpenChange, onSwitchToSignIn }) => {
  const [openVerifyOtp, setOpenVerifyOtp] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [registerUser] = useRegisterMutation()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<SignUpSchemaType>()

  const onSubmit = async (data: SignUpSchemaType) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)
    setEmail(data.email)
    try {
      const result = await registerUser(data).unwrap()
      if (result?.resetToken) {
        setOpenVerifyOtp(true)
        toast.success('Registered successfully! Please verify OTP.')
        localStorage.setItem('resetToken', result.resetToken)
        reset()
        onOpenChange(false)
      } else {
        toast.error(result?.data?.message || 'Registration failed')
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={() => onOpenChange(false)} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto px-4">
        <div
          className="bg-[#FAFDFF] rounded-lg shadow-xl w-full max-w-4xl md:grid md:grid-cols-12 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left Image */}
          <div className="hidden md:block md:col-span-7">
            <img src={signUpImg} alt="Sign Up" className="w-full h-full object-cover" />
          </div>

          {/* Right Form */}
          <div className="md:col-span-5 p-6 flex flex-col justify-between">
            <div className="mb-4">
              <img src="/TAC1.png" className="max-w-sm w-full mb-2" alt="Logo" />
              <h3 className="text-xl text-accent-orange font-semibold mb-2">Register</h3>
              <p className="text-sm text-gray-600">
                Create your account and enjoy the articles of{' '}
                <span className="font-semibold">The Australian Canvas</span>.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <input
                  {...register('fullName', { required: 'Name is required' })}
                  type="text"
                  placeholder="Full Name"
                  className="rounded-none mt-2 bg-[#EDEFF0] border-none shadow-none h-auto py-3 px-4 w-full"
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  placeholder="Email"
                  className="rounded-none mt-2 bg-[#EDEFF0] border-none shadow-none h-auto py-3 px-4 w-full"
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm mb-1">Password</label>
                <div className="relative">
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Min 6 characters' }
                    })}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 6 characters"
                    className="rounded-none mt-2 bg-[#EDEFF0] border-none shadow-none h-auto py-3 px-4 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm mb-1">Re-enter Password</label>
                <input
                  {...register('confirmPassword', {
                    required: 'Please re-enter password',
                    validate: (value) => value === watch('password') || 'Passwords do not match'
                  })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  className="rounded-none mt-2 bg-[#EDEFF0] border-none shadow-none h-auto py-3 px-4 w-full"
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="bg-brick-red hover:bg-[#7c2d22] text-white px-4 py-2 rounded-none w-full text-sm"
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>

            <p className="text-sm mt-4">
              Already have an account?{' '}
              <span
                onClick={onSwitchToSignIn}
                className="text-brick-red font-semibold cursor-pointer hover:underline"
              >
                Sign In
              </span>
            </p>

            {/* <SocialLogin onOpenChange={onOpenChange} /> */}
          </div>
        </div>
      </div>

      {/* OTP */}
      <VerifyOtpModal open={openVerifyOtp} onOpenChange={setOpenVerifyOtp} email={email} />
    </>
  )
}

export default SignUp
