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
        <div className="mt-4 px-2 sm:px-4">
            {activeFlash.length === 0 ? (
                <div className="text-center py-8">
                    <FiZap className="text-gray-400 mx-auto mb-3" size={28} />
                    <p className="text-gray-500 text-sm">No active deals</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activeFlash.map(item => (
                        <div
                            key={item._id}
                            className="relative bg-white rounded-lg border border-gray-100"
                        >
                            {/* Seller Info */}
                            <div className="flex items-center p-3">
                                <div className="relative">
                                    <img
                                        src={item?.createdBy?.profilepic}
                                        alt={item?.createdBy?.username}
                                        className="h-10 w-10 rounded-full object-cover border border-gray-200"
                                    />
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border border-white"></div>
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                        {item?.createdBy?.username || "Seller"}
                                    </p>
                                    <CountdownTimer expiresAt={item.expiresAt} />
                                </div>
                            </div>

                            {/* Flash Image */}
                            <div className="aspect-square bg-gray-50">
                                <img
                                    src={item.image}
                                    alt="flash"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Description & Action */}
                            <div className="p-3">
                                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                    {item?.description}
                                </p>
                              
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default GetFlash