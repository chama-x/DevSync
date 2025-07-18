"use client"

import { motion } from "framer-motion"
import { Users, Filter, Tag, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ViewType } from "@/types"

interface ProjectHeaderProps {
  currentView: ViewType
  onViewToggle: (view: ViewType) => void
}

export const ProjectHeader = ({ currentView, onViewToggle }: ProjectHeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40">
      <div className="px-8 py-8">
        <div className="flex items-center justify-between">
          {/* Enhanced View Toggle */}
          <div className="flex items-center gap-8">
            <motion.div
              className="flex items-center bg-gray-100/80 backdrop-blur-sm rounded-2xl p-1.5"
              whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.9)" }}
            >
              <button
                onClick={() => onViewToggle("team-space")}
                className={`px-8 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                  currentView === "team-space"
                    ? "bg-white text-gray-900 shadow-lg shadow-black/5"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Team Space
              </button>
              <button
                onClick={() => onViewToggle("my-view")}
                className={`px-8 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                  currentView === "my-view"
                    ? "bg-white text-gray-900 shadow-lg shadow-black/5"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                My View
              </button>
            </motion.div>

            {/* Enhanced Filters */}
            <div className="flex items-center gap-2">
              {[
                { icon: Users, label: "Member" },
                { icon: Filter, label: "Epic" },
                { icon: Tag, label: "Labels" },
              ].map(({ icon: Icon, label }) => (
                <Button
                  key={label}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100/50 rounded-xl px-4 py-2 font-medium"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                  <ChevronDown className="h-3 w-3 ml-2" />
                </Button>
              ))}
            </div>
          </div>

          {/* Enhanced Project Info */}
          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Aurora Project</h1>
            <p className="text-sm text-gray-600 font-medium">
              {currentView === "team-space" ? "Complete project overview" : "Your personal workspace"}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
