export enum Tab {
  INDIVIDUAL,
  DEPARTMENTAL,
}

export interface RankingRowViewModel {
  rank: string
  name: string
  doorKnocked: string
  pollsCompleted: string
  position: number
}
