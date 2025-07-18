"use client"

import { useState } from "react"
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
  const [isHovered, setIsHovered] = useState(false)

  const relevantTasks = isPersonalView
    ? column.tasks.filter((task) => task.assignee?.id === CURRENT_USER_ID || task.reviewRequested || task.mentions)
    : column.tasks

  const visibleTaskCount = isPersonalView ? relevantTasks.length : column.tasks.length

  return (
    <div className="flex-shrink-0 w-80">
      <motion.div
        className="bg-gray-50/80 backdrop-blur-sm rounded-3xl p-6 h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.9)" }}
        transition={{ duration: 0.2 }}
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
              {visibleTaskCount}
            </Badge>
          </div>
        </div>

        {/* Progressive Column Stats */}
        <AnimatePresence>
          {isHovered && (column.avgTimeInColumn || column.oldestTask) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 bg-white/60 rounded-xl text-xs text-gray-600 space-y-1"
            >
              {column.avgTimeInColumn && (
                <div className="flex justify-between">
                  <span>Avg. time:</span>
                  <span className="font-medium">{column.avgTimeInColumn}</span>
                </div>
              )}
              {column.oldestTask && (
                <div className="flex justify-between">
                  <span>Oldest task:</span>
                  <span className="font-medium">{column.oldestTask}</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Task List */}
        <div className="space-y-4 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {column.tasks.map((task) => {
              const isRelevant =
                !isPersonalView || task.assignee?.id === CURRENT_USER_ID || task.reviewRequested || task.mentions

              return (
                <TaskCard
                  key={task.id}
                  task={task}
                  isPersonalView={isPersonalView}
                  onDragStart={onTaskDragStart}
                  onDragEnd={onTaskDragEnd}
                  onClick={onTaskClick}
                  isRelevant={isRelevant}
                />
              )
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
