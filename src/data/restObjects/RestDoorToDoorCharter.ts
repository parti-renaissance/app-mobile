export interface RestDoorToDoorCharterResponse {
  content: string | undefined;
}

export class RestDoorToDoorCharterNotAccepted {
  public constructor(readonly content: string) {}
}

export class RestDoorToDoorCharterAccepted {}

export type RestDoorToDoorCharter =
  | RestDoorToDoorCharterNotAccepted
  | RestDoorToDoorCharterAccepted;
