export type IdeTabKey = "profile" | "stack" | "metrics";

export interface IdeTabContent {
  tabKey: IdeTabKey;
  fileName: string;
  code: string;
  preview: string;
}
