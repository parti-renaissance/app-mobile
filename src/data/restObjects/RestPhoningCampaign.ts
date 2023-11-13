export interface RestPhoningCampaign {
  uuid: string;
  title: string;
  brief: string;
  goal: number;
  permanent: boolean;
  nb_calls: number;
  nb_surveys: number;
  finish_at: string;
  scoreboard: Array<RestPhoningCampaignScore>;
}

export interface RestPhoningCampaignScore {
  firstName: string;
  position: number;
  caller: boolean;
  nb_calls: string;
  nb_surveys: string;
}
