// @renderer/pages/Home/Home.jsx (Simplified for Onboarding only)

import { useEffect, useState } from 'react'
import Onboarding from './onbording/Onbording'

const Home = () => {
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('onboarding_seen')
    if (!seen) {
      setShowOnboarding(true)
    }
  }, [])

  if (showOnboarding) {
    return <Onboarding onFinish={() => setShowOnboarding(false)} />
  }

  // Once onboarding is done, Home simply acts as an empty wrapper
  // or a wrapper for non-routed content, if any.
  return (
    <div className="px-8">
      {/* This is where the content of Dashboard, Activity, etc. 
        would ideally go, but since they are routed in MainLayout, 
        this component is mostly for the Onboarding logic.
      */}
      <div className="mt-12">
        <button
          onClick={() => {
            localStorage.clear()
            localStorage.removeItem('onboarding_seen')
            window.location.reload()
          }}
          className="text-xs text-gray-500 hover:text-white underline"
        >
          ↻ Replay Onboarding
        </button>
      </div>
    </div>
  )
}

export default Home;
