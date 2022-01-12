import DoorToDoorRepository from '../../data/DoorToDoorRepository'
import AlphabetHelper from '../../utils/AlphabetHelper'
import {
  BuildingBlock,
  BuildingBlockFloor,
  BuildingBlockHelper,
} from '../entities/BuildingBlock'
import { BuildingType } from '../entities/DoorToDoor'

export class UpdateBuildingLayoutInteractor {
  private buildingBlockHelper = new BuildingBlockHelper()
  private repository = DoorToDoorRepository.getInstance()

  public async execute(
    buildingId: string,
    campaignId: string,
    buildingType: BuildingType,
    currentBuidlingLayout: Array<BuildingBlock>,
  ): Promise<Array<BuildingBlock>> {
    const remoteBlocks = await this.repository.buildingBlocks(
      buildingId,
      campaignId,
    )

    const localBuildingBlocks = currentBuidlingLayout.filter(
      (item) => item.local || item.floors.some((floor) => floor.local),
    )

    const blocksMap = remoteBlocks.reduce((map, block) => {
      return map.set(block.name, block)
    }, new Map<string, BuildingBlock>())

    localBuildingBlocks.forEach((localBlock) => {
      if (blocksMap.has(localBlock.name)) {
        // Add missing local floors to building block
        const currentBlock = blocksMap.get(localBlock.name)
        if (currentBlock) {
          const floors = currentBlock?.floors ?? []
          const floorsMap = floors.reduce((map, floor) => {
            return map.set(floor.number, floor)
          }, new Map<number, BuildingBlockFloor>())

          localBlock.floors.forEach((floor) => {
            if (!floorsMap?.has(floor.number)) {
              floorsMap.set(floor.number, floor)
            }
          })

          currentBlock.floors = Array.from(floorsMap.values())
        }
      } else {
        // Add missing local building block
        blocksMap.set(localBlock.name, localBlock)
      }
    })

    const mergedBlocks = Array.from(blocksMap.values())
    if (mergedBlocks.length === 0) {
      mergedBlocks.push(
        this.buildingBlockHelper.createLocalBlock(
          AlphabetHelper.firstLetterInAlphabet,
          buildingType,
        ),
      )
    }

    return mergedBlocks
  }
}
