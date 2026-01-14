import { NavbarSidebar } from '@renderer/pages/shared/Navbar/Navbarsidebar'
import { useAppSelector } from '@renderer/redux/hook'
import { Bell, Mail, Menu } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HomeTopbar = () => {
  const [signInOpen, setSignInOpen] = useState(false)
  const navigate = useNavigate()

  const user = useAppSelector((state) => state?.auth?.user)

  const [open, setOpen] = useState(false)
  console.log(signInOpen)

  console.log(user)

  const handleUserButtonClick = () => {
    if (user?.role === 'USER' || user?.role === 'CONTRIBUTOR') {
      console.log('Open profile sheet')
    } else if (user?.role === 'ADMIN') {
      navigate('/editor')
    } else if (user?.role === 'SUPER_ADMIN') {
      navigate('/admin')
    }
  }

  return (
    <div>
      {/* Fixed Topbar with proper z-index and full width */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* USER INFO SECTION - Left Side */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Show Sign In button OR User Profile */}
              {!user ? (
                // Sign In Button (Desktop)
                <button
                  onClick={() => {
                    setSignInOpen(true)
                  }}
                  className="hidden sm:block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-colors duration-200 font-medium"
                >
                  Sign In
                </button>
              ) : (
                // User Profile Section (when logged in)
                <>
                  {/* Profile Photo */}
                  <img
                    src={
                      user?.profilePhoto
                        ? user.profilePhoto
                        : 'https://res.cloudinary.com/dkqdwcguu/image/upload/c_crop,w_1220,h_518/v1754275277/joy_img_3_ony3do.jpg'
                    }
                    alt="User"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-slate-600 hover:border-blue-500 transition-colors cursor-pointer"
                    onClick={() => {
                      handleUserButtonClick()
                    }}
                  />

                  {/* Name + Role - Hidden on small screens */}
                  <div className="hidden md:block">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-sm lg:text-base">
                        {user?.fullName || 'User'}
                      </span>
                      <span className="text-slate-400 text-xs">▼</span>
                    </div>
                    <span className="text-slate-400 text-xs capitalize">
                      {user?.role || 'User'}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* RIGHT SECTION - Date, Icons, Menu */}
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Date Section - Hidden on mobile */}
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-white text-sm lg:text-base font-medium">27 May</span>
                <span className="text-slate-400 text-sm lg:text-base">2025</span>
              </div>

              {/* Icons Section */}
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Mail Icon - Hidden on mobile, only show when logged in */}
                {user && (
                  <button className="hidden sm:block p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 hover:text-white transition-colors" />
                  </button>
                )}

                {/* Notification Bell - Only show when logged in */}
                {user && (
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors relative">
                    <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 hover:text-white transition-colors" />
                    {/* Optional notification badge */}
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                )}

                {/* Menu Button - Always visible */}
                <button
                  onClick={() => setOpen(true)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 hover:text-white transition-colors" />
                </button>
              </div>

              {/* Mobile Sign In Button - Only show when NOT logged in */}
              {!user && (
                <button
                  onClick={() => {
                    setSignInOpen(true)
                  }}
                  className="sm:hidden bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-xs transition-colors duration-200 font-medium"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed topbar */}
      <div className="h-16 md:h-20"></div>

      {/* Sidebar */}
      <NavbarSidebar open={open} setOpen={setOpen} />
    </div>
  )
}

export default HomeTopbar
