"use client"

import { useMemo } from "react"
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
  const contextualLabel = useContextualLabel(isPersonalView)

  // Memoize the card content to prevent unnecessary re-renders
  const cardContent = useMemo(
    () => (
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

        {/* Progressive Disclosure Layer 2 - Always show in Personal View */}
        {isPersonalView && (
          <div className="space-y-3 mb-3">
            <TaskDevelopmentStatus task={task} />
            <TaskActivityIndicators task={task} />
          </div>
        )}

        {/* Review Request Badge */}
        {task.reviewRequested && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <Badge className="bg-purple-50 text-purple-700 border-purple-200 font-medium">
              <Eye className="h-3 w-3 mr-1" />
              Review Requested
            </Badge>
          </div>
        )}
      </div>
    ),
    [task, isPersonalView],
  )

  return (
    <motion.div
      layout
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        opacity: isRelevant ? 1 : 0.15,
        scale: isRelevant ? 1 : 0.98,
      }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        layout: {
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1],
          type: "tween",
        },
      }}
      draggable={isRelevant}
      onDragStart={() => onDragStart(task)}
      onDragEnd={onDragEnd}
      onClick={() => onClick(task)}
      className={`
        group relative bg-white rounded-2xl cursor-pointer border border-gray-100
        ${isRelevant ? "" : "pointer-events-none"}
      `}
      whileHover={
        isRelevant
          ? {
              y: -1,
              transition: {
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
                type: "tween",
              },
            }
          : {}
      }
      whileTap={
        isRelevant
          ? {
              scale: 0.995,
              y: 0,
              transition: {
                duration: 0.15,
                ease: [0.16, 1, 0.3, 1],
                type: "tween",
              },
            }
          : {}
      }
    >
      {/* Contextual Priority Label */}
      <AnimatePresence>
        {contextualLabel && isPersonalView && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                type: "tween",
              },
            }}
            exit={{
              opacity: 0,
              y: -8,
              scale: 0.95,
              transition: {
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1],
                type: "tween",
              },
            }}
            className="absolute -top-2 left-4 px-2 py-1 bg-black text-white text-xs rounded-full font-medium"
          >
            {contextualLabel}
          </motion.div>
        )}
      </AnimatePresence>

      {cardContent}
    </motion.div>
  )
}
