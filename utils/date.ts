export const getTodayDateKey = () => {
  return new Date().toISOString().slice(0, 10)
}

export const isBeforeToday = (dateKey: string) => {
  return dateKey < getTodayDateKey()
}

export const getNextDate = (date: string) => {
  const nextDate = new Date(date)

  nextDate.setDate(nextDate.getDate() + 1)

  return nextDate.toISOString().slice(0, 10)
}