import { useNavigate } from 'react-router-dom'
import { ArrowLeftCircle } from 'lucide-react'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#1e1e1e] text-gray-200 select-none">
      {/* Icon / Graphic */}
      <div className="flex flex-col items-center">
        <div
          onClick={() => navigate('/')}
          className="rounded-full cursor-pointer bg-[#2a2a2a] p-6 shadow-inner shadow-black"
        >
          <ArrowLeftCircle className="w-12 h-12 text-[#3fa6ff]" />
        </div>

        {/* Title */}
        <h1 className="mt-6 text-3xl font-semibold tracking-wide">Page Not Found</h1>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-400 max-w-sm text-center">
          This page doesn’t exist or is unavailable in this section of your app.
        </p>
      </div>

      {/* Desktop-like Back Button */}
      <button
        onClick={() => navigate(-1)}
        className=" cursor-pointer
          mt-8 px-5 py-2.5 rounded-md
          bg-[#2c2c2c] border border-[#3a3a3a]
          hover:bg-[#353535] hover:border-[#4a4a4a]
          transition-all 
          text-sm font-medium text-gray-200
          shadow-[0_2px_4px_rgba(0,0,0,0.3)] active:scale-[0.98]
        "
      >
        Go Back
      </button>

      {/* Optional Home Button */}
      <button
        onClick={() => navigate('/')}
        className="mt-3 text-xs text-blue-400 hover:text-blue-300 underline underline-offset-4"
      >
        Return to Home
      </button>
    </div>
  )
}

export default NotFound
