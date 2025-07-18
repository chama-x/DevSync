// Core Entity Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  members: ProjectMember[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectMember {
  userId: string;
  user: User;
  role: ProjectRole;
  joinedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeIds: string[];
  assignees: User[];
  authorId: string;
  author: User;
  projectId: string;
  labels: Label[];
  dueDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
  position: number;
  createdAt: Date;
  updatedAt: Date;
  // AI-related fields
  relevanceScore?: number; // For personal view mode
  aiSuggestions?: AISuggestion[];
  developmentStatus?: DevelopmentStatus;
  // Compatibility fields for current implementation (TODO: migrate to arrays)
  assignee?: { name: string; initials: string; id: string; avatar?: string };
  reviewRequested?: boolean;
  mentions?: boolean;
  taskId?: string;
  epic?: string;
  branch?: string;
  pullRequest?: { status: string; number: number };
  commits?: {
    hash: string;
    message: string;
    author: string;
    timestamp: string;
  }[];
  unreadComments?: number;
  lastActivity?: string;
  completedHours?: number;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  projectId: string;
  createdAt: Date;
}

export interface Column {
  id: string;
  title: string;
  status: TaskStatus;
  tasks: Task[];
  position: number;
  taskCount: number;
  isBottleneck?: boolean;
  averageTimeInColumn?: number; // in hours
  // Compatibility fields for current implementation
  hasBottleneck?: boolean;
  avgTimeInColumn?: string;
  oldestTask?: string;
}

export interface AISuggestion {
  id: string;
  type: AISuggestionType;
  title: string;
  description: string;
  confidence: number; // 0-1
  taskId?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  isAccepted?: boolean;
  isDismissed?: boolean;
}

// Enums
export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export enum ProjectRole {
  OWNER = "owner",
  ADMIN = "admin",
  MEMBER = "member",
  VIEWER = "viewer",
}

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  REVIEW = "review",
  DONE = "done",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export enum AISuggestionType {
  BRANCH = "branch",
  PULL_REQUEST = "pull-request",
  ASSIGN = "assign",
  PRIORITY = "priority",
  DEPENDENCY = "dependency",
  ESTIMATION = "estimation",
}

export enum ViewMode {
  TEAM_SPACE = "team-space",
  MY_VIEW = "my-view",
}

export enum DevelopmentStatus {
  NOT_STARTED = "not-started",
  BRANCH_CREATED = "branch-created",
  IN_DEVELOPMENT = "in-development",
  PR_OPEN = "pr-open",
  PR_REVIEW = "pr-review",
  READY_TO_MERGE = "ready-to-merge",
  MERGED = "merged",
}

// Component Props Types
export interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
  isRelevant?: boolean;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onStatusChange?: (taskId: string, status: TaskStatus) => void;
}

export interface KanbanColumnProps {
  column: Column;
  onTaskDrop?: (
    taskId: string,
    newStatus: TaskStatus,
    newPosition: number,
  ) => void;
  onTaskCreate?: (status: TaskStatus) => void;
}

export interface AISuggestionBarProps {
  suggestions: AISuggestion[];
  onAccept?: (suggestionId: string) => void;
  onDismiss?: (suggestionId: string) => void;
  onDismissAll?: () => void;
}

export interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (task: Partial<Task>) => void;
  onDelete?: (taskId: string) => void;
}

// State Management Types
export interface AppState {
  currentUser: User | null;
  viewMode: ViewMode;
  filters: FilterState;
  theme: "light" | "dark" | "system";
  isLoading: boolean;
  error: string | null;
}

export interface BoardState {
  columns: Column[];
  tasks: Task[];
  draggedTask: Task | null;
  dragOverColumn: string | null;
  selectedTask: Task | null;
  isTaskModalOpen: boolean;
}

export interface FilterState {
  search: string;
  members: string[];
  labels: string[];
  priorities: TaskPriority[];
  statuses: TaskStatus[];
  epic?: string;
}

// Context Types
export interface AppContextType {
  state: AppState;
  actions: {
    setCurrentUser: (user: User | null) => void;
    setViewMode: (mode: ViewMode) => void;
    setFilters: (filters: Partial<FilterState>) => void;
    setTheme: (theme: "light" | "dark" | "system") => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
  };
}

export interface BoardContextType {
  state: BoardState;
  actions: {
    setColumns: (columns: Column[]) => void;
    setTasks: (tasks: Task[]) => void;
    moveTask: (
      taskId: string,
      newStatus: TaskStatus,
      newPosition: number,
    ) => void;
    createTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
    updateTask: (taskId: string, updates: Partial<Task>) => void;
    deleteTask: (taskId: string) => void;
    setDraggedTask: (task: Task | null) => void;
    setDragOverColumn: (columnId: string | null) => void;
    setSelectedTask: (task: Task | null) => void;
    setTaskModalOpen: (open: boolean) => void;
  };
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface CreateTaskForm {
  title: string;
  description?: string;
  priority: TaskPriority;
  assigneeIds: string[];
  labelIds: string[];
  dueDate?: Date;
  estimatedHours?: number;
}

export interface UpdateTaskForm extends Partial<CreateTaskForm> {
  status?: TaskStatus;
}

export interface CreateProjectForm {
  name: string;
  description?: string;
  memberEmails: string[];
}

// Hook Return Types
export interface UseTaskManagementReturn {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  createTask: (task: CreateTaskForm) => Promise<Task>;
  updateTask: (taskId: string, updates: UpdateTaskForm) => Promise<Task>;
  deleteTask: (taskId: string) => Promise<void>;
  moveTask: (
    taskId: string,
    newStatus: TaskStatus,
    newPosition: number,
  ) => Promise<void>;
  refreshTasks: () => Promise<void>;
}

export interface UseAISuggestionsReturn {
  suggestions: AISuggestion[];
  loading: boolean;
  generateSuggestions: (context: SuggestionContext) => Promise<void>;
  acceptSuggestion: (suggestionId: string) => Promise<void>;
  dismissSuggestion: (suggestionId: string) => Promise<void>;
  dismissAllSuggestions: () => Promise<void>;
}

export interface UseResponsiveLayoutReturn {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenSize: keyof typeof import("../constants").BREAKPOINTS;
  orientation: "portrait" | "landscape";
}

// Utility Types
export type SuggestionContext = {
  type: "drag" | "status_change" | "task_create" | "task_update";
  taskId?: string;
  fromStatus?: TaskStatus;
  toStatus?: TaskStatus;
  viewMode: ViewMode;
  currentUser: User;
};

export type DragEndEvent = {
  taskId: string;
  source: {
    status: TaskStatus;
    position: number;
  };
  destination: {
    status: TaskStatus;
    position: number;
  };
};

export type AnimationConfig = {
  duration: number;
  easing: string;
  delay?: number;
};

export type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
};

// Type Guards
export const isTask = (obj: any): obj is Task => {
  return obj && typeof obj.id === "string" && typeof obj.title === "string";
};

export const isUser = (obj: any): obj is User => {
  return obj && typeof obj.id === "string" && typeof obj.email === "string";
};

export const isValidTaskStatus = (status: string): status is TaskStatus => {
  return Object.values(TaskStatus).includes(status as TaskStatus);
};

export const isValidTaskPriority = (
  priority: string,
): priority is TaskPriority => {
  return Object.values(TaskPriority).includes(priority as TaskPriority);
};

// Utility type for making certain fields optional
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Type for component variants
export type ComponentVariant =
  | "default"
  | "primary"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost";

// Type for component sizes
export type ComponentSize = "sm" | "md" | "lg" | "xl";
