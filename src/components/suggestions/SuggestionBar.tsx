"use client"

import { motion } from "framer-motion"
import { GitBranch, GitPullRequest, Zap, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { SuggestionBarProps } from "@/types"

export const SuggestionBar = ({ type, task, onAction, onCancel }: SuggestionBarProps) => {
  const suggestions = {
    branch: {
      text: "Ready to start? Let's create a branch.",
      detail: `feature/${task.taskId.toLowerCase()}-${task.title.toLowerCase().replace(/\s+/g, "-").slice(0, 20)}`,
      action: "Create Branch",
      icon: <GitBranch className="h-4 w-4" />,
    },
    pr: {
      text: "Ready for review? I'll create a pull request.",
      detail: "I'll suggest the best reviewers based on the code changes",
      action: "Create PR",
      icon: <GitPullRequest className="h-4 w-4" />,
    },
    assign: {
      text: `Perfect match found: ${task.assignee?.name}`,
      detail: "Based on expertise and current workload",
      action: "See reasoning",
      icon: <Zap className="h-4 w-4" />,
    },
  }

  const suggestion = suggestions[type]

  return (
    <motion.div
      initial={{ y: 100, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 100, opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-2xl shadow-black/10 px-8 py-6 max-w-md">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600">
            {suggestion.icon}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-semibold text-gray-900 leading-relaxed">{suggestion.text}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={onCancel}
                className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-600 mb-4 leading-relaxed">{suggestion.detail}</p>

            <div className="flex gap-3">
              <Button
                onClick={onAction}
                className="bg-gray-900 hover:bg-gray-800 text-white text-sm px-6 py-2 h-9 rounded-xl font-medium shadow-lg shadow-gray-900/20"
              >
                {suggestion.action}
              </Button>
              {type !== "assign" && (
                <Button
                  variant="ghost"
                  onClick={onCancel}
                  className="text-gray-600 hover:text-gray-800 text-sm px-4 py-2 h-9 rounded-xl"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
