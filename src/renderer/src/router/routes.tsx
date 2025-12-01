import NotFound from '@renderer/components/NotFound'
import { MainLayout } from '@renderer/Layout/MainLayout'
import { AuthLayout } from '@renderer/Layout/AuthLayout'
import Activity from '@renderer/pages/(tabs)/activity/Activity'
import SignInPage from '@renderer/pages/(tabs)/auth/SignIn'
import Dashboard from '@renderer/pages/(tabs)/dashboard/Dashboard'
import { List } from '@renderer/pages/(tabs)/list/List'
import { createBrowserRouter } from 'react-router-dom'
import SignUp from '@renderer/pages/(tabs)/auth/SignUp'
import ForgotPasswordModal from '@renderer/pages/(tabs)/auth/ForgotPassword'
import ResetPasswordModal from '@renderer/pages/(tabs)/auth/RestPasswordModel'
import VerifyOtpModal from '@renderer/pages/(tabs)/auth/VerifyOtpModel'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'activity',
        element: <Activity />
      },
      {
        path: 'list',
        element: <List />
      }
      // other protected routes here
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