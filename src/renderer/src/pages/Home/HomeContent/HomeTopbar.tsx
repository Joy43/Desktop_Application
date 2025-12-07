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
      <div className="flex items-center justify-between mb-12">
        {/* USER INFO SECTION */}
        <div className="flex items-center gap-4 mb-6">
          {/* Account Block */}
          <div>
            {user ? (
              <button
                className="flex items-center space-x-2 text-sm text-gray-300 hover:text-blue-400 transition-colors duration-200"
                onClick={() => {
                  handleUserButtonClick()
                }}
              ></button>
            ) : (
              <button
                onClick={() => {
                  setSignInOpen(true)
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Profile Photo */}
          <img
            src={
              user?.profilePhoto
                ? user.profilePhoto
                : 'https://res.cloudinary.com/dkqdwcguu/image/upload/c_crop,w_1220,h_518/v1754275277/joy_img_3_ony3do.jpg'
            }
            alt="User"
            className="w-12 h-12 rounded-full object-cover"
          />

          {/* Name + Role */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">{user?.fullName || 'User'}</span>
              <span className="text-slate-500">▼</span>
            </div>
            <span className="text-slate-500 text-sm capitalize">{user?.role || 'User'}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-white">27 May</span>
          <span className="text-slate-500">2025</span>

          <div className="flex items-center gap-4 ml-8">
            <Mail className="w-6 h-6 text-slate-400" />
            <Bell className="w-6 h-6 text-slate-400" />

            {/* Open Sidebar Button */}
            <button
              onClick={() => setOpen(true)}
              className="p-1.5 rounded hover:bg-white/10 transition-colors"
            >
              <Menu className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
      <NavbarSidebar open={open} setOpen={setOpen} />
    </div>
  )
}

export default HomeTopbar
