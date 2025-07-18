export const CURRENT_USER_ID = "user-1"

export const PRIORITY_CONFIG = {
  low: {
    color: "bg-slate-300",
    ring: "ring-slate-200",
    text: "text-slate-600",
  },
  medium: {
    color: "bg-amber-400",
    ring: "ring-amber-200",
    text: "text-amber-700",
  },
  high: {
    color: "bg-orange-500",
    ring: "ring-orange-200",
    text: "text-orange-700",
  },
  critical: {
    color: "bg-red-500",
    ring: "ring-red-200",
    text: "text-red-700",
  },
} as const

export const PR_STATUS_CONFIG = {
  draft: { color: "text-slate-400", bg: "bg-slate-50" },
  open: { color: "text-purple-600", bg: "bg-purple-50" },
  "checks-running": { color: "text-blue-600", bg: "bg-blue-50" },
  approved: { color: "text-emerald-600", bg: "bg-emerald-50" },
  merged: { color: "text-emerald-700", bg: "bg-emerald-100" },
  closed: { color: "text-slate-500", bg: "bg-slate-50" },
} as const

export const PR_STATUS_ICONS = {
  draft: "Clock",
  open: "AlertCircle",
  "checks-running": "Clock",
  approved: "CheckCircle",
  merged: "CheckCircle",
  closed: "X",
} as const
