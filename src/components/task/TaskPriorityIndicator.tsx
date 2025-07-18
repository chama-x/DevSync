"use client"

import type { Task } from "@/types"
import { PRIORITY_CONFIG } from "@/constants"

interface TaskPriorityIndicatorProps {
  priority: Task["priority"]
}

export const TaskPriorityIndicator = ({ priority }: TaskPriorityIndicatorProps) => {
  const config = PRIORITY_CONFIG[priority]

  return <div className={`w-2 h-2 rounded-full ${config.color} ring-2 ${config.ring}`} />
}
