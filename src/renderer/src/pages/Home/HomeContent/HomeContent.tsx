import { useAppSelector } from '@renderer/redux/hook'
import { useState } from 'react'
import HomeTopbar from './HomeTopbar'
import ChatSection from './ChatSection'


const HomeContent = () => {
  const user = useAppSelector((state) => state?.auth?.user)
  const [signInOpen] = useState(false)
  console.log(signInOpen)
  console.log(user);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      {/* Main Content */}
      <div className="ml-32">
        {/*------- Header -----------------*/}
        <HomeTopbar />
        {/* Charts Section */}
        <ChatSection/>
      </div>
    </div>
  )
}

export default HomeContent;
