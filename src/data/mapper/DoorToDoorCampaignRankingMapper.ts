import {
  DoorToDoorCampaignRanking,
  DoorToDoorCampaignRankingItem,
} from '../../core/entities/DoorToDoorCampaignRanking'
import {
  RestDoorToDoorCampaignRanking,
  RestDoorToDoorCampaignRankingItem,
} from '../restObjects/RestDoorToDoorCampaignRanking'

const INDIVIDUAL = 'Individuel'
const DEPARTEMENTAL = 'Département'

export const DoorToDoorCampaignRankingMapper = {
  map: (
    restArray: Array<RestDoorToDoorCampaignRanking>,
  ): DoorToDoorCampaignRanking => {
    return {
      individual: DoorToDoorCampaignRankingItemMapper.map(
        restArray.find((item) => item.label === INDIVIDUAL)?.items ?? [],
      ),
      departemental: DoorToDoorCampaignRankingItemMapper.map(
        restArray.find((item) => item.label === DEPARTEMENTAL)?.items ?? [],
      ),
    }
  },
}

export const DoorToDoorCampaignRankingItemMapper = {
  map: (
    restArray: Array<RestDoorToDoorCampaignRankingItem>,
  ): Array<DoorToDoorCampaignRankingItem> => {
    return restArray.map((item) => {
      return {
        rank: item.rank,
        name: item.questioner ?? item.department ?? '',
        surveys: item.nb_surveys,
        visitedDoors: item.nb_visited_doors,
        current: item.current,
      }
    })
  },
}
