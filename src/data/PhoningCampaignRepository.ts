import { PhoningCampaign } from '../core/entities/PhoningCampaign'
import { PhoningSatisfactionAnswer } from '../core/entities/PhoningSatisfactionAnswer'
import { PhoningSession } from '../core/entities/PhoningSession'
import { PhoningSessionConfiguration } from '../core/entities/PhoningSessionConfiguration'
import { Poll } from '../core/entities/Poll'
import { PollRemoteQuestionResult } from '../core/entities/PollResult'
import { PhoningCampaignMapper } from './mapper/PhoningCampaignMapper'
import { PhoningSessionConfigurationMapper } from './mapper/PhoningSessionConfigurationMapper'
import { PhoningSessionMapper } from './mapper/PhoningSessionMapper'
import { RestPhonePollResultRequestMapper } from './mapper/RestPhonePollResultRequestMapper'
import ApiService from './network/ApiService'

interface CacheSessionValue<T> {
  sessionId: string
  value: T
}

class PhoningCampaignRepository {
  private static instance: PhoningCampaignRepository
  private apiService = ApiService.getInstance()
  private cachedMemoryConfigurationForSession:
    | CacheSessionValue<PhoningSessionConfiguration>
    | undefined

  public static getInstance(): PhoningCampaignRepository {
    if (!PhoningCampaignRepository.instance) {
      PhoningCampaignRepository.instance = new PhoningCampaignRepository()
    }
    return PhoningCampaignRepository.instance
  }

  public async getPhoningTutorial(): Promise<string> {
    const restMarkdown = await this.apiService.getPhoningTutorial()
    return restMarkdown.content
  }

  public async getPhoningCampaigns(): Promise<Array<PhoningCampaign>> {
    const restCampaigns = await this.apiService.getPhoningCampaigns()
    return restCampaigns.map(PhoningCampaignMapper.map)
  }

  public async getPhoningCampaign(
    campaignId: string,
  ): Promise<PhoningCampaign> {
    const restCampaign = await this.apiService.getPhoningCampaign(campaignId)
    return PhoningCampaignMapper.map(restCampaign)
  }

  public async getPhoningCampaignPoll(campaignId: string): Promise<Poll> {
    const poll = await this.apiService.getPhoningCampaignPoll(campaignId)
    return poll
  }

  public async getPhoningCampaignSession(
    campaignId: string,
  ): Promise<PhoningSession> {
    const restSession = await this.apiService.getPhoningCampaignSession(
      campaignId,
    )
    return PhoningSessionMapper.map(restSession)
  }

  public async getPhoningSessionConfiguration(
    sessionId: string,
  ): Promise<PhoningSessionConfiguration> {
    if (
      this.cachedMemoryConfigurationForSession &&
      this.cachedMemoryConfigurationForSession.sessionId === sessionId
    ) {
      return this.cachedMemoryConfigurationForSession.value
    }
    this.cachedMemoryConfigurationForSession = undefined
    const restConfiguration = await this.apiService.getPhoningSessionConfiguration(
      sessionId,
    )
    const configuration = PhoningSessionConfigurationMapper.map(
      restConfiguration,
    )
    this.cachedMemoryConfigurationForSession = {
      sessionId,
      value: configuration,
    }
    return configuration
  }

  public async updatePhoningSessionStatus(
    sessionId: string,
    status: string,
  ): Promise<void> {
    await this.apiService.updatePhoningSessionStatus(sessionId, status)
  }

  public async sendSatisfactionAnswers(
    sessionId: string,
    answers: ReadonlyArray<PhoningSatisfactionAnswer>,
  ): Promise<void> {
    const params: Record<string, any> = {}
    answers.forEach((item) => {
      params[item.code] = item.value
    })
    await this.apiService.updatePhoningSessionStatus(
      sessionId,
      'completed',
      params,
    )
  }

  public async sendPhonePollAnswers(
    poll: Poll,
    sessionId: string,
    result: PollRemoteQuestionResult,
  ): Promise<void> {
    const request = RestPhonePollResultRequestMapper.map(poll.uuid, result)
    await this.apiService.sendPhonePollAnswers(sessionId, request)
  }
}

export default PhoningCampaignRepository
