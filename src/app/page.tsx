"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { KanbanColumn } from "@/components/kanban/KanbanColumn"
import { SuggestionBar } from "@/components/suggestions/SuggestionBar"
import { TaskDetailView } from "@/components/detail/TaskDetailView"
import { ProjectHeader } from "@/components/header/ProjectHeader"
import { mockTasks, createColumns } from "@/data/mockData"
import type { Task, ViewType } from "@/types"

export default function TeamSpaceInterface() {
  const [currentView, setCurrentView] = useState<ViewType>("team-space")
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [suggestionBar, setSuggestionBar] = useState<{
    type: "branch" | "pr" | "assign"
    task: Task
  } | null>(null)
  const [focusedTask, setFocusedTask] = useState<Task | null>(null)

  const columns = createColumns(mockTasks)

  const handleViewToggle = (view: ViewType) => {
    setCurrentView(view)
  }

  const handleTaskDragStart = (task: Task) => {
    setDraggedTask(task)
  }

  const handleTaskDragEnd = () => {
    if (draggedTask && currentView === "my-view") {
      if (draggedTask.status === "todo") {
        setSuggestionBar({ type: "branch", task: draggedTask })
      } else if (draggedTask.status === "in-progress") {
        setSuggestionBar({ type: "pr", task: draggedTask })
      }
    }
    setDraggedTask(null)
  }

  const handleTaskClick = (task: Task) => {
    setFocusedTask(task)
  }

  const handleSuggestionAction = () => {
    setSuggestionBar(null)
  }

  const handleSuggestionCancel = () => {
    setSuggestionBar(null)
  }

  const handleCloseFocused = () => {
    setFocusedTask(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <AnimatePresence>
        {focusedTask && <TaskDetailView task={focusedTask} onClose={handleCloseFocused} />}
      </AnimatePresence>

      <motion.div
        animate={focusedTask ? { filter: "blur(12px)", opacity: 0.3 } : { filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <ProjectHeader currentView={currentView} onViewToggle={handleViewToggle} />

        {/* Enhanced Main Board with Cleaner Animations */}
        <main className="p-8">
          <motion.div
            className="flex gap-8 overflow-x-auto pb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
              staggerChildren: 0.1,
            }}
          >
            {columns.map((column, index) => (
              <motion.div
                key={column.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: index * 0.1,
                }}
              >
                <KanbanColumn
                  column={column}
                  isPersonalView={currentView === "my-view"}
                  onTaskDragStart={handleTaskDragStart}
                  onTaskDragEnd={handleTaskDragEnd}
                  onTaskClick={handleTaskClick}
                />
              </motion.div>
            ))}
          </motion.div>
        </main>
      </motion.div>

      <AnimatePresence>
        {suggestionBar && (
          <SuggestionBar
            type={suggestionBar.type}
            task={suggestionBar.task}
            onAction={handleSuggestionAction}
            onCancel={handleSuggestionCancel}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
