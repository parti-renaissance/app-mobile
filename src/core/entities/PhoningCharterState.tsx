export class PhoningCharterAccepted {
  public constructor() {}
}

export class PhoningCharterNotAccepted {
  public constructor(readonly charter: string) {}
}

export type PhoningCharterState =
  | PhoningCharterAccepted
  | PhoningCharterNotAccepted
