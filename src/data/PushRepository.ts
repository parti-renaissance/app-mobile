class PushRepository {
  private static instance: PushRepository
  private constructor() {}

  public static getInstance(): PushRepository {
    if (!PushRepository.instance) {
      PushRepository.instance = new PushRepository()
    }
    return PushRepository.instance
  }
}

export default PushRepository
