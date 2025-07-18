"use client"

import { useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { TaskCard } from "@/components/task/TaskCard"
import type { Task, Column } from "@/types"
import { CURRENT_USER_ID } from "@/constants"

interface KanbanColumnProps {
  column: Column
  isPersonalView: boolean
  onTaskDragStart: (task: Task) => void
  onTaskDragEnd: () => void
  onTaskClick: (task: Task) => void
}

export const KanbanColumn = ({
  column,
  isPersonalView,
  onTaskDragStart,
  onTaskDragEnd,
  onTaskClick,
}: KanbanColumnProps) => {
  // Memoize filtered tasks to prevent unnecessary recalculations
  const { visibleTasks, taskCount } = useMemo(() => {
    if (isPersonalView) {
      // In My View: Show only tasks assigned to current user, tasks mentioning them, or tasks requesting their review
      const filtered = column.tasks.filter(
        (task) => task.assignee?.id === CURRENT_USER_ID || task.reviewRequested || task.mentions,
      )
      return { visibleTasks: filtered, taskCount: filtered.length }
    }
    // In Team Space: Show all tasks
    return { visibleTasks: column.tasks, taskCount: column.tasks.length }
  }, [column.tasks, isPersonalView])

  return (
    <div className="flex-shrink-0 w-80">
      <motion.div
        className="bg-gray-50/80 backdrop-blur-sm rounded-3xl p-6 h-full"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.1,
          type: "tween",
        }}
      >
        {/* Enhanced Column Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.h2
              className={`text-lg font-bold text-gray-900 ${column.hasBottleneck ? "text-amber-700" : ""}`}
              animate={
                column.hasBottleneck
                  ? {
                      textShadow: [
                        "0 0 0px rgba(245, 158, 11, 0)",
                        "0 0 8px rgba(245, 158, 11, 0.3)",
                        "0 0 0px rgba(245, 158, 11, 0)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: column.hasBottleneck ? Number.POSITIVE_INFINITY : 0 }}
            >
              {column.title}
            </motion.h2>

            {/* Bottleneck Indicator */}
            {column.hasBottleneck && (
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-2.5 h-2.5 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm font-semibold px-3 py-1">
              {taskCount}
            </Badge>
          </div>
        </div>

        {/* Task List - Optimized for smooth transitions */}
        <div className="space-y-4 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {visibleTasks.map((task, index) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                    delay: index * 0.02,
                    type: "tween",
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -12,
                  scale: 0.98,
                  transition: {
                    duration: 0.25,
                    ease: [0.16, 1, 0.3, 1],
                    type: "tween",
                  },
                }}
                transition={{
                  layout: {
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                    type: "tween",
                  },
                }}
              >
                <TaskCard
                  task={task}
                  isPersonalView={isPersonalView}
                  onDragStart={onTaskDragStart}
                  onDragEnd={onTaskDragEnd}
                  onClick={onTaskClick}
                  isRelevant={true} // All visible tasks are relevant
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
