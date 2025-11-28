import { Link, useLocation } from 'react-router-dom'

interface Tab {
  title: string
  value: string
  href: string
  icon?: React.ReactNode
}

const Tabs = ({ tabs }: { tabs: Tab[] }) => {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <div className="hidden md:flex items-center gap-4 md:gap-[30px]">
      {tabs.map((tab) => {
        let isActive = currentPath === tab.href || currentPath.startsWith(tab.href + '/')

        // make Overview active on /user-dashboard
        if (tab.value === 'overview' && currentPath === '/user-dashboard') {
          isActive = true
        }

        return (
          <Link
            key={tab.value}
            to={tab.href}
            className={`inline-flex items-center gap-2 sm:text-sm font-medium cursor-pointer text-sm md:text-[18px] px-4 py-2 rounded-[6px] border-[1px] transition-all duration-200 group
              ${
                isActive
                  ? 'text-white bg-[#125e0a] border-[#1D4ED8]'
                  : 'text-black hover:bg-[#074900] hover:text-white border-[#CBD5E1]'
              }`}
          >
            {tab.icon && (
              <span
                className={`w-4 h-4 md:w-6 md:h-6 transition-all duration-200 ${
                  isActive
                    ? 'brightness-0 invert'
                    : 'brightness-0 group-hover:brightness-0 group-hover:invert'
                }`}
              >
                {tab.icon}
              </span>
            )}
            {tab.title}
          </Link>
        )
      })}
    </div>
  )
}

export default Tabs
