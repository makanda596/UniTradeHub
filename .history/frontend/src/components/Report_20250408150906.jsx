import React from 'react'
import { useAuthStore } from '../utilis/auth'
import { useParams } from 'react-router-dom'

const Report = ({ popUp, setPopUp }) => {
    const { recieverId }=useParams()
    const { reportUser }= useAuthStore()

    console.log(recieverId)
    // console.log(reporterId)
    const reportFunction = async ()=>{
        try {
            await reportUser(recieverId)
        } catch (error) {
            console.log(error.message)
        }
    }

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
                      <button onClick={reportFunction}>Report</button>
                  </div>
              </div>
          )}
    </div>
  )
}

export default Report
