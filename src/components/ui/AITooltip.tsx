"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Zap } from "lucide-react"

interface AITooltipProps {
  show: boolean
  suggestion: string
  confidence: number
}

export const AITooltip = ({ show, suggestion, confidence }: AITooltipProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          className="absolute top-12 right-0 z-20 bg-gray-900 text-white text-xs px-3 py-2 rounded-xl whitespace-nowrap shadow-lg"
        >
          <div className="flex items-center gap-2">
            <Zap className="h-3 w-3" />
            <span>
              {suggestion} ({confidence}% match)
            </span>
          </div>
          <div className="absolute -top-1 right-3 w-2 h-2 bg-gray-900 rotate-45" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
