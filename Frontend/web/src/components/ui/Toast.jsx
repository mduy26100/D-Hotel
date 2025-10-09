"use client"

import { useEffect } from "react"
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline"

const Toast = ({ message, type = "info", onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const types = {
    success: {
      bg: "bg-green-50",
      border: "border-green-500",
      text: "text-green-800",
      icon: CheckCircleIcon,
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-500",
      text: "text-red-800",
      icon: ExclamationCircleIcon,
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-500",
      text: "text-blue-800",
      icon: InformationCircleIcon,
    },
  }

  const config = types[type] || types.info
  const Icon = config.icon

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 ${config.bg} ${config.text} border-l-4 ${config.border} p-4 rounded-lg shadow-lg min-w-[300px] max-w-md animate-in slide-in-from-right`}
    >
      <Icon className="h-6 w-6 flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button onClick={onClose} className="flex-shrink-0 hover:opacity-70 transition-opacity">
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  )
}

export default Toast
