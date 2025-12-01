import { Sidebar } from '@renderer/pages/shared/Navbar/sidebar'
import { useAppSelector } from '@renderer/redux/hook'

import { Mail, Bell, Menu } from 'lucide-react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const serverData = [
  { day: 'M', value: 32 },
  { day: 'T', value: 28 },
  { day: 'W', value: 40 },
  { day: 'T', value: 25 },
  { day: 'F', value: 35 },
  { day: 'S', value: 42 },
  { day: 'S', value: 48 }
]

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAppSelector((state) => state?.auth?.user)

  const [open, setOpen] = useState(false) // Sidebar
  const [isOpen, setIsOpen] = useState(false) // Dropdown for user
  const [signInOpen, setSignInOpen] = useState(false) // Sign-in modal

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      {/* Main Content */}
      <div className="ml-32">
        {/*------- Header -----------------*/}
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

        {/* Sidebar should be outside header */}
        <Sidebar open={open} setOpen={setOpen} />

        {/* Dashboard Title */}
        <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>

        {/* Charts Section */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Server Request Chart */}
          <div className="col-span-2 bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-medium">Server request</h2>
              <button className="text-slate-400 text-sm flex items-center gap-2">
                Weekly <span>▼</span>
              </button>
            </div>

            <div className="relative h-64">
              <svg className="w-full h-full" viewBox="0 0 600 200">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line
                    key={i}
                    x1="40"
                    y1={180 - i * 36}
                    x2="580"
                    y2={180 - i * 36}
                    stroke="#334155"
                    strokeWidth="1"
                    opacity="0.2"
                  />
                ))}

                {/* Y-axis labels */}
                {['10', '20', '30', '40', '50'].map((label, i) => (
                  <text key={i} x="20" y={184 - (i + 1) * 36} fill="#64748b" fontSize="12">
                    {label}
                  </text>
                ))}

                {/* Line chart */}
                <polyline
                  points={serverData
                    .map((d, i) => `${60 + i * 80},${180 - d.value * 3.6}`)
                    .join(' ')}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2"
                />

                {/* Area fill */}
                <polygon
                  points={`${60},180 ${serverData
                    .map((d, i) => `${60 + i * 80},${180 - d.value * 3.6}`)
                    .join(' ')} ${60 + (serverData.length - 1) * 80},180`}
                  fill="url(#gradient)"
                  opacity="0.3"
                />

                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* X-axis labels */}
                {serverData.map((d, i) => (
                  <text
                    key={i}
                    x={60 + i * 80}
                    y="195"
                    fill="#64748b"
                    fontSize="12"
                    textAnchor="middle"
                  >
                    {d.day}
                  </text>
                ))}
              </svg>
            </div>
          </div>

          {/* Servers Map */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h2 className="text-white font-medium mb-6">Servers map</h2>

            <div className="relative h-48 bg-slate-900/50 rounded-lg overflow-hidden">
              <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  <span className="text-slate-400">Memory</span>
                </span>
                <span className="text-white">150 TB</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span className="text-slate-400">Signups</span>
                </span>
                <span className="text-white">2,640</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span className="text-slate-400">Logins</span>
                </span>
                <span className="text-white">2,160</span>
              </div>
            </div>

            <div className="mt-4 space-y-1 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                <span>St. Petersburg</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>Los Angeles</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                <span>Siberia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
