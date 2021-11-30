export enum Tab {
  INDIVIDUAL,
  DEPARTMENTAL,
}

export interface RankingRowViewModel {
  id: string
  rang: string
  militant: string
  department: string
  doorKnocked: string
  pollsCompleted: string
  position: number
}
