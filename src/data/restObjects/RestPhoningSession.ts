export interface RestPhoningSession {
  uuid: string;
  adherent: RestPhoningSessionAdherent | null;
}

export interface RestPhoningSessionAdherent {
  uuid: string;
  gender: ("male" | "female" | "other") | null;
  phone: {
    country: string;
    number: string;
  };
  info: string;
}

export interface RestPhoningSessionErrorResponse {
  code: string;
  message: string;
}
