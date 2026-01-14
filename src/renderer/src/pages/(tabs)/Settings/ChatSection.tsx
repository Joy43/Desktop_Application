const ChatSection = () => {
  return (
    <div>
      <div className="grid  gap-6 mb-8">
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
  )
}

export default ChatSection
