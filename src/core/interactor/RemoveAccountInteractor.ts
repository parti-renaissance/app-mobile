import AuthenticationRepository from '../../data/AuthenticationRepository'

export class RemoveAccountInteractor {
  private authenticationRepository = AuthenticationRepository.getInstance()

  public async execute(): Promise<void> {
    await this.authenticationRepository.removeAccount()
    await this.authenticationRepository.logout()
  }
}
