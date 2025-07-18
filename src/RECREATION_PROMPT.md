# AI Project Management Platform - Recreation Prompt

## 🎯 Project Overview

Create a hyper-minimalist AI-powered project management platform with a focus on progressive disclosure, ambient intelligence, and seamless user experience. The platform should feel like a living, breathing workspace that adapts to user context and provides proactive assistance.

## 🎨 Core Design Philosophy

### Visual Identity
- **Hyper-minimalist aesthetic** with generous white space
- **Subtle gradients** and soft shadows for depth without clutter
- **Progressive disclosure** - information appears contextually when needed
- **Ambient intelligence** - AI suggestions feel natural and unobtrusive
- **Living interface** - components breathe and respond to user interaction

### Color Palette
\`\`\`css
Primary: #000000 (Pure black for text and primary actions)
Secondary: #6b7280 (Gray-500 for secondary text)
Background: Linear gradient from #f9fafb via white to #f9fafb
Accent: #3b82f6 (Blue-500 for interactive elements)
Success: #10b981 (Emerald-500)
Warning: #f59e0b (Amber-500)
Error: #ef4444 (Red-500)

Priority Colors:
- Critical: #ef4444 (Red-500)
- High: #f97316 (Orange-500) 
- Medium: #fbbf24 (Amber-400)
- Low: #cbd5e1 (Slate-300)
\`\`\`

### Typography
- **Font Family**: Inter (system fallback: ui-sans-serif, system-ui)
- **Hierarchy**: 
  - Headers: 2xl-4xl, font-bold
  - Body: base-lg, font-medium/semibold
  - Captions: xs-sm, font-medium
  - Code: font-mono, tracking-wide

## 🏗️ Layout Architecture

### Header (Sticky Navigation)
\`\`\`
┌─────────────────────────────────────────────────────────────┐
│ [Team Space | My View] [Filters: Member▼ Epic▼ Labels▼]    │
│                                        Aurora Project       │
│                                   Complete project overview │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Main Board (Horizontal Kanban)
\`\`\`
┌─────────┬─────────┬─────────┬─────────┬─────────┐
│ Backlog │  To Do  │In Prog. │In Review│  Done   │
│   (2)   │   (3)   │   (1)   │   (2)⚠️ │   (1)   │
├─────────┼─────────┼─────────┼─────────┼─────────┤
│ [Task]  │ [Task]  │ [Task]  │ [Task]  │ [Task]  │
│ [Task]  │ [Task]  │         │ [Task]  │         │
│         │ [Task]  │         │         │         │
└─────────┴─────────┴─────────┴─────────┴─────────┘
\`\`\`

### Task Detail (Full Screen Overlay)
\`\`\`
┌─────────────────────────────────────────────────────────────┐
│ [←] AUTH-123 🔴                              [Status▼] [👤] │
├─────────────────────────────────────────────────────────────┤
│ Implement OAuth 2.0 authentication flow                    │
├─────────────────────────────────────────────────────────────┤
│ Description          │ Details                              │
│ Development         │ Priority: High                       │
│ AI Reasoning        │ Epic: Authentication                 │
│ Conversation        │ Labels: [backend] [security]         │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## 📱 Responsiveness Strategy

### Breakpoints (Tailwind v4)
- **Mobile**: < 640px - Single column, stacked cards
- **Tablet**: 640px-1024px - Two columns, condensed view
- **Desktop**: 1024px+ - Full horizontal kanban layout
- **Large**: 1280px+ - Expanded spacing and larger cards

### Mobile Adaptations
- Header becomes hamburger menu with slide-out navigation
- Kanban columns stack vertically with swipe navigation
- Task cards expand to full width with touch-friendly targets
- Filters collapse into a single dropdown menu
- AI suggestions appear as bottom sheets

### Tablet Adaptations
- Two-column kanban layout with horizontal scroll
- Condensed task cards with essential information only
- Side-by-side task detail view instead of full overlay
- Touch-optimized drag and drop interactions

## 🧩 Component Architecture

### Core Components

#### 1. TaskCard
\`\`\`typescript
interface TaskCardProps {
  task: Task
  isPersonalView: boolean
  onDragStart: (task: Task) => void
  onDragEnd: () => void
  onClick: (task: Task) => void
  isRelevant?: boolean
}
\`\`\`

**Visual States:**
- **Default**: White background, subtle border
- **Hover**: Lift animation (-2px), soft shadow, ring border
- **Drag**: Scale down (0.98), increased opacity
- **Irrelevant**: Opacity 0.15, scale 0.96, pointer-events-none

**Progressive Disclosure:**
- **Layer 1**: Title, priority dot, task ID, assignee
- **Layer 2** (on hover/personal view): Development status, activity indicators, progress bar
- **Layer 3**: Review badges, contextual labels

#### 2. KanbanColumn
\`\`\`typescript
interface KanbanColumnProps {
  column: Column
  isPersonalView: boolean
  onTaskDragStart: (task: Task) => void
  onTaskDragEnd: () => void
  onTaskClick: (task: Task) => void
}
\`\`\`

**Visual Features:**
- **Background**: Semi-transparent gray with backdrop blur
- **Header**: Title, task count badge, bottleneck indicator
- **Stats**: Hover-revealed metrics (avg time, oldest task)
- **Bottleneck Animation**: Pulsing amber dot with text shadow glow

#### 3. SuggestionBar (AI Ambient Intelligence)
\`\`\`typescript
interface SuggestionBarProps {
  type: "branch" | "pr" | "assign"
  task: Task
  onAction: () => void
  onCancel: () => void
}
\`\`\`

**Behavior:**
- **Trigger**: Appears after drag operations in "My View"
- **Animation**: Spring entrance from bottom (y: 100 → 0)
- **Positioning**: Fixed bottom center with backdrop blur
- **Dismissal**: Auto-dismiss after 10s or manual close

#### 4. TaskDetailView (Full Screen Modal)
\`\`\`typescript
interface TaskDetailViewProps {
  task: Task
  onClose: () => void
}
\`\`\`

**Layout Sections:**
- **Header**: Close button, task ID, priority, status selector, assignee
- **Main Content**: Description, development section, AI reasoning, conversation
- **Sidebar**: Details panel, labels, metadata

## 🎭 Animation & Transition System

### Core Animation Principles
- **Easing**: Custom cubic-bezier(0.4, 0, 0.2, 1) for natural feel
- **Duration**: 200-400ms for micro-interactions, 300-600ms for layout changes
- **Stagger**: 50-100ms delays for sequential animations
- **Physics**: Spring animations for organic movement

### Framer Motion Configurations

#### Layout Animations
\`\`\`typescript
// Task card layout transitions
<motion.div
  layout
  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
/>

// Column reordering
<AnimatePresence mode="popLayout">
  {tasks.map(task => (
    <motion.div
      key={task.id}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    />
  ))}
</AnimatePresence>
\`\`\`

#### Hover Interactions
\`\`\`typescript
// Card hover lift
whileHover={{ y: -2, transition: { duration: 0.2 } }}

// Assignee avatar scale
whileHover={{ scale: 1.05 }}

// Button press feedback
whileTap={{ scale: 0.98 }}
\`\`\`

#### Progressive Disclosure
\`\`\`typescript
// Contextual information reveal
<motion.div
  initial={{ opacity: 0, height: 0 }}
  animate={{ opacity: 1, height: "auto" }}
  exit={{ opacity: 0, height: 0 }}
  transition={{ duration: 0.2, ease: "easeOut" }}
/>
\`\`\`

#### AI Suggestion Animations
\`\`\`typescript
// Tooltip appearance
<motion.div
  initial={{ opacity: 0, y: 10, scale: 0.9 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 10, scale: 0.9 }}
/>

// Suggestion bar entrance
<motion.div
  initial={{ y: 100, opacity: 0, scale: 0.9 }}
  animate={{ y: 0, opacity: 1, scale: 1 }}
  transition={{ type: "spring", damping: 25, stiffness: 300 }}
/>
\`\`\`

### Bottleneck Indicators
\`\`\`typescript
// Pulsing animation for bottlenecks
<motion.div
  animate={{
    scale: [1, 1.2, 1],
    opacity: [0.7, 1, 0.7],
  }}
  transition={{ duration: 2, repeat: Infinity }}
/>

// Text glow effect
<motion.h2
  animate={{
    textShadow: [
      "0 0 0px rgba(245, 158, 11, 0)",
      "0 0 8px rgba(245, 158, 11, 0.3)",
      "0 0 0px rgba(245, 158, 11, 0)",
    ],
  }}
  transition={{ duration: 2, repeat: Infinity }}
/>
\`\`\`

## 🎨 Design Choices & Rationale

### 1. Progressive Disclosure
**Why**: Reduces cognitive load while maintaining information density
**Implementation**: Three-layer information hierarchy with contextual reveals

### 2. Ambient AI Integration
**Why**: AI assistance should feel natural, not intrusive
**Implementation**: Contextual suggestions triggered by user actions, not constant notifications

### 3. Hyper-Minimalist Aesthetic
**Why**: Focus attention on content, reduce visual noise
**Implementation**: Generous whitespace, subtle shadows, limited color palette

### 4. Living Interface Elements
**Why**: Creates emotional connection and provides feedback
**Implementation**: Micro-animations, hover states, breathing effects

### 5. Context-Aware Views
**Why**: Different users need different information at different times
**Implementation**: "Team Space" vs "My View" with filtered relevance

### 6. Bottleneck Visualization
**Why**: Immediate visual feedback for process issues
**Implementation**: Animated indicators with performance metrics

## 🔧 Technical Implementation Notes

### State Management
- React hooks for local component state
- Context for global app state (view mode, focused task)
- No external state management library needed

### Performance Optimizations
- `AnimatePresence` with `mode="popLayout"` for smooth list transitions
- Conditional rendering for progressive disclosure
- Memoized components for expensive calculations

### Accessibility
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader announcements for state changes

### Responsive Design
- Mobile-first approach with progressive enhancement
- Touch-friendly targets (minimum 44px)
- Swipe gestures for mobile navigation
- Adaptive layouts based on screen size

## 📋 Component Usage Guidelines

### TaskCard Usage
\`\`\`typescript
// In Team Space - show all tasks
<TaskCard
  task={task}
  isPersonalView={false}
  isRelevant={true}
  onDragStart={handleDragStart}
  onDragEnd={handleDragEnd}
  onClick={handleTaskClick}
/>

// In My View - filter relevance
<TaskCard
  task={task}
  isPersonalView={true}
  isRelevant={task.assignee?.id === currentUserId || task.mentions}
  onDragStart={handleDragStart}
  onDragEnd={handleDragEnd}
  onClick={handleTaskClick}
/>
\`\`\`

### Animation Triggers
- **Drag Start**: Scale down, increase shadow
- **Drag End**: Check for AI suggestion triggers
- **Hover**: Reveal additional information
- **Click**: Full screen detail view
- **View Switch**: Fade and filter animations

### AI Suggestion Logic
\`\`\`typescript
// Trigger conditions
if (draggedTask && currentView === "my-view") {
  if (draggedTask.status === "todo") {
    showSuggestion({ type: "branch", task: draggedTask })
  } else if (draggedTask.status === "in-progress") {
    showSuggestion({ type: "pr", task: draggedTask })
  }
}
\`\`\`

## 🎯 Success Metrics

### User Experience
- **Interaction Fluidity**: All animations complete within 400ms
- **Information Hierarchy**: Users can find relevant information within 2 clicks
- **AI Helpfulness**: Suggestions have >70% acceptance rate
- **Mobile Usability**: Touch targets meet accessibility guidelines

### Technical Performance
- **Bundle Size**: <500KB gzipped
- **First Paint**: <1.5s on 3G
- **Animation Performance**: 60fps on mid-range devices
- **Accessibility Score**: >95 on Lighthouse

This recreation prompt provides a comprehensive guide for rebuilding the AI Project Management Platform while maintaining its sophisticated design language and user experience principles.
