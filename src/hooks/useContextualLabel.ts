export const useContextualLabel = (isPersonalView: boolean): string | null => {
  if (!isPersonalView) return null

  const currentTime = new Date().getHours()

  if (currentTime < 12) return "Today's Focus"
  if (currentTime < 17) return "In Progress"
  return "Tomorrow's Prep"
}
