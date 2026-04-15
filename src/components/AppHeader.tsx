export default function AppHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
      {/* Left — logo */}
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-[#006CA9] rounded-md flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="7" width="12" height="2" rx="1" fill="white" />
            <rect x="7" y="2" width="2" height="12" rx="1" fill="white" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 leading-none">Fakeott CareView</p>
          <p className="text-xs text-gray-400 uppercase tracking-wider mt-0.5">Clinical Portal</p>
        </div>
      </div>

      {/* Right — sync status + avatar */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
          <span className="text-xs text-gray-400">Live · synced 2 min ago</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-xs font-medium text-blue-800">
          DR
        </div>
      </div>
    </header>
  );
}