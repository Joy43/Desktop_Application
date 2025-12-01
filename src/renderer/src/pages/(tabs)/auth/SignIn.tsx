import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import signInImg from '../../../assets/images/auth/newslogin.jpg'
import { useDispatch } from 'react-redux'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { useLoginMutation } from '@renderer/redux/features/auth/auth.api'
import { setUser } from '@renderer/redux/features/auth/auth.slice'
import GoogleAuthButton from './SocialLogin'

const SignInPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [loginUserWithEmail] = useLoginMutation()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      remember: false
    }
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const result = await loginUserWithEmail(data).unwrap()

      if (result) {
        toast.success('Logged In Successfully')

        dispatch(
          setUser({
            user: result?.result?.data?.user,
            token: result?.result?.data?.token
          })
        )

        reset()

        // Navigate to dashboard or home
        navigate('/')
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Something went wrong')
    }
    setLoading(false)
  }

  return (
    <div className="w-full min-h-screen bg-[#113146] flex justify-center items-center p-6">
      <div className="w-full max-w-5xl bg-[#1e3f55] p-6 shadow-lg grid md:grid-cols-12 gap-6 items-center">
        {/* Left Image */}
        <div className="hidden md:block md:col-span-7">
          <img src={signInImg} alt="Sign In" className="w-full h-full object-cover" />
        </div>

        {/* Right Section */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <img src="/TAC1.png" alt="" className="max-w-sm w-full mb-4" />

            <h3 className="text-xl text-accent-orange font-semibold">Sign In</h3>

            <p className="text-sm text-gray-100">
              Welcome back! <br />
              Sign in and enjoy the articles of{' '}
              <span className="font-semibold">The Australian Canvas</span>.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-white">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="mt-2 w-full bg-[#EDEFF0] text-gray-600 py-3 px-4 border-none outline-none"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-white">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="mt-2 w-full bg-[#EDEFF0] text-gray-700 py-3 px-4 pr-10 outline-none"
                  {...register('password', {
                    required: 'Password is required'
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Controller
                  name="remember"
                  control={control}
                  render={({ field }) => (
                    <input type="checkbox" checked={field.value} onChange={field.onChange} />
                  )}
                />
                <label className="text-sm text-white">Remember me</label>
              </div>

              <p
                onClick={() => navigate('/auth/forgot-password')}
                className="text-sm text-brick-red hover:underline cursor-pointer"
              >
                Forgot password?
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-brick-red text-white py-2 px-6 border border-[#62180F] rounded-none hover:bg-[#7c2d22] text-sm disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-sm mt-4 text-white">
            Not registered yet?
            <span
              onClick={() => navigate('/auth/signup')}
              className="text-brick-red font-semibold ml-2 cursor-pointer hover:underline"
            >
              Register Now
            </span>
          </p>

          {/* Social Login */}
          <GoogleAuthButton
            onSuccess={(result) => {
              toast.success('Logged In Successfully')
              dispatch(
                setUser({
                  user: result?.user,
                  token: result?.token
                })
              )
              navigate('/')
            }}
            onError={(error) => {
              toast.error(error?.message || 'Google login failed')
            }}
            onOpenChange={(isOpen) => {
              // Handle modal open/close state if needed
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SignInPage
