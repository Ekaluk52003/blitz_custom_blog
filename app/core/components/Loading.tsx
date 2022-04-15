export function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 flex flex-col items-center justify-center">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-28 w-28 mb-9"></div>

      <p className="text-center text-white">This may take a few seconds.</p>
    </div>
  )
}
