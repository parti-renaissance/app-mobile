import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export function formatLocalizedDate(date: Date, pattern: string): string {
  return format(date, pattern, { locale: fr })
}
