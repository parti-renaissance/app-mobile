import DoorToDoorRepository from '../../data/DoorToDoorRepository'
import { DoorToDoorAddress } from '../entities/DoorToDoor'

const MAP_DEFAULT_ZOOM = 16

export class GetDoorToDoorAddressesInteractor {
  private repository = DoorToDoorRepository.getInstance()

  public async execute(
    latitude: number,
    longitude: number,
  ): Promise<Array<DoorToDoorAddress>> {
    const addresses = await this.repository.getAddresses(
      latitude,
      longitude,
      MAP_DEFAULT_ZOOM,
    )
    const campaignIds = new Set<string>()
    addresses.forEach((address) =>
      campaignIds.add(address.building.campaignStatistics.campaignId),
    )
    campaignIds.forEach(async (id) => {
      await this.repository.getCampaign(id, 'remote')
      await this.repository.getDoorToDoorPollConfig(id, 'remote')
      await this.repository.getDoorToDoorPoll(id, 'remote')
    })
    return addresses
  }
}
