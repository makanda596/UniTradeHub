import React from 'react'

const LoadingSpinner = () => {
  return ( 
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="relative w-16 h-16 animate-spin">
              {[...Array(8)].map((_, i) => (
                  <div
                      key={i}
                      className="absolute w-2 h-2 bg-blue-600 rounded-full"
                      style={{
                          top: `${50 - 45 * Math.cos((i * Math.PI) / 4)}%`,
                          left: `${50 + 45 * Math.sin((i * Math.PI) / 4)}%`,
                          opacity: 1 - i * 0.1,
                          transform: "translate(-50%, -50%)",
                      }}
                  ></div>
              ))}
          </div>
      </div>



  )
}

export default LoadingSpinner