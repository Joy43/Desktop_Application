import NotFound from '@renderer/components/NotFound'
import { MainLayout } from '@renderer/Layout/MainLayout'
import { AuthLayout } from '@renderer/Layout/AuthLayout'
import Activity from '@renderer/pages/(tabs)/activity/Activity'
import SignInPage from '@renderer/pages/(tabs)/auth/SignIn'
import { List } from '@renderer/pages/(tabs)/list/List'
import { createBrowserRouter } from 'react-router-dom'
import SignUp from '@renderer/pages/(tabs)/auth/SignUp'
import ForgotPasswordModal from '@renderer/pages/(tabs)/auth/ForgotPassword'
import ResetPasswordModal from '@renderer/pages/(tabs)/auth/RestPasswordModel'
import VerifyOtpModal from '@renderer/pages/(tabs)/auth/VerifyOtpModel'
import HomeContent from '@renderer/pages/Home/HomeContent/HomeContent'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomeContent />
      },
      {
        path: 'activity',
        element: <Activity />
      },
      {
        path: 'list',
        element: <List />
      }
     
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <SignInPage />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'verify-otp',
        element: <VerifyOtpModal />
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordModal />
      },
      {
        path: 'reset-password',
        element: <ResetPasswordModal />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])