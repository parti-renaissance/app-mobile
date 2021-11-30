import { RankingRowViewModel } from './Ranking'

export const RankingViewModelMapper = {
  // TODO - Change static with Api returned data
  map: (i: number): RankingRowViewModel => {
    return {
      id: i.toString(),
      rang: i.toString(),
      militant: 'Angèle C.',
      department: 'Paris 15',
      doorKnocked: '61',
      pollsCompleted: '45',
      position: i,
    }
  },
}
