"use client"

import { motion } from "framer-motion"

interface ProgressBarProps {
  completed: number
  total: number
  className?: string
}

export const ProgressBar = ({ completed, total, className = "" }: ProgressBarProps) => {
  const percentage = Math.round((completed / total) * 100)

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <span className="text-xs text-gray-500 font-medium">{percentage}%</span>
    </div>
  )
}
