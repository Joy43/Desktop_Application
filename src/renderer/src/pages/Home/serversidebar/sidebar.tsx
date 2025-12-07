import { Link, useLocation } from 'react-router-dom'
import { Home, List, Layers, Settings, LogOut, User2 } from 'lucide-react'
import { useAppSelector } from '@renderer/redux/hook'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@renderer/redux/store'
import { logout } from '@renderer/redux/features/auth/auth.slice'
import { toast } from 'sonner'

const ServerSidebar = () => {
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const user = useAppSelector((state) => state.auth.user)

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/' },
    { id: 'list', icon: List, label: 'List', path: '/list' },
    { id: 'layers', icon: Layers, label: 'Layers', path: '/layers' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' }
  ]

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully')
  }

  return (
    <div className="p-8">
      <div className="fixed left-8 top-10 py-6 flex flex-col gap-8 z-50">
        {/* NAVIGATION */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex flex-col gap-6">
            {/* ALWAYS SHOW ALL ICONS */}
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-cyan-400' : 'text-slate-500 hover:text-cyan-300'
                  }`}
                  aria-label={item.label}
                >
                  <Icon className="w-6 h-6" />
                </Link>
              )
            })}

            {/* SHOW LOGIN ICON ONLY WHEN USER IS NOT LOGGED IN */}
            {!user && (
              <Link
                to="/auth/login"
                className="text-slate-500 hover:text-cyan-300 transition-colors duration-200"
                aria-label="Login"
              >
                <User2 className="w-6 h-6" />
              </Link>
            )}
          </div>
        </div>

        {/* LOGOUT BUTTON WHEN USER LOGGED IN */}
        {user && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4">
            <button
              onClick={handleLogout}
              className="text-slate-500 hover:text-red-400 transition-colors duration-200"
              aria-label="Logout"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServerSidebar
