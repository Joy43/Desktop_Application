import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, List, Layers, Settings, LogOut, LogInIcon, ActivityIcon, User2 } from 'lucide-react'
import { useAppSelector } from '@renderer/redux/hook';

const ServerSidebar = () => {
  const location = useLocation()

  const user = useAppSelector((state) => state?.auth?.user);
  console.log(user);


  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/' },
    { id: 'login', icon: User2, label: 'login', path: '/auth/login' },
    { id: 'list', icon: List, label: 'List', path: '/list' },
    { id: 'layers', icon: Layers, label: 'Layers', path: '/layers' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' }
  ]

  return (
    <div className="p-8  ">
      <div>
        <div className="fixed left-8 top-10 py-6 flex flex-col gap-8 z-50">
          {/* ------ Top Navigation -------- */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex flex-col gap-6">
              {navItems.map((item) => {
                const Icon = item.icon

                let isActive = false

                if (item.path === '/') {
                  // Special case for the root path (Dashboard)
                  isActive = location.pathname === '/' || location.pathname === '/dashboard'
                } else {
                  // Use a precise match for other paths
                  isActive =
                    location.pathname.startsWith(item.path) &&
                    (location.pathname.length === item.path.length ||
                      location.pathname[item.path.length] === '/')
                }

                // Simpler alternative for other paths if you don't have deep nesting:
                // isActive = location.pathname.split('/')[1] === item.path.split('/')[1];

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
            </div>
          </div>

          {/* --------- Logout --------------- */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4">
            <button
              onClick={() => console.log('Logout')}
              className="text-slate-500 hover:text-red-400 transition-colors duration-200"
              aria-label="Logout"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServerSidebar
