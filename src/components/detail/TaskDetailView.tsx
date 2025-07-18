"use client"

import { motion } from "framer-motion"
import { Clock, AlertCircle, CheckCircle, X, GitBranch, GitCommit, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Task } from "@/types"

interface TaskDetailViewProps {
  task: Task
  onClose: () => void
}

export const TaskDetailView = ({ task, onClose }: TaskDetailViewProps) => {
  const prStatusIcons = {
    draft: <Clock className="h-4 w-4 text-gray-400" />,
    open: <AlertCircle className="h-4 w-4 text-purple-500" />,
    "checks-running": <Clock className="h-4 w-4 text-blue-500" />,
    approved: <CheckCircle className="h-4 w-4 text-green-500" />,
    merged: <CheckCircle className="h-4 w-4 text-green-600" />,
    closed: <X className="h-4 w-4 text-red-500" />,
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 z-50 bg-white overflow-y-auto"
    >
      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Enhanced Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="sm" onClick={onClose} className="h-10 w-10 p-0 rounded-2xl hover:bg-gray-100">
              <X className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{task.taskId}</span>
              <div
                className={`w-3 h-3 rounded-full ${
                  task.priority === "critical"
                    ? "bg-red-500"
                    : task.priority === "high"
                      ? "bg-orange-500"
                      : task.priority === "medium"
                        ? "bg-amber-400"
                        : "bg-slate-300"
                }`}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Select defaultValue={task.status}>
              <SelectTrigger className="w-40 h-10 rounded-xl border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="backlog">Backlog</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>

            {task.assignee && (
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-gray-100">
                  <AvatarFallback className="text-sm font-medium">{task.assignee.initials}</AvatarFallback>
                </Avatar>
                <span className="text-base font-medium text-gray-800">{task.assignee.name}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Enhanced Title */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-gray-900 mb-12 leading-tight max-w-4xl"
        >
          {task.title}
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 space-y-12"
          >
            {/* Description */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Description</h2>
              <div className="prose prose-lg prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {task.description ||
                    "Implement a comprehensive authentication flow that includes social login options, two-factor authentication, and proper session management. The system should be secure, user-friendly, and integrate seamlessly with our existing user management infrastructure."}
                </p>
              </div>
            </section>

            {/* Enhanced Development Section */}
            {(task.branch || task.pullRequest || task.commits) && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Development</h2>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-3xl p-8 space-y-6">
                  {task.branch && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                        <GitBranch className="h-6 w-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <span className="font-mono text-base text-gray-800 font-medium">{task.branch}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Active</Badge>
                        </div>
                      </div>
                    </div>
                  )}

                  {task.pullRequest && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                        {prStatusIcons[task.pullRequest.status]}
                      </div>
                      <div className="flex-1">
                        <span className="text-base font-medium text-gray-800">
                          Pull Request #{task.pullRequest.number}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="capitalize">
                            {task.pullRequest.status.replace("-", " ")}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )}

                  {task.commits && task.commits.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-base font-bold text-gray-800 flex items-center gap-3">
                        <GitCommit className="h-5 w-5" />
                        Recent Commits
                      </h3>
                      <div className="space-y-3">
                        {task.commits.slice(0, 3).map((commit) => (
                          <div key={commit.hash} className="flex items-start gap-4 p-4 bg-white rounded-2xl">
                            <code className="text-xs font-mono text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
                              {commit.hash.slice(0, 7)}
                            </code>
                            <div className="flex-1">
                              <p className="text-gray-800 font-medium">{commit.message}</p>
                              <p className="text-sm text-gray-500 mt-1">
                                {commit.author} • {commit.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Enhanced AI Reasoning */}
            {task.aiReasoning && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-6">AI Assignment Reasoning</h2>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <Zap className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-gray-800 leading-relaxed text-lg flex-1">{task.aiReasoning}</p>
                  </div>
                </div>
              </section>
            )}

            {/* Enhanced Conversation */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Conversation</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Avatar className="h-12 w-12 ring-2 ring-gray-100">
                    <AvatarFallback className="bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-700 font-medium">
                      SC
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-bold text-gray-900">Sarah Chen</span>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Started working on the OAuth integration. The Google provider is complete and tested. Working on
                      GitHub integration next, should be ready for review by tomorrow.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Avatar className="h-12 w-12 ring-2 ring-gray-100">
                    <AvatarFallback className="bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 font-medium">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-gray-50 rounded-3xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-bold text-gray-900">System</span>
                      <span className="text-sm text-gray-500">1 hour ago</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Branch{" "}
                      <code className="bg-gray-200 px-2 py-1 rounded font-mono text-sm">
                        feature/auth-123-oauth-integration
                      </code>{" "}
                      created and linked to this task.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>

          {/* Enhanced Sidebar */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-3xl p-6">
              <h3 className="font-bold text-gray-900 mb-6">Details</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Priority</span>
                  <Badge variant="secondary" className="capitalize font-medium">
                    {task.priority}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Epic</span>
                  <span className="text-gray-800 font-medium">{task.epic || "Authentication"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Activity</span>
                  <span className="text-gray-800 font-medium">{task.lastActivity || "2 hours ago"}</span>
                </div>
                {task.dueDate && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Due Date</span>
                    <span className="text-gray-800 font-medium">{task.dueDate}</span>
                  </div>
                )}
              </div>
            </div>

            {task.labels && task.labels.length > 0 && (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-3xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Labels</h3>
                <div className="flex flex-wrap gap-2">
                  {task.labels.map((label) => (
                    <Badge key={label} variant="outline" className="text-xs font-medium">
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
