import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="bg-gray-800 text-white">
      <RouterProvider router={router} />
    </div>
  </StrictMode>
)
