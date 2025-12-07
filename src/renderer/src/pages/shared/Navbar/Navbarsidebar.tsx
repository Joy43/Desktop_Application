import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const NavbarSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate()

  const items = [
    { name: 'Dashboard', route: '/' },
    { name: 'Containers', route: '/containers' },
    { name: 'Images', route: '/images' },
    { name: 'Volumes', route: '/volumes' },
    { name: 'Networks', route: '/networks' },
    { name: 'Compose', route: '/compose' },
    { name: 'Settings', route: '/settings' }
  ]

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
        />
      )}

      {/* NavbarSidebar Panel - CHANGED CLASSES HERE */}
      <div
        className={`
          fixed top-0 right-0 h-full w-64 bg-[#121212] text-white z-40 shadow-xl 
          transform transition-transform duration-300
          ${open ? 'translate-x-0' : 'translate-x-full'} 
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">Menu</h2>

          <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-white/10">
            <X className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="p-4 flex flex-col gap-2">
          {items.map((item) => (
            <button
              key={item.route}
              onClick={() => {
                navigate(item.route)
                setOpen(false)
              }}
              className="text-left px-3 py-2 rounded hover:bg-white/10 transition"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
