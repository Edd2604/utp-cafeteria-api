import { format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

export function formatDate(date: Date) {
  if (!date || isNaN(date.getTime())) return null
  const zonedDate = toZonedTime(date, 'America/Lima')
  return format(zonedDate, 'dd-MM-yyyy HH:mm')
}

export function formatDateCalendar(date: Date) {
  const zonedDate = toZonedTime(date, 'America/Lima')
  return format(zonedDate, 'dd-MM-yyyy')
}
