export interface RestBuildingHistoryPoint {
  questioner: RestQuestioner;
  building_block: string;
  floor: number;
  door: string;
  created_at: string;
  status_label: string;
}

export type RestQuestioner = {
  partial_name: string;
};
