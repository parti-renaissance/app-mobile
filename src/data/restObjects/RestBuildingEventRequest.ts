export interface RestBuildingEventRequest {
  action: "open" | "close";
  type: "building_block" | "floor" | "building";
  identifier?: string;
  campaign: string;
}
