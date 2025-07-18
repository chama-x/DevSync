"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { KanbanColumn } from "@/components/kanban/KanbanColumn"
import { SuggestionBar } from "@/components/suggestions/SuggestionBar"
import { TaskDetailView } from "@/components/detail/TaskDetailView"
import { ProjectHeader } from "@/components/header/ProjectHeader"
import { mockTasks, createColumns } from "@/data/mockData"
import type { Task, ViewType } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

const currentUserId = "user-1"
const currentTime = new Date().getHours()

const TaskCard = ({
  task,
  isPersonalView,
  onDragStart,
  onDragEnd,
  onClick,
  isRelevant = true,
}: {
  task: Task
  isPersonalView: boolean
  onDragStart: (task: Task) => void
  onDragEnd: () => void
  onClick: (task: Task) => void
  isRelevant?: boolean
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showAISuggestion, setShowAISuggestion] = useState(false)

  // Enhanced priority system with semantic colors
  const priorityConfig = {
    low: { color: "bg-slate-300", ring: "ring-slate-200", text: "text-slate-600" },
    medium: { color: "bg-amber-400", ring: "ring-amber-200", text: "text-amber-700" },
    high: { color: "bg-orange-500", ring: "ring-orange-200", text: "text-orange-700" },
    critical: { color: "bg-red-500", ring: "ring-red-200", text: "text-red-700" },
  }

  const prStatusConfig = {
    draft: { color: "text-slate-400", bg: "bg-slate-50" },
    open: { color: "text-purple-600", bg: "bg-purple-50" },
    "checks-running": { color: "text-blue-600", bg: "bg-blue-50" },
    approved: { color: "text-emerald-600", bg: "bg-emerald-50" },
    merged: { color: "text-emerald-700", bg: "bg-emerald-100" },
    closed: { color: "text-slate-500", bg: "bg-slate-50" },
  }

  // Context-aware content based on time and view
  const getContextualPriority = () => {
    if (isPersonalView) {
      if (currentTime < 12) return "Today's Focus"
      if (currentTime < 17) return "In Progress"
      return "Tomorrow's Prep"
    }
    return null
  }

  const contextualLabel = getContextualPriority()
  const config = priorityConfig[task.priority]

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
              <div className={`w-2 h-2 rounded-full ${config.color} ring-2 ${config.ring}`} />
              <span className="text-xs font-mono text-gray-500 tracking-wide">{task.taskId}</span>
            </div>
          </div>

          {/* Assignee with AI Suggestion */}
          <div
            className="relative flex-shrink-0"
            onMouseEnter={() => !task.assignee && setShowAISuggestion(true)}
            onMouseLeave={() => setShowAISuggestion(false)}
          >
            {task.assignee ? (
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <div className="h-9 w-9 ring-2 ring-white shadow-sm flex items-center justify-center">
                  {task.assignee.avatar ? (
                    <img
                      src={task.assignee.avatar || "/placeholder.svg"}
                      alt="Assignee Avatar"
                      className="rounded-full"
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-700 text-sm font-medium rounded-full flex items-center justify-center">
                      {task.assignee.initials}
                    </div>
                  )}
                </div>
                {task.assignee.id === currentUserId && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
                )}
              </motion.div>
            ) : (
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="h-9 w-9 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-gray-300 rounded-full" />
                </motion.div>

                {/* Enhanced AI Suggestion */}
                <AnimatePresence>
                  {showAISuggestion && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute top-12 right-0 z-20 bg-gray-900 text-white text-xs px-3 py-2 rounded-xl whitespace-nowrap shadow-lg"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-700 text-sm font-medium rounded-full flex items-center justify-center">
                          Zap
                        </div>
                        <span>Sarah Chen (92% match)</span>
                      </div>
                      <div className="absolute -top-1 right-3 w-2 h-2 bg-gray-900 rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
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
              {/* Development Status */}
              {(task.branch || task.pullRequest) && (
                <div className="flex items-center gap-3 text-sm">
                  {task.branch && (
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <div className="h-3.5 w-3.5 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-full flex items-center justify-center">
                        GitBranch
                      </div>
                      <span className="font-mono text-xs">Active</span>
                    </div>
                  )}
                  {task.pullRequest && (
                    <div
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${prStatusConfig[task.pullRequest.status].bg} ${prStatusConfig[task.pullRequest.status].color}`}
                    >
                      <div className="h-3 w-3 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-full flex items-center justify-center">
                        GitPullRequest
                      </div>
                      <span className="capitalize">{task.pullRequest.status.replace("-", " ")}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Activity Indicators */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {task.unreadComments && (
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <div className="h-3.5 w-3.5 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-full flex items-center justify-center">
                        MessageCircle
                      </div>
                      <span className="text-xs font-medium">{task.unreadComments}</span>
                    </div>
                  )}
                  {task.dueDate && (
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <div className="h-3.5 w-3.5 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-full flex items-center justify-center">
                        Calendar
                      </div>
                      <span className="text-xs">{task.dueDate}</span>
                    </div>
                  )}
                </div>

                {/* Progress Indicator */}
                {task.estimatedHours && task.completedHours && (
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(task.completedHours / task.estimatedHours) * 100}%` }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
                      {Math.round((task.completedHours / task.estimatedHours) * 100)}%
                    </span>
                  </div>
                )}
              </div>
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
            <div className="bg-purple-50 text-purple-700 border-purple-200 font-medium rounded-full flex items-center gap-2 p-2">
              <div className="h-3 w-3 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-full flex items-center justify-center">
                Eye
              </div>
              Review Requested
            </div>
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

export default function TeamSpaceInterface() {
  const [currentView, setCurrentView] = useState<ViewType>("team-space")
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [suggestionBar, setSuggestionBar] = useState<{
    type: "branch" | "pr" | "assign"
    task: Task
  } | null>(null)
  const [focusedTask, setFocusedTask] = useState<Task | null>(null)
  const [addColumnOpen, setAddColumnOpen] = useState(false)
  const [newColumnName, setNewColumnName] = useState("")

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
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <ProjectHeader currentView={currentView} onViewToggle={handleViewToggle} />

        {/* Enhanced Main Board */}
        <main className="p-8">
          <div className="flex gap-8 overflow-x-auto pb-8 items-start">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                isPersonalView={currentView === "my-view"}
                onTaskDragStart={handleTaskDragStart}
                onTaskDragEnd={handleTaskDragEnd}
                onTaskClick={handleTaskClick}
              />
            ))}
            {/* Add Column Button */}
            <div className="flex flex-col items-center justify-start min-w-[20rem]">
              <Dialog open={addColumnOpen} onOpenChange={setAddColumnOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-32 w-full mt-2 flex flex-col items-center justify-center border-dashed border-2 border-gray-300 text-gray-500 hover:border-primary/60 hover:text-primary">
                    + Add Column
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Column</DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={e => {
                      e.preventDefault()
                      // Stub: handle add column logic here
                      setAddColumnOpen(false)
                      setNewColumnName("")
                    }}
                  >
                    <input
                      type="text"
                      className="w-full border rounded-md px-3 py-2 mb-4"
                      placeholder="Column name"
                      value={newColumnName}
                      onChange={e => setNewColumnName(e.target.value)}
                      required
                      autoFocus
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="ghost">Cancel</Button>
                      </DialogClose>
                      <Button type="submit" disabled={!newColumnName.trim()}>Add Column</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
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
