import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ITarefaCentraisProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context1: WebPartContext;
}
