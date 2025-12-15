
import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Outlet /> 
    </div>
  )
}
