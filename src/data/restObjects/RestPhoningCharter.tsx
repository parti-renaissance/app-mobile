export interface RestPhoningCharterResponse {
  content: string | undefined;
}

export class RestPhoningCharterNotAccepted {
  public constructor(readonly content: string) {}
}

export class RestPhoningCharterAccepted {}

export type RestPhoningCharter = RestPhoningCharterNotAccepted | RestPhoningCharterAccepted;
