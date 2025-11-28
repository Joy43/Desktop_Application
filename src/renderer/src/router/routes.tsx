// @renderer/router.ts

import NotFound from '@renderer/components/NotFound'
import { MainLayout } from '@renderer/Layout/MainLayout'
import Activity from '@renderer/pages/(tabs)/activity/Activity'
import Dashboard from '@renderer/pages/(tabs)/dashboard/Dashboard'
import { List } from '@renderer/pages/(tabs)/list/List'

import { createBrowserRouter } from 'react-router-dom'

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
    ]
  }
])
