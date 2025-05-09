"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: string
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = new Date(targetDate).getTime() - new Date().getTime()
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  return (
    <div className="flex justify-center gap-4 py-2">
      <div className="text-center">
        <div className="bg-white border rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
          {timeLeft.days}
        </div>
        <div className="text-xs mt-1 text-gray-600">Days</div>
      </div>
      <div className="text-center">
        <div className="bg-white border rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
          {timeLeft.hours}
        </div>
        <div className="text-xs mt-1 text-gray-600">Hours</div>
      </div>
      <div className="text-center">
        <div className="bg-white border rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
          {timeLeft.minutes}
        </div>
        <div className="text-xs mt-1 text-gray-600">Minutes</div>
      </div>
      <div className="text-center">
        <div className="bg-white border rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
          {timeLeft.seconds}
        </div>
        <div className="text-xs mt-1 text-gray-600">Seconds</div>
      </div>
    </div>
  )
}
