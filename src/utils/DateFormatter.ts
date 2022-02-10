import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export const DateFormatter = {
  format: (date: Date, pattern: string): string => {
    return format(date, pattern, { locale: fr })
  },
}
