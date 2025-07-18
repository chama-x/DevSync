"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AITooltip } from "@/components/ui/AITooltip"
import type { Task } from "@/types"
import { CURRENT_USER_ID } from "@/constants"

interface TaskAssigneeProps {
  task: Task
}

export const TaskAssignee = ({ task }: TaskAssigneeProps) => {
  const [showAISuggestion, setShowAISuggestion] = useState(false)

  if (task.assignee) {
    return (
      <motion.div whileHover={{ scale: 1.05 }} className="relative">
        <Avatar className="h-9 w-9 ring-2 ring-white shadow-sm">
          <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} />
          <AvatarFallback className="text-sm font-medium bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-700">
            {task.assignee.initials}
          </AvatarFallback>
        </Avatar>
        {task.assignee.id === CURRENT_USER_ID && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
        )}
      </motion.div>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowAISuggestion(true)}
      onMouseLeave={() => setShowAISuggestion(false)}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="h-9 w-9 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center"
      >
        <div className="w-2 h-2 bg-gray-300 rounded-full" />
      </motion.div>

      <AITooltip show={showAISuggestion} suggestion="Sarah Chen" confidence={92} />
    </div>
  )
}
