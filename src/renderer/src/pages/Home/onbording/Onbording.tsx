// src/pages/Onboarding/Onboarding.tsx
import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const slides = [
  {
    title: 'Welcome to Ygour App',
    desc: 'Powerful tools for modern workflows.',
    image:
      'https://res.cloudinary.com/dkqdwcguu/image/upload/c_crop,w_1220,h_518/v1754275277/joy_img_3_ony3do.jpg'
  },
  {
    title: 'Lightning Fast',
    desc: 'Everything runs locally on your machine.',
    image:
      'https://res.cloudinary.com/dkqdwcguu/image/upload/c_crop,w_1220,h_518/v1763746026/logo_bgr4lh.jpg'
  },
  {
    title: 'Beautiful Design',
    desc: 'Dark mode. Native feel. Made for pros.',
    image:
      'https://res.cloudinary.com/dkqdwcguu/image/upload/c_crop,w_1220,h_518/v1751580965/cld-sample-3.jpg'
  },
  {
    title: 'Ready to Rock!',
    desc: 'Let’s build something amazing together.',
    image:
      'https://res.cloudinary.com/dkqdwcguu/image/upload/c_crop,w_1220,h_518/v1751580965/samples/logo.png'
  }
]

const Onboarding = ({ onFinish }: { onFinish: () => void }) => {
  const [step, setStep] = useState(0)

  const next = () => {
    if (step === slides.length - 1) {
      localStorage.setItem('onboarding_seen', 'true')
      onFinish()
    } else {
      setStep(step + 1)
    }
  }

  const prev = () => setStep(Math.max(0, step - 1))
  const skip = () => {
    localStorage.setItem('onboarding_seen', 'true')
    onFinish()
  }

  const current = slides[step]

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col">
      {/* Skip Button */}
      <button
        onClick={skip}
        className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
      >
        <X className="w-4 h-4" />
        Skip
      </button>

      <div className="flex-1 flex flex-col items-center justify-center px-10">
        {/* Illustration */}
        <div className="w-full max-w-2xl mb-12">
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-auto drop-shadow-2xl animate-in fade-in slide-in-from-bottom duration-700"
            style={{ animationDelay: '100ms' }}
          />
        </div>

        {/* Content */}
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl font-bold text-white mb-6 tracking-tight animate-in fade-in slide-in-from-bottom duration-700">
            {current.title}
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed animate-in fade-in slide-in-from-bottom duration-700">
            {current.desc}
          </p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="p-8 flex items-center justify-between">
        {/* Back Button */}
        <button
          onClick={prev}
          disabled={step === 0}
          className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all ${
            step === 0
              ? 'text-gray-600 cursor-not-allowed'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        {/* Progress Dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === step ? 'bg-blue-500 w-8' : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Next / Finish Button */}
        <button
          onClick={next}
          className="flex items-center gap-3 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all transform hover:scale-105"
        >
          {step === slides.length - 1 ? 'Get Started' : 'Next'}
          {step !== slides.length - 1 && <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  )
}

export default Onboarding
