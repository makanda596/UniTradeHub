import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../utilis/auth'
import { FiClock, FiZap } from 'react-icons/fi'

const GetFlash = () => {
    const { allFlash, flash } = useAuthStore()
    const [activeFlash, setActiveFlash] = useState([])

    useEffect(() => {
        allFlash()
    }, [])

    useEffect(() => {
        if (flash && Array.isArray(flash)) {
            const now = new Date()
            const filtered = flash.filter(item => new Date(item.expiresAt) > now)
            setActiveFlash(filtered)
        }
    }, [flash])

    const CountdownTimer = ({ expiresAt }) => {
        const calculateTimeLeft = () => {
            const difference = new Date(expiresAt) - new Date()
            let timeLeft = {}

            if (difference > 0) {
                timeLeft = {
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                }
            }
            return timeLeft
        }

        const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

        useEffect(() => {
            const timer = setTimeout(() => {
                setTimeLeft(calculateTimeLeft())
            }, 1000)
            return () => clearTimeout(timer)
        })

        return (
            <div className="flex items-center gap-1 text-gray-500">
                <FiClock size={14} />
                <span className="text-xs">
                    {timeLeft.hours}h {timeLeft.minutes}m left
                </span>
            </div>
        )
    }

    return (
        <div className="mt-1 px-1 sm:px-2">
            {activeFlash.length === 0 ? (
                <div className="text-center py-4">
                    <FiZap className="text-gray-400 mx-auto mb-3" size={28} />
                    <p className="text-gray-500 text-sm">No active deals</p>
                </div>
            ) : (
                <div className="grid grid-cols-3 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {activeFlash.map(item => (
                        <div
                            key={item._id}
                            className="relative bg-white rounded-lg border border-gray-100 shadow-none transition-all duration-300 hover:shadow-md"
                        >
                            <div className="relative aspect-square  overflow-hidden rounded-b-sm">
                                <img
                                    src={item.image}
                                    alt="flash"
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute top-1 left-0 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
                                    <img
                                        src={item?.createdBy?.profilepic}
                                        alt={item?.createdBy?.username}
                                        className="h-6 w-6 rounded-full object-cover border-3 border-blue-200"
                                    />
                                    <p className="text-xs font-medium text-gray-800">
                                        {item?.createdBy?.username || "Seller"}
                                    </p>
                                </div>
                                {/* <div className="absolute bottom-1 text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                                    <CountdownTimer expiresAt={item.expiresAt} />
                                </div> */}

                            </div>

                           
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default GetFlash
