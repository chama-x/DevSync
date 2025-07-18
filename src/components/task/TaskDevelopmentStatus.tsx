"use client"

import { GitBranch, GitPullRequest } from "lucide-react"
import type { Task } from "@/types"
import { PR_STATUS_CONFIG } from "@/constants"

interface TaskDevelopmentStatusProps {
  task: Task
}

export const TaskDevelopmentStatus = ({ task }: TaskDevelopmentStatusProps) => {
  if (!task.branch && !task.pullRequest) return null

  return (
    <div className="flex items-center gap-3 text-sm">
      {task.branch && (
        <div className="flex items-center gap-1.5 text-gray-600">
          <GitBranch className="h-3.5 w-3.5" />
          <span className="font-mono text-xs">Active</span>
        </div>
      )}
      {task.pullRequest && (
        <div
          className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${PR_STATUS_CONFIG[task.pullRequest.status].bg} ${PR_STATUS_CONFIG[task.pullRequest.status].color}`}
        >
          <GitPullRequest className="h-3 w-3" />
          <span className="capitalize">{task.pullRequest.status.replace("-", " ")}</span>
        </div>
      )}
    </div>
  )
}
