export const getTodayDateKey = () => {
  return new Date().toISOString().slice(0, 10)
}

export const isBeforeToday = (dateKey: string) => {
  return dateKey < getTodayDateKey()
}