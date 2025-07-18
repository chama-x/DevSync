// App Configuration
export const APP_CONFIG = {
  name: 'WeSync',
  description: 'A powerful AI-driven project management platform',
  version: '1.0.0',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;

// Animation Constants
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 400,
  suggestion_auto_dismiss: 10000, // 10 seconds
} as const;

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Drag and Drop
export const DRAG_TYPES = {
  TASK: 'task',
  COLUMN: 'column',
} as const;

// Task Management
export const TASK_LIMITS = {
  title_max_length: 100,
  description_max_length: 2000,
  max_assignees: 5,
  max_labels: 10,
} as const;

// Performance Thresholds
export const PERFORMANCE_THRESHOLDS = {
  bottleneck_task_count: 8, // Tasks in column to trigger bottleneck warning
  max_animation_frame_time: 16.67, // 60fps target
  debounce_search: 300,
  throttle_resize: 100,
} as const;

// UI Constants
export const UI_CONSTANTS = {
  min_touch_target: 44, // Minimum touch target size in pixels
  modal_backdrop_blur: 12,
  card_border_radius: 8,
  max_mobile_columns: 1, // Number of columns to show on mobile
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  theme: 'wesync-theme',
  view_mode: 'wesync-view-mode',
  filters: 'wesync-filters',
  user_preferences: 'wesync-user-preferences',
  draft_tasks: 'wesync-draft-tasks',
} as const;

// API Endpoints (for future Supabase integration)
export const API_ENDPOINTS = {
  tasks: '/api/tasks',
  users: '/api/users',
  projects: '/api/projects',
  suggestions: '/api/ai-suggestions',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection.',
  unauthorized: 'You are not authorized to perform this action.',
  task_not_found: 'Task not found.',
  validation_failed: 'Please check your input and try again.',
  generic: 'Something went wrong. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  task_created: 'Task created successfully!',
  task_updated: 'Task updated successfully!',
  task_deleted: 'Task deleted successfully!',
  status_changed: 'Status updated successfully!',
} as const;

// View Modes
export const VIEW_MODES = {
  TEAM_SPACE: 'team-space',
  MY_VIEW: 'my-view',
} as const;

// Task Priorities
export const TASK_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

// Task Statuses
export const TASK_STATUSES = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  REVIEW: 'review',
  DONE: 'done',
} as const;

// AI Suggestion Types
export const AI_SUGGESTION_TYPES = {
  BRANCH: 'branch',
  PULL_REQUEST: 'pull-request',
  ASSIGN: 'assign',
  PRIORITY: 'priority',
  DEPENDENCY: 'dependency',
} as const;

// Color Palette for Priority Indicators
export const PRIORITY_COLORS = {
  [TASK_PRIORITIES.LOW]: 'bg-blue-500',
  [TASK_PRIORITIES.MEDIUM]: 'bg-yellow-500',
  [TASK_PRIORITIES.HIGH]: 'bg-orange-500',
  [TASK_PRIORITIES.URGENT]: 'bg-red-500',
} as const;

// Status Colors
export const STATUS_COLORS = {
  [TASK_STATUSES.TODO]: 'bg-gray-500',
  [TASK_STATUSES.IN_PROGRESS]: 'bg-blue-500',
  [TASK_STATUSES.REVIEW]: 'bg-yellow-500',
  [TASK_STATUSES.DONE]: 'bg-green-500',
} as const;
