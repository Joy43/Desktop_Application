import { useState } from 'react'
import { Menu } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

import { useAppSelector } from '@renderer/redux/hook'
import { NavbarSidebar } from './Navbarsidebar'

export const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAppSelector((state) => state?.auth?.user)

  console.log(user)

  // ----- controller for user/admin dashboard ---------
  const handleUserButtonClick = () => {
    if (user?.role === 'USER' || user?.role === 'CONTRIBUTOR') {
      // If you have profile sheet logic, place it here
      console.log('Open profile sheet')
    } else if (user?.role === 'ADMIN') {
      navigate('/editor')
    } else if (user?.role === 'SUPER_ADMIN') {
      navigate('/admin')
    }
  }

  const [open, setOpen] = useState(false)

  const tabs = [
    { name: 'Containers', route: '/containers' },
    { name: 'Images', route: '/images' },
    { name: 'Volumes', route: '/volumes' },
    { name: 'Networks', route: '/networks' },
    { name: 'Compose', route: '/compose' }
  ]

  return (
    <>
      <div className="w-full h-9 bg-[#0f0f0f] flex items-center justify-between select-none border-b border-white/10 px-2">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          {/* Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
          >
            <Menu className="w-4 h-4 text-gray-400" />
          </button>

          <span className="hidden sm:block text-sm font-medium text-gray-300">ss joy</span>
        </div>

        {/* ------- Center Tabs----------- */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center space-x-1 overflow-x-auto px-2 scrollbar-thin scrollbar-thumb-gray-700">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.route

              return (
                <button
                  key={tab.route}
                  onClick={() => navigate(tab.route)}
                  className={`
                    px-3 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap rounded-md transition-all
                    hover:bg-white/10 hover:text-white
                    ${isActive ? 'bg-[#1f6feb] text-white' : 'text-gray-400'}
                  `}
                >
                  {tab.name}
                </button>
              )
            })}
          </div>
        </div>

        {/*-------- Right Side (User Button) -----------*/}
        <div className="flex items-center">
          <button
            onClick={handleUserButtonClick}
            className="text-gray-300 text-sm hover:text-white"
          >
            {user?.fullName || 'Profile'}
          </button>
        </div>
      </div>

      {/*----------- Sidebar Component------------- */}
      <NavbarSidebar open={open} setOpen={setOpen} />
    </>
  )
}
