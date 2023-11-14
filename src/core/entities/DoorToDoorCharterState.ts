export class DoorToDoorCharterAccepted {
  public constructor() {}
}

export class DoorToDoorCharterNotAccepted {
  public constructor(readonly charter: string) {}
}

export type DoorToDoorCharterState =
  | DoorToDoorCharterAccepted
  | DoorToDoorCharterNotAccepted
