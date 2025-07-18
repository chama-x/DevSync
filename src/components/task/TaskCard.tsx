"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { TaskAssignee } from "./TaskAssignee"
import { TaskPriorityIndicator } from "./TaskPriorityIndicator"
import { TaskDevelopmentStatus } from "./TaskDevelopmentStatus"
import { TaskActivityIndicators } from "./TaskActivityIndicators"
import { useContextualLabel } from "@/hooks/useContextualLabel"
import type { Task } from "@/types"

interface TaskCardProps {
  task: Task
  isPersonalView: boolean
  onDragStart: (task: Task) => void
  onDragEnd: () => void
  onClick: (task: Task) => void
  isRelevant?: boolean
}

export const TaskCard = ({
  task,
  isPersonalView,
  onDragStart,
  onDragEnd,
  onClick,
  isRelevant = true,
}: TaskCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const contextualLabel = useContextualLabel(isPersonalView)

  return (
    <motion.div
      layout
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        opacity: isRelevant ? 1 : 0.15,
        scale: isRelevant ? 1 : 0.96,
      }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        layout: { duration: 0.3 },
      }}
      draggable={isRelevant}
      onDragStart={() => onDragStart(task)}
      onDragEnd={onDragEnd}
      onClick={() => onClick(task)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative bg-white rounded-2xl cursor-pointer transition-all duration-300
        ${isRelevant ? "hover:shadow-lg hover:shadow-black/5" : "pointer-events-none"}
        ${isHovered ? "ring-1 ring-black/5" : "border border-gray-100"}
      `}
      whileHover={isRelevant ? { y: -2 } : {}}
      whileTap={isRelevant ? { scale: 0.98 } : {}}
    >
      {/* Contextual Priority Label */}
      <AnimatePresence>
        {contextualLabel && isPersonalView && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-2 left-4 px-2 py-1 bg-black text-white text-xs rounded-full font-medium"
          >
            {contextualLabel}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-5">
        {/* Primary Information Layer */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0 pr-3">
            <h3 className="font-semibold text-gray-900 text-base leading-snug mb-2 line-clamp-2">{task.title}</h3>

            {/* Progressive Disclosure Layer 1 */}
            <div className="flex items-center gap-3">
              <TaskPriorityIndicator priority={task.priority} />
              <span className="text-xs font-mono text-gray-500 tracking-wide">{task.taskId}</span>
            </div>
          </div>

          <TaskAssignee task={task} />
        </div>

        {/* Progressive Disclosure Layer 2 - Contextual Information */}
        <AnimatePresence>
          {(isHovered || isPersonalView) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="space-y-3"
            >
              <TaskDevelopmentStatus task={task} />
              <TaskActivityIndicators task={task} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Review Request Badge */}
        {task.reviewRequested && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 pt-3 border-t border-gray-100"
          >
            <Badge className="bg-purple-50 text-purple-700 border-purple-200 font-medium">
              <Eye className="h-3 w-3 mr-1" />
              Review Requested
            </Badge>
          </motion.div>
        )}
      </div>

      {/* Subtle interaction indicator */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
}
