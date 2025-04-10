import React from 'react'

const Report = ({ popUp, setPopUp }) => {
  return (
    <div>
          {popUp && (
              <div className="fixed top-20 left-0 w-full items-start h-full flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded shadow-lg text-center">
                      <p className="text-lg font-semibold mb-4">Report this user?</p>
                      <button
                          onClick={() => setPopUp(false)}
                          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                      >
                          Close
                      </button>
                  </div>
              </div>
          )}
    </div>
  )
}

export default Report
