"use client"

import { MessageCircle, Calendar } from "lucide-react"
import type { Task } from "@/types"
import { ProgressBar } from "@/components/ui/ProgressBar"

interface TaskActivityIndicatorsProps {
  task: Task
}

export const TaskActivityIndicators = ({ task }: TaskActivityIndicatorsProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {task.unreadComments && (
          <div className="flex items-center gap-1.5 text-gray-600">
            <MessageCircle className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{task.unreadComments}</span>
          </div>
        )}
        {task.dueDate && (
          <div className="flex items-center gap-1.5 text-gray-600">
            <Calendar className="h-3.5 w-3.5" />
            <span className="text-xs">{task.dueDate}</span>
          </div>
        )}
      </div>

      {task.estimatedHours && task.completedHours && (
        <ProgressBar completed={task.completedHours} total={task.estimatedHours} />
      )}
    </div>
  )
}
