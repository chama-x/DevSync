export interface Task {
  id: string
  title: string
  taskId: string
  priority: "low" | "medium" | "high" | "critical"
  assignee?: {
    name: string
    avatar?: string
    initials: string
    id: string
  }
  status: "backlog" | "todo" | "in-progress" | "in-review" | "done"
  branch?: string
  pullRequest?: {
    status: "draft" | "open" | "merged" | "closed" | "checks-running" | "approved"
    number: number
  }
  commits?: Array<{
    hash: string
    message: string
    author: string
    timestamp: string
  }>
  unreadComments?: number
  mentions?: boolean
  reviewRequested?: boolean
  description?: string
  epic?: string
  labels?: string[]
  lastActivity?: string
  aiReasoning?: string
  dueDate?: string
  estimatedHours?: number
  completedHours?: number
}

export interface Column {
  id: string
  title: string
  tasks: Task[]
  hasBottleneck?: boolean
  avgTimeInColumn?: string
  oldestTask?: string
}

export interface SuggestionBarProps {
  type: "branch" | "pr" | "assign"
  task: Task
  onAction: () => void
  onCancel: () => void
}

export type ViewType = "team-space" | "my-view"
