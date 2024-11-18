import { useMemo, useState } from 'react'
import { RestGetFormationsResponse } from '@/services/formations/schema'

type UseCategoriesProps = {
  formations: RestGetFormationsResponse
}

export const useCategories = ({ formations }: UseCategoriesProps) => {
  const categories = useMemo(() => {
    const catSet = new Set<string>()
    formations.forEach((formation) => {
      catSet.add(formation.category ?? 'no-cat')
    })
    return Array.from(catSet)
  }, [formations])

  const options = useMemo(() => {
    return categories.map((cat) => ({
      label: cat === 'no-cat' ? 'Sans catégorie' : cat,
      value: cat,
    }))
  }, [categories])

  const [activeCategories, setActiveCategories] = useState<string | undefined>(undefined)

  const filteredFormations = useMemo(() => {
    if (!activeCategories) {
      return formations
    }
    return formations.filter((formation) => (formation.category ?? 'no-cat') === activeCategories)
  }, [formations, activeCategories])

  return {
    options,
    activeCategories,
    setActiveCategories,
    filteredFormations,
  }
}
