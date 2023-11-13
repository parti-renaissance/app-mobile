import { Tool } from "../../core/entities/Tool";
import { ToolRowViewModel } from "./ToolRowViewModel";

export const ToolRowViewModelMapper = {
  map: (tool: Tool): ToolRowViewModel => {
    return {
      id: tool.id,
      title: tool.title,
      url: tool.url,
    };
  },
};
